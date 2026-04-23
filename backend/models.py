from sqlalchemy import Column, Integer, String, Float, Boolean
from .database import Base

class InventoryItem(Base):
    __tablename__ = "inventory_items"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    type = Column(String)  # e.g., "crop", "seed", "fertilizer"
    quantity = Column(Float)
    unit = Column(String)  # e.g., "bu", "kg", "tons"
    status = Column(String) # e.g., "Good", "Needs Review"
    location = Column(String, nullable=True)

class MarketOffer(Base):
    __tablename__ = "market_offers"

    id = Column(Integer, primary_key=True, index=True)
    buyer_name = Column(String, index=True)
    offer_type = Column(String) # "Contract Offer", "Spot Market"
    price = Column(Float)
    unit = Column(String) # "bu"
    crop_name = Column(String)
    requirement_quantity = Column(Float)
    distance_km = Column(Float)
    is_premium = Column(Boolean, default=False)
