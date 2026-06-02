from app.engines.data_structures import (
    linked_list_steps,
    stack_steps,
    queue_steps,
    bst_steps,
)

# Linked List Tests
def test_linked_list_traverse():
    steps = linked_list_steps([1, 2, 3], "traverse")
    assert steps[-1].description == "Operation complete"


def test_linked_list_insert():
    steps = linked_list_steps([1, 2, 3], "insert", 4)
    states = [s.state for s in steps]
    assert 4 in states[-1]


def test_linked_list_delete():
    steps = linked_list_steps([1, 2, 3], "delete", 2)
    assert 2 not in steps[-1].state


def test_linked_list_delete_not_found():
    steps = linked_list_steps([1, 2, 3], "delete", 99)
    assert "not found" in steps[-1].description or steps[-1].description == "Operation complete"


# Stack Tests
def test_stack_push():
    steps = stack_steps([1, 2, 3], "push", 4)
    assert 4 in steps[-1].state


def test_stack_pop():
    steps = stack_steps([1, 2, 3], "pop")
    assert 3 not in steps[-1].state


def test_stack_pop_empty():
    steps = stack_steps([], "pop")
    assert "empty" in steps[-1].description or steps[-1].description == "Operation complete"


def test_stack_peek():
    steps = stack_steps([1, 2, 3], "peek")
    assert "3" in steps[-2].description


# Queue Tests
def test_queue_enqueue():
    steps = queue_steps([1, 2, 3], "enqueue", 4)
    assert 4 in steps[-1].state


def test_queue_dequeue():
    steps = queue_steps([1, 2, 3], "dequeue")
    assert 1 not in steps[-1].state


def test_queue_dequeue_empty():
    steps = queue_steps([], "dequeue")
    assert "empty" in steps[-1].description or steps[-1].description == "Operation complete"


def test_queue_peek():
    steps = queue_steps([1, 2, 3], "peek")
    assert "1" in steps[-2].description


# BST Tests
def test_bst_insert():
    steps = bst_steps([5, 3, 7], "insert", 4)
    assert any("Inserted 4" in s.description for s in steps)


def test_bst_search_found():
    steps = bst_steps([5, 3, 7], "search", 3)
    assert any("Found 3" in s.description for s in steps)


def test_bst_search_not_found():
    steps = bst_steps([5, 3, 7], "search", 99)
    assert any("not found" in s.description for s in steps)


def test_bst_traverse():
    steps = bst_steps([5, 3, 7], "traverse")
    assert any("inorder traversal complete" in s.description.lower() for s in steps)


# Shared Tests
def test_step_index_is_sequential():
    for steps in [
        linked_list_steps([1, 2, 3], "traverse"),
        stack_steps([1, 2, 3], "push", 4),
        queue_steps([1, 2, 3], "enqueue", 4),
        bst_steps([5, 3, 7], "search", 3),
    ]:
        for i, step in enumerate(steps):
            assert step.step_index == i


def test_total_steps_is_consistent():
    for steps in [
        linked_list_steps([1, 2, 3], "traverse"),
        stack_steps([1, 2, 3], "pop"),
        queue_steps([1, 2, 3], "dequeue"),
        bst_steps([5, 3, 7], "insert", 6),
    ]:
        for step in steps:
            assert step.total_steps == len(steps)