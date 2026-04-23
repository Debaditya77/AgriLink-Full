from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from ..database import get_db
from .. import models, schemas

router = APIRouter(
    prefix="/api/marketplace",
    tags=["marketplace"]
)

@router.get("/", response_model=List[schemas.MarketOfferResponse])
def read_marketplace_offers(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    offers = db.query(models.MarketOffer).offset(skip).limit(limit).all()
    return offers

@router.post("/", response_model=schemas.MarketOfferResponse)
def create_market_offer(offer: schemas.MarketOfferCreate, db: Session = Depends(get_db)):
    db_offer = models.MarketOffer(**offer.model_dump())
    db.add(db_offer)
    db.commit()
    db.refresh(db_offer)
    return db_offer
