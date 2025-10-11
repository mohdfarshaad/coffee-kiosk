from fastapi import FastAPI
from . import models, database
from .routers import drinks, orders
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Kiosk Raspberry Pi GPIO Service", version="0.1")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or restrict to your frontend's origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


models.Base.metadata.create_all(bind=database.engine)

app.include_router(drinks.router)
app.include_router(orders.router)


@app.get("/")
def read_root():
    return {"message": "Server is Running "}
