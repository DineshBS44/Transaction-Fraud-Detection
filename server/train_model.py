import os
import warnings

warnings.filterwarnings('ignore')

import pickle

# Packages related to data importing, manipulation, exploratory data analysis, data understanding
import numpy as np
import pandas as pd
from pandas import Series, DataFrame
from termcolor import colored as cl  # text customization

# Packages related to data visualizaiton
import seaborn as sns
import matplotlib.pyplot as plt
from matplotlib.backends.backend_pdf import PdfPages

from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn import metrics
from sklearn.impute import MissingIndicator, SimpleImputer
from sklearn.preprocessing import PolynomialFeatures, KBinsDiscretizer, FunctionTransformer
from sklearn.preprocessing import StandardScaler, MinMaxScaler, MaxAbsScaler
from sklearn.preprocessing import LabelEncoder, OneHotEncoder, LabelBinarizer, OrdinalEncoder
import statsmodels.formula.api as smf
import statsmodels.tsa as tsa
from sklearn.linear_model import LogisticRegression, LinearRegression, ElasticNet, Lasso, Ridge
from sklearn.neighbors import KNeighborsClassifier, KNeighborsRegressor
from sklearn.tree import DecisionTreeClassifier, DecisionTreeRegressor, export_graphviz
from sklearn.ensemble import BaggingClassifier, BaggingRegressor, RandomForestClassifier, RandomForestRegressor
from sklearn.ensemble import GradientBoostingClassifier, GradientBoostingRegressor, AdaBoostClassifier, \
    AdaBoostRegressor
from sklearn.svm import LinearSVC, LinearSVR, SVC, SVR
from xgboost import XGBClassifier
from sklearn.metrics import f1_score
from sklearn.metrics import accuracy_score
from sklearn.metrics import confusion_matrix

data = pd.read_csv("Newdataset.csv")
Total_transactions = len(data)
normal = len(data[data.Class == 0])
fraudulent = len(data[data.Class == 1])
fraud_percentage = round(fraudulent / (normal + fraudulent) * 100, 2)
print(cl('Total number of Transactions are {}'.format(Total_transactions), attrs=['bold']))
print(cl('Number of Normal Transactions are {}'.format(normal), attrs=['bold']))
print(cl('Number of fraudulent Transactions are {}'.format(fraudulent), attrs=['bold']))
print(cl('Percentage of fraud Transactions is {}'.format(fraud_percentage), attrs=['bold']))
sc = StandardScaler()
amount = data['Amount'].values

# Training and Testing
X = data.drop('Class', axis=1).values
y = data['Class'].values
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.20, train_size=0.80, random_state=0)

xgb = XGBClassifier(eta=0.2, max_depth = 6)
xgb.fit(X_train, y_train)
xgb_yhat = xgb.predict(X_test)
print('Accuracy score of the XGBoost model is {}'.format(accuracy_score(y_test, xgb_yhat)))
print('F1 score of the XGBoost model is {}'.format(f1_score(y_test, xgb_yhat)))

filename = 'finalized_model.sav'
pickle.dump(xgb, open(filename, 'wb'))

fileXData = 'XData.sav'
pickle.dump(X_test, open(fileXData, 'wb'))

fileYData = 'YData.sav'
pickle.dump(y_test, open(fileYData, 'wb'))