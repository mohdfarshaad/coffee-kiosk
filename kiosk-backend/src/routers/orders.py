from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import models, schemas, database, auth

router = APIRouter(prefix="/orders", tags=["Orders"])

@router.post("/", response_model=schemas.Order)
def create_order(order: schemas.OrderCreate, db: Session = Depends(database.SessionLocal), _: dict = Depends(auth.verify_token)):
    drink = db.query(models.Drink).filter(models.Drink.id == order.drink_id).first()
    if not drink:
        raise HTTPException(status_code=404, detail="Drink not found")
    
    db_order = models.Order(**order.dict())
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order

@router.get("/", response_model=list[schemas.Order])
def list_orders(db: Session = Depends(database.SessionLocal), _: dict = Depends(auth.verify_token)):
    return db.query(models.Order).all()
