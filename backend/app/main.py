import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.auth import router as auth_router
from app.routes.admin import router as admin_router
from app.routes import profile
from app.routes import admin_causes
from app.routes import causes
from app.routes import donations
from app.core.scheduler import start_scheduler

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(admin_router)
app.include_router(profile.router)
app.include_router(admin_causes.router)
app.include_router(causes.router)
app.include_router(donations.router)

@app.on_event("startup")
async def startup_event():
    if os.environ.get("RUN_MAIN") != "true":
        start_scheduler()  
        
@app.get("/")
def root():
    return {"status": "ok"}
