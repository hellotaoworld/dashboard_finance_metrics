import database_connection
import os
import pandas as pd
from datetime import datetime

### Step 1: Load financial data into input table ###
def run():
  # Establish connection and cursor
  connection = database_connection.establish_database()
  cursor = connection.cursor()

  # Get the list of files to load
  file_names = [item for item in os.listdir("./input") if os.path.isfile(os.path.join("./input", item))]
    
  # Table variables
  input_table_name = "valuation_engine_input"
  input_column_names = [ "`a.index`"
    ,"`a.company_name`"
    ,"`a.report_end_date`"
    ,"`a.report_period`"
    ,"`a.report_year`"
    ,"`a.url_bs`"
    ,"`a.url_cfs`"
    ,"`a.url_is`"
    ,"`bs.account_receivable`"
    ,"`bs.accounts_payable`"
    ,"`bs.cash_n_equivalent`"
    ,"`bs.goodwill`"    
    ,"`bs.inventories`"
    ,"`bs.long_term_debt_current`"
    ,"`bs.long_term_debt_net_current`"
    ,"`bs.pp_and_e`"
    ,"`bs.retained_earnings`"  
    ,"`bs.short_term_borrowing`"      
    ,"`bs.st_investment`"
    ,"`bs.total_assets`"
    ,"`bs.total_current_assets`"
    ,"`bs.total_current_liabilities`"    
    ,"`bs.total_liabilities`"    
    ,"`bs.total_shareholder_equity`"
    ,"`bs.treasury_stock`"
    ,"`cfs.amortization`"
    ,"`cfs.capital_expenditure`"
    ,"`cfs.cfo`"  
    ,"`cfs.depreciation`"
    ,"`cfs.depreciation_n_amortization`"
    ,"`is.cost_of_sales`"
    ,"`is.eps_basic`"
    ,"`is.eps_diluted`"
    ,"`is.general_administrative`"
    ,"`is.income_tax_provision`"
    ,"`is.interest_expense`"  
    ,"`is.net_income`"
    ,"`is.net_revenue`" 
    ,"`is.num_shares_diluted`"
    ,"`is.operating_income`"
    ,"`is.r_and_d`"
    ,"`is.selling_marketing`"
    ,"`is.sg_and_a`"]
  
  input_column_check = [ "a.index`"
    ,"a.company_name"
    ,"a.report_end_date"
    ,"a.report_period"
    ,"a.report_year"
    ,"a.url_bs"
    ,"a.url_cfs"
    ,"a.url_is"
    ,"bs.account_receivable"
    ,"bs.accounts_payable"
    ,"bs.cash_n_equivalent"
    ,"bs.goodwill"    
    ,"bs.inventories"
    ,"bs.long_term_debt_current"
    ,"bs.long_term_debt_net_current"
    ,"bs.pp_and_e"
    ,"bs.retained_earnings"  
    ,"bs.short_term_borrowing"      
    ,"bs.st_investment"
    ,"bs.total_assets"
    ,"bs.total_current_assets"
    ,"bs.total_current_liabilities"    
    ,"bs.total_liabilities"    
    ,"bs.total_shareholder_equity"
    ,"bs.treasury_stock"
    ,"cfs.amortization"
    ,"cfs.capital_expenditure"
    ,"cfs.cfo"  
    ,"cfs.depreciation"
    ,"cfs.depreciation_n_amortization"
    ,"is.cost_of_sales"
    ,"is.eps_basic"
    ,"is.eps_diluted"
    ,"is.general_administrative"
    ,"is.income_tax_provision"
    ,"is.interest_expense"  
    ,"is.net_income"
    ,"is.net_revenue" 
    ,"is.num_shares_diluted"
    ,"is.operating_income"
    ,"is.r_and_d"
    ,"is.selling_marketing"
    ,"is.sg_and_a"]

  formula_table_name ="valuation_engine_mapping_formula"
  formula_column_names = ['formula_name', 'formula_value', 'formula_pseudo_code', 'formula_shortname', 'formula_category','formula_type','formula_direction']

  # Truncate input table
  truncate_query = f"TRUNCATE TABLE {input_table_name}"
  cursor.execute(truncate_query)
  print(f"Table {input_table_name} is truncated.")

  # Loop the folder and load all input XLSX files
  for file_name in file_names:   
    df = pd.read_excel('./input/'+file_name)

    # Convert timestamp column to string format for MySQL insert
    df["a.report_end_date"] = pd.to_datetime(df["a.report_end_date"])
    df["a.report_end_date"] = df["a.report_end_date"].dt.strftime('%Y-%m-%d %H:%M:%S')
    # print(df.columns==input_column_check)
    
    # Iterate through the DataFrame and insert rows into the MySQL table
    for _, row in df.iterrows():
        insert_query = f"INSERT INTO {input_table_name} ({', '.join(input_column_names)}) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
        values = tuple(row)  # Convert the row to a tuple
        #print(insert_query)
        #print(values)
        cursor.execute(insert_query, values)

    #Commit the database change for a single file
    connection.commit()
    print(f"Data imported successfully for {file_name}.")


  # Reload formula table
  truncate_formula_query = f"TRUNCATE TABLE {formula_table_name}"
  cursor.execute(truncate_formula_query)
  print(f"Table {formula_table_name} is truncated.")

  mapping_formula_df = pd.read_excel("./Valuation_Engine_Mapping.xlsx",sheet_name = "Formula")
  for _, row in mapping_formula_df.iterrows():
        insert_query = f"INSERT INTO {formula_table_name} ({', '.join(formula_column_names)}) VALUES (%s,%s,%s,%s,%s,%s,%s)"
        values = tuple(row)
        cursor.execute(insert_query, values)
  connection.commit()
  print("Formula refreshed successfully.")
    
  # Close the cursor and connection
  cursor.close()
  connection.close()
