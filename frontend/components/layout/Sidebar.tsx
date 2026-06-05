"use client";

import { useState } from "react";
import styles from "./Sidebar.module.css";

interface SidebarProps {
  selectedAlgorithm: string;
  onRun: (algorithm: string, data: number[], target?: number, operation?: string) => void;
  onAlgorithmChange: (algorithm: string) => void;
  inputData: number[];
  setInputData: (data: number[]) => void;
  isLoading: boolean;
}

const categories = [
  {
    label: "Sorting",
    color: "#3B82F6",
    algorithms: [
      { label: "Bubble Sort", value: "bubble_sort" },
      { label: "Selection Sort", value: "selection_sort" },
      { label: "Insertion Sort", value: "insertion_sort" },
      { label: "Merge Sort", value: "merge_sort" },
      { label: "Quick Sort", value: "quick_sort" },
    ],
  },
  {
    label: "Searching",
    color: "#8B5CF6",
    algorithms: [
      { label: "Linear Search", value: "linear_search" },
      { label: "Binary Search", value: "binary_search" },
    ],
  },
  {
    label: "Data Structures",
    color: "#10B981",
    algorithms: [
      { label: "Linked List", value: "linked_list" },
      { label: "Stack", value: "stack" },
      { label: "Queue", value: "queue" },
      { label: "BST", value: "bst" },
    ],
  },
];

const SEARCHING = ["linear_search", "binary_search"];
const DATA_STRUCTURES = ["linked_list", "stack", "queue", "bst"];

const operationOptions: Record<string, string[]> = {
  linked_list: ["traverse", "insert", "delete"],
  stack: ["push", "pop", "peek"],
  queue: ["enqueue", "dequeue", "peek"],
  bst: ["insert", "search", "traverse"],
};

export default function Sidebar({
  selectedAlgorithm,
  onRun,
  onAlgorithmChange,
  inputData,
  setInputData,
  isLoading,
}: SidebarProps) {
  const [inputRaw, setInputRaw] = useState(inputData.join(", "));
  const [target, setTarget] = useState<string>("");
  const [operation, setOperation] = useState<string>("traverse");
  const [inputError, setInputError] = useState("");

  const isSearching = SEARCHING.includes(selectedAlgorithm);
  const isDataStructure = DATA_STRUCTURES.includes(selectedAlgorithm);
  const needsTarget = isSearching || ["linked_list", "bst"].includes(selectedAlgorithm);
  const needsOperation = isDataStructure;

  const parseInput = (raw: string): number[] | null => {
    try {
      const parsed = raw
        .split(",")
        .map((s) => parseInt(s.trim()))
        .filter((n) => !isNaN(n));
      if (parsed.length === 0) return null;
      return parsed;
    } catch {
      return null;
    }
  };

  const handleRun = () => {
    const parsed = parseInput(inputRaw);
    if (!parsed) {
      setInputError("Enter comma-separated numbers e.g. 5, 3, 8, 1");
      return;
    }
    setInputError("");
    setInputData(parsed);

    const targetNum = target !== "" ? parseInt(target) : undefined;
    const op = needsOperation ? operation : undefined;
    onRun(selectedAlgorithm, parsed, targetNum, op);
  };

  const handleAlgorithmSelect = (value: string) => {
    if (operationOptions[value]) {
      setOperation(operationOptions[value][0]);
    }
  
    onAlgorithmChange(value);
  
    const isSearchingAlgo = SEARCHING.includes(value);
    const isDataStructureAlgo = DATA_STRUCTURES.includes(value);
  
    if (isSearchingAlgo) return;
  
    const parsed = parseInput(inputRaw) ?? inputData;
  
    if (isDataStructureAlgo) {
      const op = operationOptions[value]?.[0] ?? "traverse";
      onRun(value, parsed, undefined, op);
      return;
    }
  
    onRun(value, parsed);
  };

  return (
    <div className={styles.sidebar}>
      {/* Input */}
      <div className={styles.section}>
        <label className={styles.label}>Input Array</label>
        <input
          className={styles.input}
          value={inputRaw}
          onChange={(e) => setInputRaw(e.target.value)}
          placeholder="5, 3, 8, 1, 9, 2"
        />
        {inputError && <span className={styles.error}>{inputError}</span>}
      </div>

      {/* Target */}
      {needsTarget && (
        <div className={styles.section}>
          <label className={styles.label}>Target Value</label>
          <input
            className={styles.input}
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder="e.g. 7"
            type="number"
          />
        </div>
      )}

      {/* Operation */}
      {needsOperation && (
        <div className={styles.section}>
          <label className={styles.label}>Operation</label>
          <div className={styles.operationButtons}>
            {operationOptions[selectedAlgorithm]?.map((op) => (
              <button
                key={op}
                className={`${styles.opButton} ${operation === op ? styles.opButtonActive : ""}`}
                onClick={() => setOperation(op)}
              >
                {op}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Run button */}
      <button
        className={styles.runButton}
        onClick={handleRun}
        disabled={isLoading}
      >
        {isLoading ? "Running..." : "Run"}
      </button>

      <div className={styles.divider} />

      {/* Algorithm list */}
      {categories.map((cat) => (
        <div key={cat.label} className={styles.category}>
          <span
            className={styles.categoryLabel}
            style={{ color: cat.color }}
          >
            {cat.label}
          </span>
          <div className={styles.algorithmList}>
            {cat.algorithms.map((algo) => (
              <button
                key={algo.value}
                className={`${styles.algoButton} ${selectedAlgorithm === algo.value ? styles.algoButtonActive : ""}`}
                onClick={() => handleAlgorithmSelect(algo.value)}
              >
                {algo.label}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}