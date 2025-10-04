from fastapi import FastAPI

app = FastAPI(title="Kiosk Raspberry Pi GPIO Service",version="0.1")

@app.get("/")
def read_root():
    return {"message":"Server is Running "}