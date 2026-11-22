from fastapi import APIRouter, FastAPI
from pydantic import BaseModel, ConfigDict, Field
from datetime import date

app = FastAPI()
router = APIRouter()

class TaskCreateModel(BaseModel):
    id: int
    name: str
    set_date: date = Field(default_factory=date.today)
    


@router.post("/api/tasks/create")
async def create_task(taskerz: TaskCreateModel):
    return [{"username": "Rick"}, {"username": "Morty"}]


app.include_router(router)