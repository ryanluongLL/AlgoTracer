from app.models.step import Step

def _make_step(index: int, total: int, description: str, state:list, highlighted: list, swapped:list = [], phase: str = None) -> Step:
    return Step(
        step_index=index,
        total_steps=total,
        description=description,
        state=list(state),
        highlighted=highlighted,
        swapped=swapped,
        phase=phase,
    )

def bubble_sort_steps(arr:list[int]) -> list[Step]:
    steps = []
    a = list(arr)
    n = len(a)
    step_index = 0

    for i in range(n):
        for j in range(n - i - 1):
            steps.append(_make_step(
                step_index, 0,
                f"Comparing {a[j]} and {a[j+1]}",
                a , [j, j+1], []
            ))
            step_index += 1

            if a[j] > a[j+1]:
                a[j], a[j+1] = a[j+1], a[j]
                steps.append(_make_step(
                    step_index,0,
                    f"Swapping {a[j+1]} and {a[j]} - larger value bubbles right",
                    a, [j, j+1], [j, j+1]
                ))
                step_index += 1

    steps.append(_make_step(step_index, 0, "Array is fully sorted", a, [], []))
    step_index += 1

    total = step_index
    for s in steps:
        s.total_steps = total
    return steps

def selection_sort_steps(arr: list[int]) -> list[Step]:
    steps = []
    a = list(arr)
    n = len(a)
    step_index = 0

    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            steps.append(_make_step(
                step_index, 0,
                f"Checking if {a[j]} < current minimum {a[min_idx]}", a, [j, min_idx], []
            ))
            step_index += 1

            if a[j] < a[min_idx]:
                min_idx = j
        if min_idx != i:
            a[i], a[min_idx] = a[min_idx], a[i]
            steps.append(_make_step(
                step_index, 0,
                f"Placing minimum {a[i]} at index {i}",
                a, [i,min_idx], [i,min_idx]
            ))
            step_index += 1

    steps.append(_make_step(step_index, 0, "Array is fully sorted", a, [], []))
    step_index += 1

    total = step_index
    for s in steps:
        s.total_steps = total
    return steps
    
def insertion_sort_steps(arr: list[int]) -> list[Step]:
    steps = []
    a = list(arr)
    n = len(a)
    step_index = 0

    for i in range(1, n):
        key = a[i]
        j = i - 1

        steps.append(_make_step(
            step_index, 0,
            f"Picking key {key} at index{i} to insert sorted left side",
            a, [i], []
        ))
        step_index += 1

        while j >= 0 and a[j] > key:
            a[j+1] = a[j]
            steps.append(_make_step(
                step_index, 0,
                f"Shifting {a[j+1]} right - it is a greater than key {key}",
                a, [j, j+1], [j+1]
            ))
            step_index += 1
            j -= 1
        a[j+1] = key
        steps.append(_make_step(
            step_index, 0,
            f"Inserting key {key} at index {j+1}",
            a, [j+1], []
        ))
        step_index += 1

    steps.append(_make_step(step_index, 0, "Array is fully sorted", a, [], []))
    step_index += 1

    total = step_index
    for s in steps:
        s.total_steps = total
    return steps

def merge_sort_steps(arr:list[int]) -> list[Step]:
    steps = []
    a = list(arr)
    step_index = [0]

    def merge_sort(arr, left, right):
        if left >= right:
            return
        
        mid = (left + right) // 2
        steps.append(_make_step(
            step_index[0], 0,
            f"Dividing subarray indices {left} to {right} at midpoint {mid}",
            list(arr), list(range(left, right + 1)), [], "divide"
        ))
        step_index[0] += 1

        merge_sort(arr, left, mid)
        merge_sort(arr, mid + 1, right)

        left_part = arr[left:mid + 1]
        right_part = arr[mid + 1:right + 1]
        i = j = 0
        k = left

        while i < len(left_part) and j < len(right_part):
            steps.append(_make_step(
                step_index[0], 0,
                f"Merging: comparing {left_part[i]} and {right_part[j]}",
                list(arr), [left + i, mid + 1 + j], [], "merge"
            ))
            step_index[0] += 1

            if left_part[i] <= right_part[j]:
                arr[k] = left_part[i]
                i += 1
            else:
                arr[k] = right_part[j]
                j+=1
            k += 1
        
        while i < len(left_part):
            arr[k] = left_part[i]
            i += 1
            k += 1

        while j < len(right_part):
            arr[k] = right_part[j]
            j += 1
            k += 1
        
        steps.append(_make_step(
            step_index[0], 0,
            f"Merged subarray indices {left} to {right}: {arr[left:right + 1]}",
            list(arr), list(range(left, right + 1)), [], "merge"
        ))
        step_index[0] += 1
    merge_sort(a,0,len(a) - 1)
    steps.append(_make_step(step_index[0], 0, "Array is fully sorted", a, [], []))
    step_index[0] += 1

    total = step_index[0]
    for s in steps:
        s.total_steps = total
    return steps

def quick_sort_steps(arr:list[int]) -> list[Step]:
    steps = []
    a = list(arr)
    step_index = [0]

    def partition(arr, low, high):
        pivot = arr[high]
        i = low - 1

        steps.append(_make_step(
            step_index[0], 0,
            f"Pivot selected: {pivot} at index {high}",
            list(arr), [high], [], "partition"
        ))
        step_index[0] += 1

        for j in range(low, high):
            steps.append(_make_step(
                step_index[0], 0,
                f"Comparing {arr[j]} with pivot {pivot}",
                list(arr), [j,high], [], "partitiion"
            ))
            step_index[0] += 1

            if arr[j] <= pivot:
                i += 1
                arr[i], arr[j] = arr[j], arr[i]
                if i != j:
                    steps.append(_make_step(
                        step_index[0], 0,
                        f"Swapping {arr[j]} and {arr[i] - arr[i]} belongs left of pivot",
                        list(arr), [i,j], [i,j], "partition"
                    ))
                    step_index[0] += 1
        arr[i+1], arr[high] = arr[high], arr[i+1]
        steps.append(_make_step(
            step_index[0], 0,
            f"Placing pivot{pivot} at its final position index {i + 1}",
            list(arr), [i+1], [i+1,high], "partition"
        ))
        step_index[0] += 1
        return i + 1
    def quick_sort(arr, low, high):
        if low < high:
            pi = partition(arr, low, high)
            quick_sort(arr, low, pi - 1)
            quick_sort(arr, pi + 1, high)

    quick_sort(a, 0, len(a) - 1)
    steps.append(_make_step(step_index[0], 0, "Array is fully sorted", a, [], []))
    step_index[0] += 1

    total = step_index[0]
    for s in steps:
        s.total_steps = total
    return steps

SORTING_ALGORITHMS = {
    "bubble_sort": bubble_sort_steps,
    "selection_sort": selection_sort_steps,
    "insertion_sort": insertion_sort_steps,
    "merge_sort": merge_sort_steps,
    "quick_sort": quick_sort_steps,
}
    