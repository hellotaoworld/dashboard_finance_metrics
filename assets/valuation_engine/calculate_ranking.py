import database_connection
import pandas as pd
import numpy as np
from datetime import datetime

#### Step 3: Calculate ranking and load to metric ranking table ###

def run():
    # Establish connection and cursor
    connection = database_connection.establish_database()
    cursor = connection.cursor()

    # Table variables
    metric_table_name = "valuation_engine_metrics"
    metric_list =  ['revenue_growth_rate',
                    'return_on_invested_capital_rate',
                    'eps_growth_rate', 
                    'adj_equity_growth_rate',
                    'free_cashflow_growth_rate',
                    'days_inventory_on_hand',
                    'days_sales_outstanding', 
                    'days_payable', 
                    'cash_conversion_cycle',
                    'working_capital_turnover', 
                    'total_asset_turnover', 
                    'quick_ratio',
                    'cash_ratio',
                    'debt_to_asset',
                    'debt_to_capital',
                    'debt_to_equity',
                    'financial_leverage', 
                    'interest_coverage',
                    'interest_ratio',
                    'gross_profit_margin',
                    'operating_profit_margin',
                    'ebitda_margin',
                    'net_profit_margin',
                    'return_on_asset',
                    'return_on_equity',
                    'sg_a_ratio',
                    'r_d_ratio', 
                    'depreciation_ratio', 
                    'cash_growth_rate',
                    'debt_growth_rate', 
                    'outstanding_shares_growth_rate',
                    'inventory_growth_rate',
                    'pp_e_growth_rate', 
                    'goodwill_growth_rate',
                    'total_asset_growth_rate']
    ranking_table_name ='valuation_engine_metrics_ranking'
    ranking_table_columns =[
        '`a.company_name`',
        '`a.report_year`',
        '`metric_value`',
        '`metric_name`',
        '`metric_ranking`'
    ]

    # Read metrics
    metrics_query =f"SELECT * FROM {metric_table_name}"
    mapping_formula_df = pd.read_sql(metrics_query, connection)
    #formula_names = mapping_formula_df.iloc[:, 4].tolist()

    def calculate_ranking(metric_v):
        direction_query =f"SELECT formula_direction from valuation_engine_mapping_formula where formula_shortname='{metric_v}'"
        d_df = pd.read_sql(direction_query, connection)
        direction= d_df["formula_direction"][0]
        
        if direction=='positive':
            data_query =f"SELECT `a.company_name`, `a.report_year`,{metric_v} as metric_value  FROM {metric_table_name} WHERE  `a.report_period`='FY' and {metric_v} is not null order by {metric_v} DESC"
        else:
            data_query =f"SELECT `a.company_name`, `a.report_year`,{metric_v} as metric_value  FROM {metric_table_name} WHERE  `a.report_period`='FY' and {metric_v} is not null order by {metric_v} ASC"
        q_df = pd.read_sql(data_query, connection)
        ranking_df = q_df[['a.company_name','a.report_year', 'metric_value']]
        ranking_df['metric_name']=metric_v
        
        year_query =f"SELECT distinct `a.report_year` as year FROM {metric_table_name} WHERE  `a.report_period`='FY' and {metric_v} is not null order by `a.report_year`"
        year_df = pd.read_sql(year_query, connection)
        # calculate ranking per year
        for year in year_df['year']:
            temp_df =ranking_df[ranking_df['a.report_year']==year]
            temp_df.reset_index()
            i = 1
            for index, row in temp_df.iterrows():
                if i == 1:
                    ranking_df.loc[index,'metric_ranking'] = 1
                elif ranking_df["   metric_value"][i] == ranking_df["metric_value"][i-1] and ranking_df["a.report_year"][index]==ranking_df["a.report_year"][index-1]:
                    ranking_df.loc[index,'metric_ranking'] = i
                else:
                    i = i + 1
                    ranking_df.loc[index,'metric_ranking'] = i
                    
        #print(ranking_df)
        # Load into database 
        for _, row in ranking_df.iterrows():
            insert_query = f"INSERT INTO {ranking_table_name} ({', '.join(ranking_table_columns)}) VALUES (%s,%s,%s,%s,%s)"
            values = tuple(row)
            #print(insert_query)
            #print(values)
            cursor.execute(insert_query, values)
        connection.commit()
        print(f"Ranking updated successfully for {metric_v}.")  
        

    # Refresh the ratio table with loop calculation for the list of companies
    truncate_ranking_query = f"TRUNCATE TABLE {ranking_table_name}"
    cursor.execute(truncate_ranking_query)
    print(f"Table {ranking_table_name} is truncated.")

    #calculate_ranking('revenue_growth_rate')

    # calculate ranking for the list of metrics
    for metric in metric_list:
        calculate_ranking(metric)


    # Close the cursor and connection
    cursor.close()
    connection.close()

run()