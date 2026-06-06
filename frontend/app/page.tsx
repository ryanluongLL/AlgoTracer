import Link from "next/link";
import { ArrowRight } from "lucide-react";
import styles from "./page.module.css";

const algorithmCategories = [
  {
    category: "Sorting",
    color: "#3B82F6",
    algorithms: ["Bubble Sort", "Selection Sort", "Insertion Sort", "Merge Sort", "Quick Sort"],
  },
  {
    category: "Searching",
    color: "#8B5CF6",
    algorithms: ["Linear Search", "Binary Search"],
  },
  {
    category: "Data Structures",
    color: "#10B981",
    algorithms: ["Linked List", "Stack", "Queue", "Binary Search Tree"],
  },
];

const mockNodes = [
  { value: 1, type: "sorted" },
  { value: 3, type: "sorted" },
  { value: 5, type: "highlight" },
  { value: 8, type: "highlight" },
  { value: 2, type: "default" },
  { value: 9, type: "default" },
];

const nodeTypeClass: Record<string, string> = {
  default: styles.mockNodeDefault,
  highlight: styles.mockNodeHighlight,
  swap: styles.mockNodeSwap,
  sorted: styles.mockNodeSorted,
};

export default function Home() {
  return (
    <div className={styles.page}>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <span className={styles.heroLabel}>Algorithm Visualizer</span>

          <h1 className={styles.heroTitle}>
            Learn algorithms
            <br />
            by watching them
            <br />
            <span className={styles.heroTitleAccent}>think.</span>
          </h1>

          <div className={styles.heroActions}>
            <Link href="/visualizer" className={styles.heroCta}>
              Launch Visualizer
              <ArrowRight size={16} />
            </Link>
            <a
              href="https://github.com/ryanluongLL/AlgoTracer"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.heroCtaSecondary}
            >
              View source
            </a>
          </div>
        </div>

        <div className={styles.heroRight}>
          <div className={styles.mockVisualizer}>
            <div className={styles.mockHeader}>
              <span className={styles.mockAlgoName}>Merge Sort</span>
              <span className={styles.mockStep}>
                Step <span className={styles.mockStepAccent}>7</span> of 18
              </span>
            </div>

            <div className={styles.mockNodes}>
              {mockNodes.map((node, i) => (
                <div
                  key={i}
                  className={`${styles.mockNode} ${nodeTypeClass[node.type]}`}
                  style={{ height: `${40 + node.value * 6}px` }}
                >
                  {node.value}
                </div>
              ))}
            </div>

            <div className={styles.mockDescription}>
              Comparing 5 and 8 — merging left and right partitions
            </div>

            <p className={styles.mockExplanation}>
              Both 5 and 8 are being pulled from separate sorted halves. Since 5 is smaller, it gets placed first into the merged result.
            </p>
          </div>
        </div>
      </section>

      {/* Strip */}
      <div className={styles.strip}>
        {["12 algorithms", "Step by step", "AI explanations", "Free & open source"].map((item) => (
          <div key={item} className={styles.stripItem}>
            <span className={styles.stripDot} />
            {item}
          </div>
        ))}
      </div>

      {/* Algorithms */}
      <section className={styles.algoSection}>
        <div className={styles.algoSectionHeader}>
          <h2 className={styles.algoSectionTitle}>What you can trace</h2>
          <span className={styles.algoSectionCount}>12 algorithms</span>
        </div>

        <div className={styles.algoGrid}>
          {algorithmCategories.map((cat) => (
            <div key={cat.category} className={styles.algoCategory}>
              <span
                className={styles.algoCategoryLabel}
                style={{ color: cat.color }}
              >
                {cat.category}
              </span>
              <ul className={styles.algoList}>
                {cat.algorithms.map((algo, i) => (
                  <li key={algo} className={styles.algoItem}>
                    <span className={styles.algoItemIndex}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {algo}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}