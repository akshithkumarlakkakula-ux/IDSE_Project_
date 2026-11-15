from pathlib import Path
import sys
import streamlit as st

ROOT = Path(__file__).resolve().parent
sys.path.insert(0, str(ROOT / "src"))
from predict import predict_price

st.set_page_config(page_title="GharMeter | House Price Estimator", page_icon="🏠")
st.title("🏠 GharMeter")
st.caption("A student-built house price estimator.")
st.write("Enter a few property details to get an estimated value. This is an academic demonstration, not a formal valuation.")

with st.form("property_form"):
    c1, c2 = st.columns(2)
    with c1:
        city = st.selectbox("City", ["Hyderabad","Chennai","Bengaluru","Pune","Coimbatore","Visakhapatnam"])
        area = st.number_input("Built-up area (sq. ft.)", 450, 4200, 1450, 50)
        bedrooms = st.selectbox("Bedrooms", [1,2,3,4,5,6], index=2)
        bathrooms = st.selectbox("Bathrooms", [1,2,3,4,5], index=1)
        age = st.slider("Property age (years)", 0, 35, 5)
        floor = st.slider("Floor number", 1, 15, 4)
    with c2:
        locality = st.selectbox("Locality type", ["Central","Suburban","IT Corridor","Residential","Outskirts"])
        kind = st.selectbox("Property type", ["Apartment","Independent House","Villa"])
        furnishing = st.selectbox("Furnishing", ["Unfurnished","Semi-furnished","Fully-furnished"])
        parking = st.selectbox("Parking spaces", [0,1,2,3], index=1)
        distance = st.slider("Distance to city centre (km)", .3, 22.0, 6.5, .1)
        road = st.selectbox("Main road access", ["Yes","No"])
    submit = st.form_submit_button("Estimate price", use_container_width=True)

if submit:
    details = {
        "city":city,"locality_type":locality,"area_sqft":area,"bedrooms":bedrooms,
        "bathrooms":bathrooms,"property_age":age,"parking_spaces":parking,
        "floor_number":floor,"furnishing_status":furnishing,"property_type":kind,
        "distance_to_city_km":distance,"main_road_access":road
    }
    st.success(f"Estimated price: ₹{predict_price(details):,.2f} lakhs")
    st.caption("The model learns from a synthetic dataset. Actual property values depend on many additional factors.")
st.divider()
st.caption("IDSE Data Mining Project • House Price Prediction")
