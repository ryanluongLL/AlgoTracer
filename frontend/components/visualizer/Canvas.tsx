///Canvas handles two cases — array-based algorithms (sorting and searching) render ArrayNode components, while data structures fall back to a JSON view for now
import styles from "./Canvas.module.css"
import ArrayNode from "./ArrayNode"
import { Step } from "@/lib/api"

interface CanvasProps{
    step: Step | null;
    isLoading: boolean;
    algorithm: string;
}

export default function Canvas({ step, isLoading, algorithm }: CanvasProps) {
    if (isLoading) {
        return (
            <div className={styles.canvas}>
                <div className={styles.loading}>
                    <div className={styles.spinner} />
                    <span className={styles.loadingText}>Running algorithm...</span>
                </div>
            </div>
        )
    }

    if (!step) {
        return (
            <div className={styles.canvas}>
                <p className={styles.empty}>Select an algorithm and press Run</p>
            </div>
        );
    }

    const isArrayAlgorithm = !["linked_list", "stack", "queue", "bst"].includes(algorithm);

    return (
        <div className={styles.canvas}>
            {/* Step description */}
            <div className={styles.descriptionBar}>
                <span className={styles.description}>{step.description}</span>
                {step.phase && (
                    <span className={styles.phase}>{step.phase}</span>
                )}
            </div>

            {/* Array visualization */}
            {isArrayAlgorithm && (
                <div className={styles.nodesWrapper}>
                    <div className={styles.nodes}>
                        {(step.state as number[]).map((value, index) => (
                            <ArrayNode
                                key={index}
                                value={value}
                                index={index}
                                isHighlighted={step.highlighted.includes(index)}
                                isSwapped={step.swapped.includes(index)}
                                isSorted={
                                    !step.highlighted.includes(index) && 
                                    !step.swapped.includes(index) &&
                                    step.step_index === step.total_steps - 1
                                }
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Data structure text fallback */}
            {!isArrayAlgorithm && (
                <div className={styles.dsWrapper}>
                    <pre className={styles.dsState}>
                        {JSON.stringify(step.state, null, 2)}
                    </pre>
                </div>
            )}

            {/* Step counter */}
            <div className={styles.stepCounter}>
                <span className={styles.stepText}>
                    Step <span className={styles.stepAccent}>{step.step_index + 1}</span> of {step.total_steps}
                </span>
            </div>
        </div>
    )
}