from app.engines.sorting import (
    bubble_sort_steps,
    selection_sort_steps,
    insertion_sort_steps,
    merge_sort_steps,
    quick_sort_steps,
)

ALGORITHMS = [
    bubble_sort_steps,
    selection_sort_steps,
    insertion_sort_steps,
    merge_sort_steps,
    quick_sort_steps,
]

INPUT = [5, 3, 8, 1, 9, 2]
EXPECTED = sorted(INPUT)


def test_final_state_is_sorted():
    for algo in ALGORITHMS:
        steps = algo(INPUT)
        assert steps[-1].state == EXPECTED, f"{algo.__name__} final state is not sorted"


def test_total_steps_is_consistent():
    for algo in ALGORITHMS:
        steps = algo(INPUT)
        for step in steps:
            assert step.total_steps == len(steps), f"{algo.__name__} has inconsistent total_steps"


def test_step_index_is_sequential():
    for algo in ALGORITHMS:
        steps = algo(INPUT)
        for i, step in enumerate(steps):
            assert step.step_index == i, f"{algo.__name__} has out of order step_index at {i}"


def test_state_is_a_snapshot():
    for algo in ALGORITHMS:
        steps = algo(INPUT)
        first_state = steps[0].state
        last_state = steps[-1].state
        assert first_state != last_state, f"{algo.__name__} states look like references not snapshots"