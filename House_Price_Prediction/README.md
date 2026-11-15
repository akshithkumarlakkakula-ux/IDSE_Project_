# House Price Prediction | IDSE Data Mining

A student project that takes an Indian housing-style dataset through a complete machine learning workflow: data inspection, cleaning, exploratory data analysis, feature preprocessing, regression model comparison, hyperparameter tuning, evaluation and a small interactive estimator.

> **Dataset transparency:** The bundled dataset is synthetic and reproducible. It is not real property transaction data. Prices are expressed in Indian rupees lakhs (₹ lakhs).

## Problem statement
Estimate a residential property's price using its city, locality type, built-up area, room count, age, parking, furnishing, property type and road access. The target is `price_lakhs`, so this is a supervised regression problem.

## Workflow
1. Load and inspect the dataset.
2. Identify missing values and duplicate records.
3. Remove exact duplicates.
4. Explore distributions, city-level differences, feature relationships and correlations.
5. Split into training and test sets.
6. Impute, scale and encode features using a Scikit-learn pipeline.
7. Compare Linear Regression, Ridge, Random Forest and Extra Trees.
8. Tune a Random Forest with cross-validation.
9. Evaluate with MAE, RMSE and R²; inspect prediction and residual plots.
10. Save the full pipeline and use it for predictions.

## Project structure
```text
House_Price_Prediction_IDSE/
├── app.py
├── requirements.txt
├── README.md
├── data/
│   ├── indian_house_prices.csv
│   └── sample_property.csv
├── notebooks/
│   └── House_Price_Prediction.ipynb
├── src/
│   ├── generate_data.py
│   ├── train.py
│   └── predict.py
├── models/
│   ├── house_price_pipeline.joblib
│   └── metrics.json
├── outputs/
│   ├── 01_price_distribution.png
│   ├── 02_correlation_heatmap.png
│   ├── 03_city_price_comparison.png
│   ├── 04_area_vs_price.png
│   ├── 05_model_comparison.png
│   ├── 06_actual_vs_predicted.png
│   ├── 07_residuals.png
│   └── model_comparison.csv
└── report/
    └── PROJECT_REPORT.md
```

## Dataset columns
`city`, `locality_type`, `area_sqft`, `bedrooms`, `bathrooms`, `property_age`, `parking_spaces`, `floor_number`, `furnishing_status`, `property_type`, `distance_to_city_km`, `main_road_access`, `price_lakhs`.

## Run locally
Python 3.10+ is recommended.

```bash
python -m venv .venv

# Windows
.venv\Scripts\activate

# macOS / Linux
source .venv/bin/activate

pip install -r requirements.txt

# Optional: regenerate the bundled synthetic dataset
python src/generate_data.py

# Train models, evaluate and regenerate plots
python src/train.py

# Try one sample prediction
python src/predict.py

# Launch the interactive estimator
streamlit run app.py
```

Open `notebooks/House_Price_Prediction.ipynb` in Jupyter or Google Colab for the step-by-step analysis.

## Current model results
Produced by the included training script with `random_state=42`.

| Metric | Result |
|---|---:|
| Selected model | Ridge Regression |
| MAE | 6.13 ₹ lakhs |
| RMSE | 7.73 ₹ lakhs |
| R² | 0.728 |

These results apply to the synthetic dataset only and do not establish accuracy on real housing markets.

## Libraries
Python, Pandas, NumPy, Matplotlib, Seaborn, Scikit-learn, Joblib, Jupyter and Streamlit.

## Limitations
The generated data is simplified and does not capture every factor that affects a real property's value. Future work could use verified public sales data, more detailed locality information, validation across regions and time periods, and prediction intervals.

This is an academic demonstration, not a property valuation or financial advice tool.
