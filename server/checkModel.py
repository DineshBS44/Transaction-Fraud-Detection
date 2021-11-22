import warnings
warnings.filterwarnings('ignore')
import pickle
#from sklearn.metrics import f1_score
#from sklearn.metrics import accuracy_score

filename = 'finalized_model.sav'
loaded_model = pickle.load(open(filename, 'rb'))

fileXData = 'XData.sav'
X_test = pickle.load(open(fileXData, 'rb'))

fileYData = 'YData.sav'
Y_test = pickle.load(open(fileYData, 'rb'))
print(X_test)
print(Y_test)

dt_yhat = loaded_model.predict(X_test)

print('Accuracy score of the Decision Tree model is {}'.format(accuracy_score(Y_test, dt_yhat)))
print('F1 score of the Decision Tree model is {}'.format(f1_score(Y_test, dt_yhat)))
