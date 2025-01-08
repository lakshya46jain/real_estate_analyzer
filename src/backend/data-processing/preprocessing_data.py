import pandas as pd

# Load the dataset
input_file = './realtor-data.csv'
output_file = './preprocessed_dataset.csv'

# Step 1: Load the data
dataset = pd.read_csv(input_file)

# Step 2: Filter data to include only relevant columns
dataset = dataset[['bed', 'bath', 'acre_lot', 'house_size', 'price', 'city', 'state', 'zip_code']]

# Step 3: Identify the top 10 cities and their top 10 zip codes for each state
top_cities_zipcodes = []

# Group by 'state' and 'city', and get the top 10 zip codes for each city based on frequency
for state in dataset['state'].unique():
    state_dataset = dataset[dataset['state'] == state]
    top_cities = state_dataset['city'].value_counts().nlargest(10).index.tolist()  # Top 10 cities in the state
    
    for city in top_cities:
        city_dataset = state_dataset[state_dataset['city'] == city]
        top_zipcodes = city_dataset['zip_code'].value_counts().nlargest(10).index.tolist()  # Top 10 zip codes for the city
        top_cities_zipcodes.extend([(state, city, zip_code) for zip_code in top_zipcodes])

# Step 4: Filter the dataset to include only top cities and zip codes
top_cities_zipcodes_set = set(top_cities_zipcodes)
dataset = dataset[dataset.apply(lambda x: (x['state'], x['city'], x['zip_code']) in top_cities_zipcodes_set, axis=1)]

# Step 5: Handle missing values (fill numerical columns with median)
dataset['acre_lot'] = dataset['acre_lot'].fillna(dataset['acre_lot'].median())
dataset['house_size'] = dataset['house_size'].fillna(dataset['house_size'].median())

# Step 6: Drop rows with missing values in key columns
dataset = dataset.dropna(subset=['bed', 'bath', 'price', 'city', 'state', 'zip_code'])

# Step 7: One-hot encode the 'city', 'state', and 'zip_code' columns
dataset_encoded = pd.get_dummies(dataset, columns=['city', 'state', 'zip_code'], drop_first=True)

# Step 8: Save the processed data to a new CSV file
dataset_encoded.to_csv(output_file, index=False)

print("Preprocessing complete. Dataset saved as 'preprocessed_dataset.csv'.")