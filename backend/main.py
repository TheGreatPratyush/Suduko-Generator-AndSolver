from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from pydantic import BaseModel
from generator import generate_sudoku
from solver import solve_sudoku

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



class SudokuRequest(BaseModel):
    board: list



@app.get("/generate")
def generate():
    puzzle, solution = generate_sudoku(40)
    return {
        "puzzle": puzzle,
        "solution": solution
    }



@app.post("/solve")
def solve(req: SudokuRequest):
    solved = solve_sudoku(req.board)
    return {
        "solution": solved
    }