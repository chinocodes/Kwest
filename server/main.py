from fastapi import FastAPI
from routes.tasks import router as tasks_router

app = FastAPI(title="Kwest API")

app.include_router(tasks_router)