from fastapi import APIRouter, FastAPI, HTTPException
from pydantic import BaseModel, ConfigDict, Field
from datetime import date
from db import supabase

# app = FastAPI()
router = APIRouter(prefix="/api/tasks")

class TaskCreateModel(BaseModel):
   
    name: str
    
    


@router.post("/create")
async def create_task(taskerz: TaskCreateModel):
    try:
        data = supabase.table("tasks").insert({
        "name": taskerz.name
    }).execute()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# app.include_router(router)