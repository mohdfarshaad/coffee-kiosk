from pydantic import BaseModel

class DrinkBase(BaseModel):
    name: str
    price: float

class DrinkCreate(DrinkBase):
    pass

class Drink(DrinkBase):
    id: int
    class Config:
        orm_mode = True


class OrderBase(BaseModel):
    customer_name: str
    drink_id: int
    quantity: int

class OrderCreate(OrderBase):
    pass

class Order(OrderBase):
    id: int
    drink: Drink
    class Config:
        orm_mode = True
