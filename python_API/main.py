from fastapi import FastAPI, HTTPException
from fastapi.routing import APIRouter
import httpx
from data import memory

app = FastAPI()
router = APIRouter()
companies_list = memory.companies
activity = []

@app.on_event("startup")
async def load_data():
    url = "https://www.sec.gov/files/company_tickers_exchange.json"
    headers = {
        "User-Agent": "John Doe (test@example.com)"
    }
    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=headers)
        if response.status_code == 200:
            companies_list.append(response.json()["data"])
        else:
            print("Failed to fetch companies data")

@router.get("/companies")
def get_companies():
    try:
        return companies_list
    except Exception:
        raise HTTPException(status_code=500, detail="error retrieving list of companies")

@router.get("/companies/{ticker}")
def get_company_by_ticker(ticker: str):
    try:
        if not companies_list:
            raise HTTPException(status_code=404, detail="Companies data not loaded yet")

        for c in companies_list[0]:
            if c[2] == ticker:
                for obj in activity:
                    if ticker in obj:
                        obj[ticker] += 1
                        return c
                activity.append({ticker: 1})
                return c
        raise HTTPException(status_code=404, detail="Company not found")
    except Exception:
        raise HTTPException(status_code=500, detail="error retrieving company")

@router.get("/activities")
def get_activities():
    try:
        return activity
    except Exception:
        raise HTTPException(status_code=500, detail="error retrieving list of activities")

app.include_router(router, prefix="/api")

