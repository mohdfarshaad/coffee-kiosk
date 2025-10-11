from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

class Drink(Base):
    __tablename__ = "drinks"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    price = Column(Float, nullable=False)

    orders = relationship("Order", back_populates="drink")

class Order(Base):
    __tablename__ = "orders"
    id = Column(Integer, primary_key=True, index=True)
    customer_name = Column(String, nullable=False)
    drink_id = Column(Integer, ForeignKey("drinks.id"), nullable=False)
    quantity = Column(Integer, default=1)

    drink = relationship("Drink", back_populates="orders")
