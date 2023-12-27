import database_connection
import pandas as pd
import numpy as np
from datetime import datetime

#### Step 2: Calculate metrics and load to metric table ###

# Establish connection and cursor
connection = database_connection.establish_database()
cursor = connection.cursor()

# Table variables
input_table_name = "valuation_engine_input"
formula_table_name ="valuation_engine_mapping_formula"
metric_table_name = "valuation_engine_metrics"
metric_table_columns =['`a.company_name`', 
                       '`a.report_period`', 
                       '`a.report_year`',
                       '`revenue_growth_rate`',
                       '`return_on_invested_capital_rate`',
                       '`eps_growth_rate`', 
                       '`adj_equity_growth_rate`',
                       '`free_cashflow_growth_rate`',
                       '`days_inventory_on_hand`',
                       '`days_sales_outstanding`', 
                       '`days_payable`', 
                       '`cash_conversion_cycle`',
                       '`working_capital_turnover`', 
                       '`total_asset_turnover`', 
                       '`quick_ratio`',
                       '`cash_ratio`',
                       '`debt_to_asset`',
                       '`debt_to_capital`',
                       '`debt_to_equity`',
                       '`financial_leverage`', 
                       '`interest_coverage`',
                       '`interest_ratio`',
                       '`gross_profit_margin`',
                       '`operating_profit_margin`',
                       '`ebitda_margin`',
                       '`net_profit_margin`',
                       '`return_on_asset`',
                       '`return_on_equity`',
                       '`sg_a_ratio`',
                       '`r_d_ratio`', 
                       '`depreciation_ratio`', 
                       '`cash_growth_rate`',
                       '`debt_growth_rate`', 
                       '`outstanding_shares_growth_rate`',
                       '`inventory_growth_rate`',
                       '`pp_e_growth_rate`', 
                       '`goodwill_growth_rate`',
                       '`total_asset_growth_rate`']

# Read formula
formula_query =f"SELECT * FROM {formula_table_name}"
mapping_formula_df = pd.read_sql(formula_query, connection)
formula_names = mapping_formula_df.iloc[:, 4].tolist()

def calculate_metrics(company_v):
    data_query =f"SELECT * FROM {input_table_name} WHERE `a.company_name`='{company_v}'"
    q_df = pd.read_sql(data_query, connection)
    ratio_df = q_df[['a.company_name','a.report_period','a.report_year']]
    # calculate
    for index, row in q_df.iterrows():
        for formula_name in formula_names:
            formula_value = mapping_formula_df.loc[mapping_formula_df.iloc[:, 4] == formula_name, mapping_formula_df.columns[2]].values[0]
            #print(formula_value)
            try:
                ratio_df.loc[index, formula_name] = eval(formula_value)
            except:
                ratio_df.loc[index, formula_name] = 0
            ratio_df.loc[index, formula_name] = ratio_df.loc[index, formula_name].round(2)
    
    # Replace inf and -inf values with NULL
    ratio_df = ratio_df.replace([np.inf, -np.inf], np.nan)
    #print(ratio_df)
    
    # Load into database 
    for _, row in ratio_df.iterrows():
        insert_query = f"INSERT INTO {metric_table_name} ({', '.join(metric_table_columns)}) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
        values = tuple(row)
        #print(insert_query)
        #print(values)
        cursor.execute(insert_query, values)
    connection.commit()
    print(f"Ratio updated successfully for {company_v}.")    

# Refresh the ratio table with loop calculation for the list of companies
company_query =f"SELECT distinct `a.company_name` FROM {input_table_name}"
company_names = pd.read_sql(company_query, connection).iloc[:, 0].tolist()

truncate_metric_query = f"TRUNCATE TABLE {metric_table_name}"
cursor.execute(truncate_metric_query)
print(f"Table {metric_table_name} is truncated.")

print(company_names)
#calculate_metrics('AMKOR TECHNOLOGY, INC.')

for company in company_names:
    calculate_metrics(company)        

# Close the cursor and connection
cursor.close()
connection.close()