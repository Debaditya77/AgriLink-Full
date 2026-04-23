from pydantic import BaseModel
from typing import Optional

class InventoryItemBase(BaseModel):
    name: str
    type: str
    quantity: float
    unit: str
    status: str
    location: Optional[str] = None

class InventoryItemCreate(InventoryItemBase):
    pass

class InventoryItemResponse(InventoryItemBase):
    id: int

    class Config:
        from_attributes = True

class MarketOfferBase(BaseModel):
    buyer_name: str
    offer_type: str
    price: float
    unit: str
    crop_name: str
    requirement_quantity: float
    distance_km: float
    is_premium: bool = False

class MarketOfferCreate(MarketOfferBase):
    pass

class MarketOfferResponse(MarketOfferBase):
    id: int

    class Config:
        from_attributes = True
