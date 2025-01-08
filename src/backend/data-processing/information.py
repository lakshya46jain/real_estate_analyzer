import pandas as pd

# Load the Dataset
dataset = pd.read_csv('./realtor-data.csv')

# Columns of Interest
columns = ['city', 'state', 'zip_code']

# Iterate over each column and count unique values
for column in columns:
    unique_values = dataset[column].nunique()
    print(f'Number of unique values in column "{column}": {unique_values}')