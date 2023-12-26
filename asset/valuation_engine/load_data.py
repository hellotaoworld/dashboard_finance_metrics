from dotenv import load_dotenv
load_dotenv()
import os
import mysql.connector
import pandas as pd
from datetime import datetime

# Establish a connection to the MySQL database
config = {
  'host': os.getenv("DB_HOST"),
  'user':os.getenv("DB_USERNAME"),
  'passwd': os.getenv("DB_PASSWORD"),
  'db': os.getenv("DB_NAME"),
  'autocommit': True,
  #'ssl_mode' : "VERIFY_IDENTITY",
  #'ssl': {
  #  "ca": "/etc/ssl/cert.pem"
  #}
}

# Get the list of files to load
file_names = [item for item in os.listdir("./input") if os.path.isfile(os.path.join("./input", item))]

# Establish the connection
connection = mysql.connector.connect(**config)

if connection.is_connected():
  # Create a cursor object for executing SQL queries
  cursor = connection.cursor()
  table_name = "input_valuation_engine"
  column_names = [ "`a.index`"
    ,"`a.company_name`"
    ,"`a.report_end_date`"
    ,"`a.report_period`"
    ,"`a.report_year`"
    ,"`a.url_bs`"
    ,"`a.url_is`"
    ,"`a.url_cfs`"
    ,"`bs.cash_n_equivalent`"
    ,"`bs.st_investment`"
    ,"`bs.account_receivable`"
    ,"`bs.inventories`"
    ,"`bs.total_current_assets`"
    ,"`bs.pp_and_e`"
    ,"`bs.goodwill`"
    ,"`bs.total_assets`"
    ,"`bs.total_shareholder_equity`"
    ,"`bs.long_term_debt_current`"
    ,"`bs.short_term_borrowing`"
    ,"`bs.accounts_payable`"
    ,"`bs.total_current_liabilities`"
    ,"`bs.long_term_debt_net_current`"
    ,"`bs.total_liabilities`"
    ,"`bs.treasury_stock`"
    ,"`bs.retained_earnings`"
    ,"`is.net_revenue`"
    ,"`is.cost_of_sales`"
    ,"`is.r_and_d`"
    ,"`is.selling_marketing`"
    ,"`is.general_administrative`"
    ,"`is.sg_and_a`"
    ,"`is.operating_income`"
    ,"`is.interest_expense`"
    ,"`is.income_tax_provision`"
    ,"`is.net_income`"
    ,"`is.eps_basic`"
    ,"`is.eps_diluted`"
    ,"`is.num_shares_diluted`"
    ,"`cfs.depreciation_n_amortization`"
    ,"`cfs.depreciation`"
    ,"`cfs.amortization`"
    ,"`cfs.cfo`"
    ,"`cfs.capital_expenditure`"]
  
  # Truncate the table
  truncate_query = f"TRUNCATE TABLE {table_name}"
  cursor.execute(truncate_query)
  
  for file_name in file_names:   
    df = pd.read_excel('./input/'+file_name)
  
    # Convert timestamp column to string format for MySQL insert
    df["a.report_end_date"] = pd.to_datetime(df["a.report_end_date"])
    df["a.report_end_date"] = df["a.report_end_date"].dt.strftime('%Y-%m-%d %H:%M:%S')

    # Iterate through the DataFrame and insert rows into the MySQL table
    for _, row in df.iterrows():
        insert_query = f"INSERT INTO {table_name} ({', '.join(column_names)}) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
        values = tuple(row)  # Convert the row to a tuple
        #print(insert_query)
        #print(values)
        cursor.execute(insert_query, values)

    #Commit the database change for a single file
    connection.commit()
    print(f"Data imported successfully for {file_name}.")

  # Close the cursor and connection
  cursor.close()
  connection.close()
else:
  print("Error: Database Connection Failed!")