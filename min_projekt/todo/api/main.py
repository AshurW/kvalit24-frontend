from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import sqlite3
import datetime

app = FastAPI()

# CORS-inställningar för att tillåta anrop från frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # I produktion bör detta begränsas till din frontend-domän
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic modeller för data validering
class TodoBase(BaseModel):
    text: str
    completed: bool = False

class TodoCreate(TodoBase):
    pass

class Todo(TodoBase):
    id: int
    created_at: str

    class Config:
        orm_mode = True

# Databasfunktioner
def init_db():
    conn = sqlite3.connect('todos.db')
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS todos
        (id INTEGER PRIMARY KEY AUTOINCREMENT,
         text TEXT NOT NULL,
         completed BOOLEAN NOT NULL DEFAULT 0,
         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)
    ''')
    conn.commit()
    conn.close()

# Initiera databasen när appen startar
init_db()

# API endpoints
@app.get("/todos", response_model=List[Todo])
async def get_todos():
    conn = sqlite3.connect('todos.db')
    c = conn.cursor()
    c.execute('SELECT id, text, completed, created_at FROM todos')
    todos = c.fetchall()
    conn.close()
    return [
        Todo(id=row[0], text=row[1], completed=bool(row[2]), created_at=row[3])
        for row in todos
    ]

@app.post("/todos", response_model=Todo)
async def create_todo(todo: TodoCreate):
    conn = sqlite3.connect('todos.db')
    c = conn.cursor()
    c.execute(
        'INSERT INTO todos (text, completed) VALUES (?, ?)',
        (todo.text, todo.completed)
    )
    todo_id = c.lastrowid
    conn.commit()
    
    # Hämta den skapade todon
    c.execute(
        'SELECT id, text, completed, created_at FROM todos WHERE id = ?',
        (todo_id,)
    )
    new_todo = c.fetchone()
    conn.close()
    
    return Todo(
        id=new_todo[0],
        text=new_todo[1],
        completed=bool(new_todo[2]),
        created_at=new_todo[3]
    )

@app.put("/todos/{todo_id}", response_model=Todo)
async def update_todo(todo_id: int, completed: bool):
    conn = sqlite3.connect('todos.db')
    c = conn.cursor()
    c.execute(
        'UPDATE todos SET completed = ? WHERE id = ?',
        (completed, todo_id)
    )
    if c.rowcount == 0:
        conn.close()
        raise HTTPException(status_code=404, detail="Todo not found")
    
    c.execute(
        'SELECT id, text, completed, created_at FROM todos WHERE id = ?',
        (todo_id,)
    )
    updated_todo = c.fetchone()
    conn.commit()
    conn.close()
    
    return Todo(
        id=updated_todo[0],
        text=updated_todo[1],
        completed=bool(updated_todo[2]),
        created_at=updated_todo[3]
    )

@app.delete("/todos/{todo_id}")
async def delete_todo(todo_id: int):
    conn = sqlite3.connect('todos.db')
    c = conn.cursor()
    c.execute('DELETE FROM todos WHERE id = ?', (todo_id,))
    if c.rowcount == 0:
        conn.close()
        raise HTTPException(status_code=404, detail="Todo not found")
    conn.commit()
    conn.close()
    return {"message": "Todo deleted successfully"} 