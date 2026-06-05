import { Step } from "./api";

export function getHighlightedLines(algorithm: string, step: Step): number[] {
  const desc = step.description.toLowerCase();
  const hasSwap = step.swapped.length > 0;
  const hasHighlight = step.highlighted.length > 0;
  const isFinal = desc.includes("sorted") || desc.includes("complete") || desc.includes("operation complete");
  const notFound = desc.includes("not found");

  switch (algorithm) {
    case "bubble_sort":
      if (isFinal) return [5];
      if (hasSwap) return [4];
      if (hasHighlight) return [3];
      return [2];

    case "selection_sort":
      if (isFinal) return [7];
      if (hasSwap) return [6];
      if (desc.includes("checking")) return [4, 5];
      return [3];

    case "insertion_sort":
      if (isFinal) return [8];
      if (desc.includes("inserting key")) return [7];
      if (desc.includes("shifting")) return [5, 6];
      if (desc.includes("picking key")) return [2, 3];
      return [4];

    case "merge_sort":
      if (isFinal) return [9];
      if (step.phase === "divide") return [2, 3];
      if (desc.includes("comparing")) return [6];
      if (desc.includes("merged subarray")) return [8, 9];
      return [7];

    case "quick_sort":
      if (isFinal) return [9];
      if (desc.includes("pivot selected")) return [1, 2];
      if (desc.includes("placing pivot")) return [6];
      if (hasSwap) return [5];
      if (desc.includes("comparing")) return [4];
      return [3];

    case "linear_search":
      if (notFound) return [4];
      if (desc.includes("found")) return [3];
      return [1, 2];

    case "binary_search":
      if (notFound) return [9];
      if (desc.includes("found")) return [5];
      if (desc.includes("eliminating left")) return [6, 7];
      if (desc.includes("eliminating right")) return [8];
      if (desc.includes("midpoint")) return [3, 4];
      return [1, 2];

    case "linked_list":
      if (desc.includes("visiting")) return [2, 3, 4];
      if (desc.includes("inserting")) return [5, 6];
      if (desc.includes("re-linking")) return [7, 8];
      return [1];

    case "stack":
      if (desc.includes("pushing")) return [1, 2];
      if (desc.includes("popping")) return [3, 4, 5];
      if (desc.includes("peeking") && desc.includes("top")) return [6, 7];
      return [1];

    case "queue":
      if (desc.includes("enqueuing")) return [1, 2];
      if (desc.includes("dequeuing")) return [3, 4, 5];
      if (desc.includes("peeking") && desc.includes("front")) return [6, 7];
      return [1];

    case "bst":
      if (desc.includes("going left")) return [2, 3];
      if (desc.includes("going right")) return [4];
      if (desc.includes("found")) return [6, 7];
      if (desc.includes("visiting node") && desc.includes("inorder")) return [8, 9];
      if (desc.includes("inserted")) return [2, 3, 4];
      return [1];

    default:
      return [1];
  }
}