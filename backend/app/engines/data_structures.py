from app.models.step import Step

def _make_step(index: int, total:int, description: str, state: list, highlighted:list, phase:str | None = None)-> Step:
    return Step(
        step_index=index,
        total_steps=total,
        description=description,
        state=list(state),
        highlighted=highlighted,
        swapped=[],
        phase=phase,
    )

def linked_list_steps(arr:list[int], operation: str, target:int | None = None) -> list[Step]:
    steps = []
    a = list(arr)
    step_index = 0

    steps.append(_make_step(
        step_index, 0,
        f"Starting linked list with nodes: {a}",
        a, []
    ))
    step_index += 1

    if operation == "traverse":
        for i in range(len(a)):
            steps.append(_make_step(
                step_index, 0,
                f"Visiting node at index {i} with value {a[i]}",
                a, [i]
            ))
            step_index += 1

        steps.append(_make_step(
            step_index, 0,
            "Reached end of linked list - traversal complete",
            a, []
        ))
        step_index += 1
    elif operation == "insert" and target is not None:
        a.append(target)
        steps.append(_make_step(
            step_index, 0,
            f"Traversing to the end of the list to insert{target}",
            a, list(range(len(a) - 1))
        ))
        step_index += 1

        steps.append(_make_step(
            step_index, 0,
            f"Inserting {target} at the end — setting previous node's next pointer",
            a, [len(a) - 1], "insert"
        ))
        step_index += 1
    elif operation == "delete" and target is not None:
        if target in a:
            idx = a.index(target)
            steps.append(_make_step(
                step_index, 0,
                f"Searching for node with value {target} to delete",
                a, list(range(idx + 1))
            ))
            step_index += 1

            steps.append(_make_step(
                step_index, 0,
                f"Found {target} at index {idx} — re-linking previous node to next node",
                a, [idx], "delete"
            ))
            step_index += 1

            a.pop(idx)
            steps.append(_make_step(
                step_index, 0,
                f"Node {target} removed - updated list: {a}",
                a, []
            ))
            step_index += 1
        else:
            steps.append(_make_step(
                step_index, 0,
                f"Value {target} not found in the linked list",
                a, []
            ))
            step_index += 1

    steps.append(_make_step(
        step_index, 0, "Operation complete", a, []
    ))
    step_index += 1

    total = step_index
    for s in steps:
        s.total_steps = total
    return steps

def stack_steps(arr: list[int], operation: str, target: int | None = None) -> list[Step]:
    steps = []
    a = list(arr)
    step_index = 0

    steps.append(_make_step(
        step_index, 0,
        f"Current stack from bottom to top: {a}", a, []
    ))
    step_index += 1

    if operation == "push" and target is not None:
        steps.append(_make_step(
            step_index, 0,
            f"Pushing {target} onto the top of stack", a, []
        ))
        step_index += 1

        a.append(target)
        steps.append(_make_step(
            step_index, 0,
            f"{target} is now on top - stack is now: {a}", a, [len(a) - 1], "push"
        ))
        step_index += 1

    elif operation == "pop":
        if len(a) == 0:
            steps.append(_make_step(
                step_index, 0,
                "Stack is empty - cannot pop", a, []
            ))
            step_index += 1
        else:
            top = a[-1]
            steps.append(_make_step(
                step_index,0,
                f"Popping {top} from the top of the stack",
                a, [len(a) - 1], "pop"
            ))
            step_index += 1

            a.pop()
            steps.append(_make_step(
                step_index, 0,
                f"{top} removed - stack is now: {a}", a, []
            ))
            step_index += 1
    elif operation == "peek":
        if len(a) == 0:
            steps.append(_make_step(
                step_index, 0,
                "Stack is empty - nothing to peek", a, []
            ))
            step_index += 1
        else:
            steps.append(_make_step(
                step_index, 0,
                f"Peeking at top of stack — value is {a[-1]}, stack is unchanged",
                a, [len(a) - 1], "peek"
            ))
            step_index += 1
    steps.append(_make_step(
        step_index, 0,
        "Operation complete", a, []
    ))
    step_index += 1

    total = step_index
    for s in steps:
        s.total_steps = total
    return steps

def queue_steps(arr: list[int], operation: str, target: int | None = None ) -> list[Step]:
    steps = []
    a = list(arr)
    step_index = 0

    steps.append(_make_step(
        step_index, 0,
        f"Current queeu from front to back: {a}",
        a, []
    ))
    step_index += 1

    if operation == "enqueue" and target is not None:
        steps.append(_make_step(
            step_index, 0,
            f"Enqueuing {target} at the back of the queue", a, []
        ))
        step_index += 1

        a.append(target)
        steps.append(_make_step(
            step_index, 0,
            f"{target} added to the back - queue is now: {a}",
            a, [len(a) - 1], "enqueue"
        ))
        step_index += 1
    elif operation == "dequeue":
        if len(a) == 0:
            steps.append(_make_step(
                step_index, 0,
                "Queue is empty - cannot dequeue", a, []
            ))
            step_index += 1
        else:
            front = a[0]
            steps.append(_make_step(
                step_index, 0,
                f"Dequeuing {front} from the front of the queue", a, [0], "dequeue"
            ))
            step_index += 1

            a.pop(0)
            steps.append(_make_step(
                step_index, 0,
                f"{front} removed - queue is now: {a}", a, []
            ))
            step_index += 1
    elif operation == "peek":
        if len(a) == 0:
            steps.append(_make_step(
                step_index, 0,
                "Queue is empty - nothing to peek", a, []
            ))
            step_index += 1
        else:
            steps.append(_make_step(
                step_index, 0,
                f"Peeking at front of queue - value is {a[0]}, queue is unchanged", a, [0], "peek"
            ))
            step_index += 1
    steps.append(_make_step(
        step_index, 0,
        "Operation complete", a, []
    ))
    step_index += 1

    total = step_index
    for s in steps:
        s.total_steps = total
    return steps

def bst_steps(arr: list[int], operation: str, target: int | None = None) -> list[Step]:
    steps = []
    step_index = [0]

    #Internal tree node
    class Node:
        def __init__(self, value):
            self.value = value
            self.left = None
            self.right = None

    def tree_to_list(node):
        if node is None:
            return None
        return{
            "value": node.value,
            "left": tree_to_list(node.left),
            "right": tree_to_list(node.right),
        }
    
    def insert(root, value):
        if root is None:
            return Node(value)
        if value < root.value:
            root.left = insert(root.left, value)
        else:
            root.right = insert(root.right, value)
        return root
    
    #Build the initial tree from arr
    root = None
    for val in arr:
        root = insert(root, val)

    def snapshot():
        return [tree_to_list(root)]
    
    steps.append(Step(
        step_index=step_index[0],
        total_steps = 0,
        description=f"BST built from {arr}",
        state=snapshot(),
        highlighted=[],
        swapped=[],
        phase=None,
    ))
    step_index[0] += 1

    if operation == "insert" and target is not None:
        steps.append(Step(
            step_index=step_index[0],
            total_steps=0,
            description=f"Inserting {target} into the BST",
            state=snapshot(),
            highlighted=[],
            swapped=[],
            phase="insert",
        ))
        step_index[0] += 1

        node = root
        while node is not None:
            if target < node.value:
                steps.append(Step(
                    step_index=step_index[0],
                    total_steps=0,
                    description=f"{target} < {node.value} - going left",
                    state=snapshot(),
                    highlighted=[node.value],
                    swapped=[],
                    phase="insert",
                ))
                step_index[0] += 1
                if node.left is None:
                    node.left = Node(target)
                    break
                node = node.left
            else:
                steps.append(Step(
                    step_index=step_index[0],
                    total_steps = 0,
                    description=f"{target} >= {node.value} - going right",
                    state=snapshot(),
                    highlighted=[node.value],
                    swapped=[],
                    phase="insert",
                ))
                step_index[0] += 1
                if node.right is None:
                    node.right = Node(target)
                    break
                node = node.right
        steps.append(Step(
            step_index=step_index[0],
            total_steps=0,
            description=f"Inserted {target} into its correct position",
            state=snapshot(),
            highlighted=[target],
            swapped=[],
            phase="insert",
        ))
        step_index[0] += 1
    elif operation == "search" and target is not None:
        node = root
        while node is not None:
            steps.append(Step(
                step_index=step_index[0],
                total_steps=0,
                description=f"Visiting node {node.value} - is it {target}?",
                state=snapshot(),
                highlighted=[node.value],
                swapped=[],
                phase="search",
            ))
            step_index[0] += 1

            if node.value == target:
                steps.append(Step(
                    step_index=step_index[0],
                    total_steps=0,
                    description=f"Found {target} in the BST",
                    state=snapshot(),
                    highlighted=[target],
                    swapped=[],
                    phase="search",
                ))
                step_index[0] += 1
                break
            elif target < node.value:
                steps.append(Step(
                    step_index=step_index[0],
                    total_steps=0,
                    description=f"{target} < {node.value} - going left",
                    state=snapshot(),
                    highlighted=[node.value],
                    swapped=[],
                    phase="search",
                ))
                step_index[0] += 1
                node = node.left
            else:
                steps.append(Step(
                    step_index=step_index[0],
                    total_steps=0,
                    description=f"{target} > {node.value} - going right",
                    state=snapshot(),
                    highlighted=[node.value],
                    swapped=[],
                    phase="search",
                ))
                step_index[0] += 1
                node = node.right
        if node is None:
            steps.append(Step(
                step_index=step_index[0],
                total_steps=0,
                description=f"{target} not found in the BST",
                state=snapshot(),
                highlighted=[],
                swapped=[],
                phase="search",
            ))
            step_index[0] += 1
    elif operation == "traverse":
        result = []

        def inorder(node):
            if node is None:
                return
            inorder(node.left)
            steps.append(Step(
                step_index=step_index[0],
                total_steps=0,
                description=f"Visiting node {node.value} in inorder traversal",
                state=snapshot(),
                highlighted=[node.value],
                swapped=[],
                phase="traverse",
            ))
            step_index[0] += 1
            result.append(node.value)
            inorder(node.right)
        
        inorder(root)
        steps.append(Step(
            step_index=step_index[0],
            total_steps=0,
            description=f"Inorder traversal complete: {result}",
            state=snapshot(),
            highlighted=[],
            swapped=[],
            phase="traverse",
        ))
        step_index[0] += 1

    steps.append(Step(
        step_index=step_index[0],
        total_steps=0,
        description="Operation complete",
        state=snapshot(),
        highlighted=[],
        swapped=[],
        phase=None,
    ))
    step_index[0] += 1

    total = step_index[0]
    for s in steps:
        s.total_steps = total
    return steps

DATA_STRUCTURE_ALGORITHMS = {
    "linked_list": linked_list_steps,
    "stack": stack_steps,
    "queue": queue_steps,
    "bst": bst_steps,
}