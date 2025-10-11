from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import models, schemas, database, auth

router = APIRouter(prefix="/drinks", tags=["Drinks"])

@router.post("/", response_model=schemas.Drink)
def create_drink(drink: schemas.DrinkCreate, db: Session = Depends(database.SessionLocal), _: dict = Depends(auth.verify_token)):
    db_drink = models.Drink(**drink.dict())
    db.add(db_drink)
    db.commit()
    db.refresh(db_drink)
    return db_drink

@router.get("/", response_model=list[schemas.Drink])
def list_drinks(db: Session = Depends(database.SessionLocal)):
    return db.query(models.Drink).all()
