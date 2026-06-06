import styles from "./PseudocodePanel.module.css";
import { Step } from "@/lib/api";
import { PSEUDOCODE } from "@/lib/pseudocode";
import { getHighlightedLines } from "@/lib/pseudocode-mapper";
import { Code2 } from "lucide-react";

interface PseudocodePanelProps {
  step: Step | null;
  algorithm: string;
}

export default function PseudocodePanel({ step, algorithm }: PseudocodePanelProps) {
  const pseudocode = PSEUDOCODE[algorithm];
  const highlightedLines = step ? getHighlightedLines(algorithm, step) : [];

  return (
    <div className={styles.panel}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerIcon}>
          <Code2 size={14} color="#6366F1" />
        </div>
        <span className={styles.headerTitle}>Pseudocode</span>
      </div>

      {/* Algorithm name */}
      {pseudocode && (
        <span className={styles.algoName}>{pseudocode.name}</span>
      )}

      {/* Step info */}
      {step && (
        <div className={styles.stepInfo}>
          <div className={styles.stepRow}>
            <span className={styles.stepLabel}>Step</span>
            <span className={styles.stepValue}>
              {step.step_index + 1} / {step.total_steps}
            </span>
          </div>
          {step.phase && (
            <div className={styles.stepRow}>
              <span className={styles.stepLabel}>Phase</span>
              <span className={styles.phaseValue}>{step.phase}</span>
            </div>
          )}
          <div className={styles.stepRow}>
            <span className={styles.stepLabel}>Active</span>
            <span className={styles.stepValue}>
              {step.highlighted.length > 0
                ? `indices [${step.highlighted.join(", ")}]`
                : "none"}
            </span>
          </div>
        </div>
      )}

      <div className={styles.divider} />

      {/* Pseudocode */}
      {pseudocode ? (
        <div className={styles.codeBlock}>
          {pseudocode.lines.map((line) => {
            const isHighlighted = highlightedLines.includes(line.line);
            return (
              <div
                key={line.line}
                className={`${styles.codeLine} ${isHighlighted ? styles.codeLineHighlight : ""}`}
              >
                <span className={styles.lineNumber}>{line.line}</span>
                <span
                  className={styles.lineCode}
                  style={{ paddingLeft: `${line.indent * 16}px` }}
                >
                  {line.code}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <p className={styles.empty}>No pseudocode available.</p>
      )}

      <div className={styles.divider} />

      {/* State snapshot */}
      {step && (
        <>
          <div className={styles.snapshotHeader}>
            <span className={styles.stepLabel}>Current state</span>
          </div>
          <div className={styles.snapshot}>
            <code className={styles.snapshotCode}>
              [{Array.isArray(step.state) && typeof step.state[0] === "number"
                ? (step.state as number[]).join(", ")
                : JSON.stringify(step.state)}]
            </code>
          </div>
        </>
      )}
    </div>
  );
}