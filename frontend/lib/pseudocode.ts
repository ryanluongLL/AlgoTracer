export interface PseudocodeLine {
  line: number;
  code: string;
  indent: number;
}

export interface AlgorithmPseudocode {
  name: string;
  lines: PseudocodeLine[];
}

export const PSEUDOCODE: Record<string, AlgorithmPseudocode> = {
  bubble_sort: {
    name: "Bubble Sort",
    lines: [
      { line: 1, code: "for i from 0 to n-1", indent: 0 },
      { line: 2, code: "for j from 0 to n-i-2", indent: 1 },
      { line: 3, code: "if arr[j] > arr[j+1]", indent: 2 },
      { line: 4, code: "swap arr[j] and arr[j+1]", indent: 3 },
      { line: 5, code: "return arr", indent: 0 },
    ],
  },
  selection_sort: {
    name: "Selection Sort",
    lines: [
      { line: 1, code: "for i from 0 to n-1", indent: 0 },
      { line: 2, code: "min_idx = i", indent: 1 },
      { line: 3, code: "for j from i+1 to n-1", indent: 1 },
      { line: 4, code: "if arr[j] < arr[min_idx]", indent: 2 },
      { line: 5, code: "min_idx = j", indent: 3 },
      { line: 6, code: "swap arr[i] and arr[min_idx]", indent: 1 },
      { line: 7, code: "return arr", indent: 0 },
    ],
  },
  insertion_sort: {
    name: "Insertion Sort",
    lines: [
      { line: 1, code: "for i from 1 to n-1", indent: 0 },
      { line: 2, code: "key = arr[i]", indent: 1 },
      { line: 3, code: "j = i - 1", indent: 1 },
      { line: 4, code: "while j >= 0 and arr[j] > key", indent: 1 },
      { line: 5, code: "arr[j+1] = arr[j]", indent: 2 },
      { line: 6, code: "j = j - 1", indent: 2 },
      { line: 7, code: "arr[j+1] = key", indent: 1 },
      { line: 8, code: "return arr", indent: 0 },
    ],
  },
  merge_sort: {
    name: "Merge Sort",
    lines: [
      { line: 1, code: "if left >= right: return", indent: 0 },
      { line: 2, code: "mid = (left + right) / 2", indent: 0 },
      { line: 3, code: "divide array at midpoint", indent: 0 },
      { line: 4, code: "mergeSort(arr, left, mid)", indent: 0 },
      { line: 5, code: "mergeSort(arr, mid+1, right)", indent: 0 },
      { line: 6, code: "compare left[i] and right[j]", indent: 0 },
      { line: 7, code: "place smaller element into arr", indent: 1 },
      { line: 8, code: "copy remaining elements", indent: 0 },
      { line: 9, code: "return merged arr", indent: 0 },
    ],
  },
  quick_sort: {
    name: "Quick Sort",
    lines: [
      { line: 1, code: "pivot = arr[high]", indent: 0 },
      { line: 2, code: "i = low - 1", indent: 0 },
      { line: 3, code: "for j from low to high-1", indent: 0 },
      { line: 4, code: "if arr[j] <= pivot", indent: 1 },
      { line: 5, code: "i++, swap arr[i] and arr[j]", indent: 2 },
      { line: 6, code: "swap arr[i+1] and arr[high]", indent: 0 },
      { line: 7, code: "quickSort(arr, low, pi-1)", indent: 0 },
      { line: 8, code: "quickSort(arr, pi+1, high)", indent: 0 },
      { line: 9, code: "return arr", indent: 0 },
    ],
  },
  linear_search: {
    name: "Linear Search",
    lines: [
      { line: 1, code: "for i from 0 to n-1", indent: 0 },
      { line: 2, code: "if arr[i] == target", indent: 1 },
      { line: 3, code: "return i", indent: 2 },
      { line: 4, code: "return -1 (not found)", indent: 0 },
    ],
  },
  binary_search: {
    name: "Binary Search",
    lines: [
      { line: 1, code: "low = 0, high = n-1", indent: 0 },
      { line: 2, code: "while low <= high", indent: 0 },
      { line: 3, code: "mid = (low + high) / 2", indent: 1 },
      { line: 4, code: "if arr[mid] == target", indent: 1 },
      { line: 5, code: "return mid", indent: 2 },
      { line: 6, code: "else if arr[mid] < target", indent: 1 },
      { line: 7, code: "low = mid + 1", indent: 2 },
      { line: 8, code: "else high = mid - 1", indent: 1 },
      { line: 9, code: "return -1 (not found)", indent: 0 },
    ],
  },
  linked_list: {
    name: "Linked List",
    lines: [
      { line: 1, code: "node = head", indent: 0 },
      { line: 2, code: "while node != null", indent: 0 },
      { line: 3, code: "visit node.value", indent: 1 },
      { line: 4, code: "node = node.next", indent: 1 },
      { line: 5, code: "// insert: traverse to end", indent: 0 },
      { line: 6, code: "new_node.next = null", indent: 1 },
      { line: 7, code: "// delete: re-link pointers", indent: 0 },
      { line: 8, code: "prev.next = node.next", indent: 1 },
    ],
  },
  stack: {
    name: "Stack",
    lines: [
      { line: 1, code: "// push", indent: 0 },
      { line: 2, code: "stack.append(value)", indent: 1 },
      { line: 3, code: "// pop", indent: 0 },
      { line: 4, code: "if stack is empty: error", indent: 1 },
      { line: 5, code: "return stack.pop()", indent: 1 },
      { line: 6, code: "// peek", indent: 0 },
      { line: 7, code: "return stack[-1]", indent: 1 },
    ],
  },
  queue: {
    name: "Queue",
    lines: [
      { line: 1, code: "// enqueue", indent: 0 },
      { line: 2, code: "queue.append(value)", indent: 1 },
      { line: 3, code: "// dequeue", indent: 0 },
      { line: 4, code: "if queue is empty: error", indent: 1 },
      { line: 5, code: "return queue.pop(0)", indent: 1 },
      { line: 6, code: "// peek", indent: 0 },
      { line: 7, code: "return queue[0]", indent: 1 },
    ],
  },
  bst: {
    name: "Binary Search Tree",
    lines: [
      { line: 1, code: "// insert", indent: 0 },
      { line: 2, code: "if value < node.value", indent: 1 },
      { line: 3, code: "go left", indent: 2 },
      { line: 4, code: "else go right", indent: 1 },
      { line: 5, code: "// search", indent: 0 },
      { line: 6, code: "if node.value == target", indent: 1 },
      { line: 7, code: "return node", indent: 2 },
      { line: 8, code: "// inorder traverse", indent: 0 },
      { line: 9, code: "traverse(left), visit, traverse(right)", indent: 1 },
    ],
  },
};