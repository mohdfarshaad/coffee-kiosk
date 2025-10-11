from fastapi import FastAPI
from . import models, database
from .routers import drinks, orders

app = FastAPI(title="Kiosk Raspberry Pi GPIO Service",version="0.1")

models.Base.metadata.create_all(bind=database.engine)

app.include_router(drinks.router)
app.include_router(orders.router)

@app.get("/")
def read_root():
    return {"message":"Server is Running "}