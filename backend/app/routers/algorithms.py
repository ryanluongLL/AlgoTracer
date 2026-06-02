from fastapi import APIRouter, HTTPException
from app.models.step import AlgorithmRequest, AlgorithmResponse
from app.engines.sorting import SORTING_ALGORITHMS
from app.engines.searching import SEARCHING_ALGORITHMS
from app.engines.data_structures import DATA_STRUCTURE_ALGORITHMS

router = APIRouter()

ALL_ALGORITHMS = {
    **SORTING_ALGORITHMS,
    **SEARCHING_ALGORITHMS,
    **DATA_STRUCTURE_ALGORITHMS,
}

ALGORITHMS_REQUIRING_TARGET = {"linear_search", "binary_search"}
DATA_STRUCTURE_ALGORITHMS_WITH_OPERATION = {"linked_list", "stack", "queue", "bst"}

@router.get("/")
def list_algorithms():
    return {"algorithms": list(ALL_ALGORITHMS.keys())}

@router.post("/run")
def run_algorithm(request: AlgorithmRequest):
    algo = request.algorithm

    if algo not in ALL_ALGORITHMS:
        raise HTTPException(
            status_code=400,
            detail=f"Algorithm '{algo}' is not supported. Choose from: {list(ALL_ALGORITHMS.keys())}"
        )
    fn = ALL_ALGORITHMS[algo]

    if algo in ALGORITHMS_REQUIRING_TARGET:
        if request.target is None:
            raise HTTPException(
                status_code=400,
                detail=f"Algorithm '{algo}' requires a target value"
            )
        steps= fn(request.input_data, request.target)
    elif algo in DATA_STRUCTURE_ALGORITHMS_WITH_OPERATION:
        if request.operation is None:
            raise HTTPException(
                status_code=400,
                detail=f"Algorithm '{algo}' requires an operation"
            )
        steps = fn(request.input_data, request.operation, request.target)
    else:
        steps = fn(request.input_data)
    
    return AlgorithmResponse(
        algorithm=algo,
        input_data=request.input_data,
        steps=steps,
        total_steps=len(steps),
    )