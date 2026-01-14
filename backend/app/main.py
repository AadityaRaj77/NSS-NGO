from fastapi import FastAPI
from app.routes.auth import router as auth_router
from app.routes.admin import router as admin_router

app = FastAPI()
app.include_router(auth_router)
app.include_router(admin_router)

@app.get("/")
def root():
    return {"status": "ok"}
