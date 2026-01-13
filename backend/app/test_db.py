import asyncio
from app.database import engine

async def test():
    async with engine.begin() as conn:
        await conn.run_sync(lambda _: None)
    print("DB CONNECTED")

asyncio.run(test())
