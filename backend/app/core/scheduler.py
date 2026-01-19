from apscheduler.schedulers.asyncio import AsyncIOScheduler
from app.database import AsyncSessionLocal
from app.services.cause_expiry import expire_causes

scheduler = AsyncIOScheduler()

async def expire_job():
    async with AsyncSessionLocal() as db:
        count = await expire_causes(db)
        if count:
            print(f"Auto-expired {count} causes")

def start_scheduler():
    scheduler.add_job(expire_job, "interval", minutes=1)
    scheduler.start()
