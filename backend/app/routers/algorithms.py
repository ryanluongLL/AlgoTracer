from fastapi import APIRouter, HTTPException, Request
from slowapi import Limiter
from slowapi.util import get_remote_address
from app.models.step import AlgorithmRequest, AlgorithmResponse
from app.engines.sorting import SORTING_ALGORITHMS
from app.engines.searching import SEARCHING_ALGORITHMS
from app.engines.data_structures import DATA_STRUCTURE_ALGORITHMS

router = APIRouter()
limiter = Limiter(key_func=get_remote_address)

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
@limiter.limit("30/minute")
def run_algorithm(request: Request, body: AlgorithmRequest):
    algo = body.algorithm

    if algo not in ALL_ALGORITHMS:
        raise HTTPException(
            status_code=400,
            detail=f"Algorithm '{algo}' is not supported. Choose from: {list(ALL_ALGORITHMS.keys())}"
        )

    fn = ALL_ALGORITHMS[algo]

    if algo in ALGORITHMS_REQUIRING_TARGET:
        if body.target is None:
            raise HTTPException(
                status_code=400,
                detail=f"Algorithm '{algo}' requires a target value"
            )
        steps = fn(body.input_data, body.target)

    elif algo in DATA_STRUCTURE_ALGORITHMS_WITH_OPERATION:
        if body.operation is None:
            raise HTTPException(
                status_code=400,
                detail=f"Algorithm '{algo}' requires an operation"
            )
        steps = fn(body.input_data, body.operation, body.target)

    else:
        steps = fn(body.input_data)

    return AlgorithmResponse(
        algorithm=algo,
        input_data=body.input_data,
        steps=steps,
        total_steps=len(steps),
    )