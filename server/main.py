from fastapi import FastAPI
from routes.tasks import router as tasks_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Kwest API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tasks_router)