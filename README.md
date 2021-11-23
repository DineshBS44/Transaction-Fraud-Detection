# Transaction Fraud Detection

- Web Application to detect if a Bank or Credit Card's transaction is fraudulent or not

## Machine Learning Model
- The ML Model uses `XGBoost` to train the ML model
- The data set is custom which contains fields like `Transaction Type`, `Amount`, `Old Source Balance`, `New Source Balance`, `Old Destination Balance` and `New Destination Balance` 

## Client
- The client side of the web application uses `React.js` for a simple frontend
- User can give input data regarding the transaction and get to know if that transaction is fraudulent

## Server
- The backend uses `flask` in python to get the provide response to the GET requests from the client side
- The backend gets the queried data, runs it with the Trained ML Model and then returns the results to the client
