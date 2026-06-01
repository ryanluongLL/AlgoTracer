from app.models.step import Step

def _make_step(index: int, total:int, description: str,state:list, highlighted: list, pointer: int | None = None) -> Step:
    return Step(
        step_index=index,
        total_steps=total,
        description=description,
        state=list(state),
        highlighted=highlighted,
        swapped=[],
        pointer=pointer,
    )

def linear_search_steps(arr: list[int], target:int)->list[Step]:
    steps = []
    a = list(arr)
    n = len(a)
    step_index = 0

    for i in range(n):
        steps.append(_make_step(
            step_index, 0,
            f"Checking index {i}: is {a[i]} equal to target {target}?",
            a, [i], i
        ))
        step_index += 1

        if a[i] == target:
            steps.append(_make_step(
                step_index, 0,
                f"Found target {target} at index {i}",
                a, [i], i
            ))
            step_index += 1

            total = step_index
            for s in steps:
                s.total_steps = total
            return steps
    steps.append(_make_step(
        step_index, 0,
        f"Target {target} not found in the array",
        a, [], None
    ))
    step_index += 1

    total = step_index
    for s in steps:
        s.total_steps = total
    return steps

def binary_search_steps(arr: list[int], target:int)->list[Step]:
    steps = []
    a = list(arr)
    step_index = 0
    low = 0
    high = len(a) - 1

    steps.append(_make_step(
        step_index, 0,
        f"Starting binary search for target {target} - array must be sorted",
        a, list(range(len(a))), None
    ))
    step_index += 1

    while low <= high:
        mid = (low + high) // 2

        steps.append(_make_step(
            step_index, 0,
            f"Midpoint is index {mid} with value {a[mid]} - search range is indices {low} to {high}",
            a, [low, mid, high], mid
        ))
        step_index += 1

        if a[mid] == target:
            steps.append(_make_step(
                step_index, 0, 
                f"Found target {target} at index {mid}",
                a, [mid], mid
            ))
            step_index += 1

            total = step_index
            for s in steps:
                s.total_steps = total
            return steps
        elif a[mid] < target:
            steps.append(_make_step(
                step_index, 0,
                f"{a[mid]} < {target} - eliminating left half, moving low to index {mid + 1} ",
                a, [mid + 1, high], mid
            ))
            step_index += 1
            low = mid + 1
        
        else:
            steps.append(_make_step(
                step_index, 0,
                f"{a[mid]} > {target} - eliminating right half, moving high to index {mid - 1}",
                a, [low, mid - 1], mid
            ))
            step_index += 1
            high = mid - 1
    
    steps.append(_make_step(
        step_index, 0,
        f"Target {target} not found in the array",
        a, [], None
    ))
    step_index += 1

    total = step_index
    for s in steps:
        s.total_steps = total
    return steps

SEARCHING_ALGORITHMS = {
    "linear_search": linear_search_steps,
    "binary_search": binary_search_steps,
}

       
    