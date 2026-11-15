from pathlib import Path
import json
import joblib
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.model_selection import train_test_split, GridSearchCV, cross_val_score
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.linear_model import LinearRegression, Ridge
from sklearn.ensemble import RandomForestRegressor, ExtraTreesRegressor, HistGradientBoostingRegressor

ROOT = Path(__file__).resolve().parents[1]
DATA_PATH = ROOT / "data" / "indian_house_prices.csv"
MODEL_DIR = ROOT / "models"
OUT_DIR = ROOT / "outputs"
MODEL_DIR.mkdir(exist_ok=True)
OUT_DIR.mkdir(exist_ok=True)

TARGET = "price_lakhs"
NUMERIC = ["area_sqft", "bedrooms", "bathrooms", "property_age",
           "parking_spaces", "floor_number", "distance_to_city_km"]
CATEGORICAL = ["city", "locality_type", "furnishing_status",
               "property_type", "main_road_access"]
FEATURES = NUMERIC + CATEGORICAL

def build_preprocessor():
    numeric_pipe = Pipeline([
        ("imputer", SimpleImputer(strategy="median")),
        ("scaler", StandardScaler())
    ])
    categorical_pipe = Pipeline([
        ("imputer", SimpleImputer(strategy="most_frequent")),
        ("encoder", OneHotEncoder(handle_unknown="ignore"))
    ])
    return ColumnTransformer([
        ("numeric", numeric_pipe, NUMERIC),
        ("categorical", categorical_pipe, CATEGORICAL)
    ])

def main():
    sns.set_theme(style="whitegrid")
    data = pd.read_csv(DATA_PATH)
    data = data.drop_duplicates().copy()
    X, y = data[FEATURES], data[TARGET]
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    candidates = {
        "Linear Regression": LinearRegression(),
        "Ridge Regression": Ridge(alpha=2.0),
        "Random Forest": RandomForestRegressor(
            n_estimators=180, min_samples_leaf=2, random_state=42, n_jobs=-1
        ),
        "Extra Trees": ExtraTreesRegressor(
            n_estimators=180, min_samples_leaf=2, random_state=42, n_jobs=-1
        )
    }
    results, fitted = [], {}
    for name, estimator in candidates.items():
        pipe = Pipeline([("preprocessor", build_preprocessor()), ("model", estimator)])
        pipe.fit(X_train, y_train)
        pred = pipe.predict(X_test)
        results.append({
            "Model": name,
            "MAE (lakhs)": mean_absolute_error(y_test, pred),
            "RMSE (lakhs)": mean_squared_error(y_test, pred) ** 0.5,
            "R2": r2_score(y_test, pred)
        })
        fitted[name] = pipe

    comparison = pd.DataFrame(results).sort_values("RMSE (lakhs)")
    comparison.to_csv(OUT_DIR/"model_comparison.csv", index=False)
    best_name = comparison.iloc[0]["Model"]

    # Tune a Random Forest separately; retain the better validation performer.
    rf_pipe = Pipeline([
        ("preprocessor", build_preprocessor()),
        ("model", RandomForestRegressor(random_state=42, n_jobs=-1))
    ])
    search = GridSearchCV(
        rf_pipe,
        {"model__n_estimators":[140, 220],
         "model__max_depth":[None, 18],
         "model__min_samples_leaf":[1, 2]},
        cv=3, scoring="neg_root_mean_squared_error", n_jobs=-1
    )
    search.fit(X_train, y_train)
    tuned_pred = search.best_estimator_.predict(X_test)
    tuned_metrics = {
        "MAE (lakhs)": float(mean_absolute_error(y_test, tuned_pred)),
        "RMSE (lakhs)": float(mean_squared_error(y_test, tuned_pred)**0.5),
        "R2": float(r2_score(y_test, tuned_pred))
    }
    baseline_best = fitted[best_name]
    baseline_pred = baseline_best.predict(X_test)
    baseline_rmse = mean_squared_error(y_test, baseline_pred)**0.5
    final_model = search.best_estimator_ if tuned_metrics["RMSE (lakhs)"] <= baseline_rmse else baseline_best
    final_name = "Tuned Random Forest" if final_model is search.best_estimator_ else best_name
    final_pred = final_model.predict(X_test)
    final_metrics = {
        "model": final_name,
        "MAE_lakhs": float(mean_absolute_error(y_test, final_pred)),
        "RMSE_lakhs": float(mean_squared_error(y_test, final_pred)**0.5),
        "R2": float(r2_score(y_test, final_pred)),
        "best_random_forest_params": search.best_params_
    }

    joblib.dump(final_model, MODEL_DIR/"house_price_pipeline.joblib")
    (MODEL_DIR/"metrics.json").write_text(json.dumps(final_metrics, indent=2))

    # Plots generated from the held-out test set and cleaned dataset.
    plt.figure(figsize=(8,5))
    plt.hist(data[TARGET], bins=35, edgecolor="black", alpha=0.8)
    plt.title("How house prices are distributed")
    plt.xlabel("Price (₹ lakhs)")
    plt.tight_layout(); plt.savefig(OUT_DIR/"01_price_distribution.png", dpi=150); plt.close()

    plt.figure(figsize=(8,5))
    sns.heatmap(data[NUMERIC+[TARGET]].corr(), annot=True, cmap="coolwarm", fmt=".2f")
    plt.title("Correlation between numeric property features")
    plt.tight_layout(); plt.savefig(OUT_DIR/"02_correlation_heatmap.png", dpi=150); plt.close()

    plt.figure(figsize=(9,5))
    data.boxplot(column=TARGET, by="city", rot=20)
    plt.xticks(rotation=20); plt.title("Price spread across cities")
    plt.ylabel("Price (₹ lakhs)")
    plt.tight_layout(); plt.savefig(OUT_DIR/"03_city_price_comparison.png", dpi=150); plt.close()

    plt.figure(figsize=(8,5))
    plt.scatter(data["area_sqft"], data[TARGET], alpha=.6)
    plt.title("Built-up area and sale price")
    plt.tight_layout(); plt.savefig(OUT_DIR/"04_area_vs_price.png", dpi=150); plt.close()

    plt.figure(figsize=(8,5))
    plt.bar(comparison["Model"], comparison["RMSE (lakhs)"])
    plt.xticks(rotation=15); plt.title("Model comparison — lower is better")
    plt.tight_layout(); plt.savefig(OUT_DIR/"05_model_comparison.png", dpi=150); plt.close()

    plt.figure(figsize=(6,6))
    plt.scatter(y_test, final_pred, alpha=.65)
    low, high = min(y_test.min(), final_pred.min()), max(y_test.max(), final_pred.max())
    plt.plot([low, high], [low, high], "r--")
    plt.xlabel("Actual price (₹ lakhs)"); plt.ylabel("Predicted price (₹ lakhs)")
    plt.title("Actual vs predicted prices")
    plt.tight_layout(); plt.savefig(OUT_DIR/"06_actual_vs_predicted.png", dpi=150); plt.close()

    residuals = y_test - final_pred
    plt.figure(figsize=(8,5))
    plt.scatter(final_pred, residuals, alpha=.65)
    plt.axhline(0, color="red", linestyle="--")
    plt.xlabel("Predicted price (₹ lakhs)"); plt.ylabel("Residual (lakhs)")
    plt.title("Residual check")
    plt.tight_layout(); plt.savefig(OUT_DIR/"07_residuals.png", dpi=150); plt.close()

    print("Cleaned rows:", len(data))
    print(comparison.to_string(index=False))
    print("Selected model:", final_name)
    print("Final metrics:", json.dumps(final_metrics, indent=2))
    print("Saved model:", MODEL_DIR/"house_price_pipeline.joblib")

if __name__ == "__main__":
    main()
