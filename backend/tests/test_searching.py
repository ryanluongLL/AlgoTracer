from app.engines.searching import linear_search_steps, binary_search_steps

INPUT = [1, 3, 5, 7, 9, 11]
TARGET_FOUND = 7
TARGET_NOT_FOUND = 4


def test_linear_search_finds_target():
    steps = linear_search_steps(INPUT, TARGET_FOUND)
    last = steps[-1]
    assert str(TARGET_FOUND) in last.description


def test_linear_search_target_not_found():
    steps = linear_search_steps(INPUT, TARGET_NOT_FOUND)
    last = steps[-1]
    assert "not found" in last.description


def test_binary_search_finds_target():
    steps = binary_search_steps(INPUT, TARGET_FOUND)
    last = steps[-1]
    assert str(TARGET_FOUND) in last.description


def test_binary_search_target_not_found():
    steps = binary_search_steps(INPUT, TARGET_NOT_FOUND)
    last = steps[-1]
    assert "not found" in last.description


def test_total_steps_is_consistent():
    for fn, target in [
        (linear_search_steps, TARGET_FOUND),
        (linear_search_steps, TARGET_NOT_FOUND),
        (binary_search_steps, TARGET_FOUND),
        (binary_search_steps, TARGET_NOT_FOUND),
    ]:
        steps = fn(INPUT, target)
        for step in steps:
            assert step.total_steps == len(steps)


def test_step_index_is_sequential():
    for fn, target in [
        (linear_search_steps, TARGET_FOUND),
        (binary_search_steps, TARGET_FOUND),
    ]:
        steps = fn(INPUT, target)
        for i, step in enumerate(steps):
            assert step.step_index == i