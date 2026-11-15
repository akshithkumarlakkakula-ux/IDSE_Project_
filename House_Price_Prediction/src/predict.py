from pathlib import Path
import joblib
import pandas as pd

ROOT = Path(__file__).resolve().parents[1]
MODEL = joblib.load(ROOT / "models" / "house_price_pipeline.joblib")

def predict_price(property_details: dict) -> float:
    """Estimate a property price in ₹ lakhs."""
    return float(MODEL.predict(pd.DataFrame([property_details]))[0])

if __name__ == "__main__":
    sample = {
        "area_sqft":1450,"bedrooms":3,"bathrooms":2,"property_age":5,
        "parking_spaces":1,"floor_number":4,"distance_to_city_km":6.5,
        "city":"Hyderabad","locality_type":"Residential",
        "furnishing_status":"Semi-furnished","property_type":"Apartment",
        "main_road_access":"Yes"
    }
    print(f"Estimated price: ₹{predict_price(sample):.2f} lakhs")
