# House Price Prediction — Project Report

## Introduction and objective
This project studies whether basic residential property information can be used to estimate a house price. It is a supervised regression task with `price_lakhs` as the target.

## Dataset
The bundled dataset contains 1,812 generated rows before duplicate removal and 13 columns. It is synthetic and reproducible, not a record of actual property transactions. Prices are in ₹ lakhs. Missing values and duplicate rows are intentionally included to demonstrate cleaning.

## Data preparation and exploration
We inspect types, descriptive statistics, missing values and duplicates. The analysis studies price distribution, city-level price spread, built-up area against price and numeric correlations. Exact duplicates are removed. Numeric and categorical missing values are imputed inside the pipeline.

## Modeling
Linear Regression, Ridge Regression, Random Forest and Extra Trees are compared. A Random Forest is tuned using GridSearchCV with three-fold cross-validation. Numeric features are median-imputed and scaled; categorical features are mode-imputed and one-hot encoded.

## Evaluation
Selected model: **Ridge Regression**. Held-out test results: MAE 6.13 lakhs, RMSE 7.73 lakhs, R² 0.728. These results apply only to the generated dataset and this test split.

## Conclusion and limitations
The project demonstrates a complete path from raw tabular data to a reusable regression pipeline and an interactive estimator. Real property prices depend on many factors not represented here. Future work could use verified sales data, more detailed locality features, cross-region validation and prediction intervals. This application is for learning, not formal valuation.
