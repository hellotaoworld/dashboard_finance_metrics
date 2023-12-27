from dotenv import load_dotenv
load_dotenv()
import os
import mysql.connector

# Establish a connection to the MySQL database
config = {
  'host': os.getenv("DB_HOST"),
  'user':os.getenv("DB_USERNAME"),
  'passwd': os.getenv("DB_PASSWORD"),
  'db': os.getenv("DB_NAME"),
  'autocommit': True
}

def establish_database():
    connection = mysql.connector.connect(**config)
    if connection.is_connected():
        return connection
    else:
        return "error:database connection faied"