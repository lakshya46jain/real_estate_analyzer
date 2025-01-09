# Real Estate Analyzer

The **Real Estate Analyzer** is a web application designed to predict property prices based on a variety of factors such as location, house size, number of bedrooms, and more. Inspired by the movie **The Big Short**, which explores the 2007-2008 financial crisis and highlights the importance of accurate financial forecasting and analysis, this app aims to provide a tool for predicting real estate prices. By using **Azure Machine Learning** and real estate data, the app offers accurate price estimates for residential properties. Users can input property details like the number of bedrooms, bathrooms, lot size, and location (state, city, zip code), and receive an estimated price based on a machine learning model trained on historical data.

## Data

- **Date Accessed:** December 26, 2024

- **Source:** https://www.kaggle.com/datasets/ahmedshahriarsakib/usa-real-estate-dataset

- The **original dataset** contains **2,000,000+ entries** with data for **20,000+ cities**, **45+ states**, and **30,000+ zip codes** for US real estate data.

- The dataset used for training was **pre-processed** to include data for the **top 10 cities** of all **45+ states**, focusing on the **top 10 zip codes** for each of those cities.

## Future Plans

- Due to **computing limitations**, the dataset had to be cut short. In future versions of this application, we aim to include a higher number of entries to improve accuracy.
- In the **current machine learning model**, the data is trained to use the following features:

  - **Location** (state, city, zip code)
  - **Number of bedrooms**
  - **Number of bathrooms**
  - **Acre lot** (total land area)
  - **House size** (living space/building area)

  In future models, we aim to include additional features, such as:

  - Proximity to **schools** and their **rankings**
  - Proximity to **police stations** and **hospitals**
  - **Economic factors** such as **inflation**, to produce a more accurate prediction.

- **Potential datasets that can be used:**
  - [US County Data (2018-2021)](https://www.kaggle.com/datasets/demche/us-county-data-2018-2021) - https://www.kaggle.com/datasets/demche/us-county-data-2018-2021
  - [US Schools Dataset](https://www.kaggle.com/datasets/andrewmvd/us-schools-dataset) - https://www.kaggle.com/datasets/andrewmvd/us-schools-dataset
  - [US Hospital Locations](https://www.kaggle.com/datasets/andrewmvd/us-hospital-locations) - https://www.kaggle.com/datasets/andrewmvd/us-hospital-locations

## TODO

- Update the Google Maps display to refresh when a location is entered in the Location Search bar.

- Link the Microsoft Azure-deployed Machine Learning Model to generate a price estimate based on the user-provided data.
