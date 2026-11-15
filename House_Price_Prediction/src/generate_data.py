"""Regenerate the bundled synthetic dataset (fixed random seed: 42)."""
from pathlib import Path
import numpy as np
import pandas as pd

ROOT = Path(__file__).resolve().parents[1]
rng = np.random.default_rng(42)
n = 1800
cities = np.array(["Hyderabad","Chennai","Bengaluru","Pune","Coimbatore","Visakhapatnam"])
zones = np.array(["Central","Suburban","IT Corridor","Residential","Outskirts"])
city = rng.choice(cities,n,p=[.23,.19,.22,.15,.12,.09])
zone = rng.choice(zones,n,p=[.13,.27,.22,.25,.13])
area = np.clip(rng.normal(1450,520,n),450,4200).round()
bedrooms = np.clip(np.round(area/520+rng.normal(.3,.65,n)),1,6).astype(int)
bathrooms = np.clip(bedrooms+rng.choice([-1,0,0,0,1],n),1,5).astype(int)
age = rng.integers(0,36,n)
parking = rng.choice([0,1,2,3],n,p=[.12,.48,.32,.08])
floor = rng.integers(1,16,n)
furnishing = rng.choice(["Unfurnished","Semi-furnished","Fully-furnished"],n,p=[.42,.43,.15])
kind = rng.choice(["Apartment","Independent House","Villa"],n,p=[.66,.25,.09])
distance = np.clip(rng.gamma(2.2,2.4,n),.3,22).round(1)
road = rng.choice(["Yes","No"],n,p=[.84,.16])
cp={"Hyderabad":9.0,"Chennai":8.0,"Bengaluru":11.0,"Pune":8.5,"Coimbatore":5.5,"Visakhapatnam":6.0}
zp={"Central":12,"Suburban":2,"IT Corridor":10,"Residential":5,"Outskirts":-5}
fp={"Unfurnished":0,"Semi-furnished":3.5,"Fully-furnished":7.5}
tp={"Apartment":0,"Independent House":8,"Villa":18}
price=(area*pd.Series(city).map(cp).to_numpy()/1000+pd.Series(zone).map(zp).to_numpy()
       +bedrooms*2.2+bathrooms*1.3+parking*1.8+pd.Series(furnishing).map(fp).to_numpy()
       +pd.Series(kind).map(tp).to_numpy()-age*.42-distance*.85
       +np.where(road=="Yes",2,-2)+rng.normal(0,8,n)+18)
price=np.clip(price,18,None).round(2)
df=pd.DataFrame({"city":city,"locality_type":zone,"area_sqft":area,"bedrooms":bedrooms,
 "bathrooms":bathrooms,"property_age":age,"parking_spaces":parking,"floor_number":floor,
 "furnishing_status":furnishing,"property_type":kind,"distance_to_city_km":distance,
 "main_road_access":road,"price_lakhs":price})
for col,frac in [("distance_to_city_km",.025),("furnishing_status",.018),("parking_spaces",.012)]:
    df.loc[rng.choice(n,int(n*frac),replace=False),col]=np.nan
df=pd.concat([df,df.sample(12,random_state=8)],ignore_index=True)
df.to_csv(ROOT/"data"/"indian_house_prices.csv",index=False)
print("Regenerated dataset:",df.shape)
