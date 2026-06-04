import styles from "./ExplainPanel.module.css";
import { Step } from "@/lib/api";
import { Brain } from "lucide-react";

interface ExplainPanelProps {
  step: Step | null;
  explanation: string;
  isLoading: boolean;
}

export default function ExplainPanel({
  step,
  explanation,
  isLoading,
}: ExplainPanelProps) {
  return (
    <div className={styles.panel}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerIcon}>
          <Brain size={14} color="#8B5CF6" />
        </div>
        <span className={styles.headerTitle}>AI Explanation</span>
      </div>

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

      {/* Divider */}
      <div className={styles.divider} />

      {/* Explanation */}
      <div className={styles.explanationWrapper}>
        {isLoading ? (
          <div className={styles.loadingWrapper}>
            <div className={styles.loadingDots}>
              <span />
              <span />
              <span />
            </div>
            <span className={styles.loadingText}>Thinking...</span>
          </div>
        ) : explanation ? (
          <p className={styles.explanation}>{explanation}</p>
        ) : (
          <p className={styles.empty}>
            Run an algorithm to get step-by-step explanations.
          </p>
        )}
      </div>

      {/* State snapshot */}
      {step && (
        <>
          <div className={styles.divider} />
          <div className={styles.snapshotHeader}>
            <span className={styles.stepLabel}>Current state</span>
          </div>
          <div className={styles.snapshot}>
            <code className={styles.snapshotCode}>
              [{(step.state as number[]).join(", ")}]
            </code>
          </div>
        </>
      )}
    </div>
  );
}