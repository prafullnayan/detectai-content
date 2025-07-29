from fastapi import FastAPI
from pydantic import BaseModel
import joblib
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# ✅ Allow frontend to call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model & vectorizer
model = joblib.load('trained_model.pkl')
vectorizer = joblib.load('vectorizer.pkl')

class Item(BaseModel):
    paragraph: str

@app.post("/predict")
async def predict(item: Item):
    X_new = vectorizer.transform([item.paragraph])
    prediction = model.predict(X_new)[0]
    proba = model.predict_proba(X_new)[0].tolist()
    return {"prediction": int(prediction), "probabilities": proba}
