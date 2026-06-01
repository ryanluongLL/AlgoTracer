from pydantic import BaseModel
from typing import Any

class Step(BaseModel):
    step_index: int
    total_steps: int
    description: str
    state:list
    highlighted: list[int]
    swapped: list[int]
    phase: str | None = None

class AlgorithmRequest(BaseModel):
    algorithm: str
    input_data: list[int]

class AlgorithmResponse(BaseModel):
    algorithm: str
    input_data: list[int]
    steps: list[Step]
    total_steps: int

