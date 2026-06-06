import styles from "./DataStructureCanvas.module.css"
import { Step } from "@/lib/api"

interface DataStructureCanvasProps{
    step: Step | null;
    algorithm: string;
}

export default function DataStructureCanvas({ step, algorithm }: DataStructureCanvasProps) {
  if (!step) return null;

  switch (algorithm) {
    case "stack":
      return <StackRenderer step={step} />;
    case "queue":
      return <QueueRenderer step={step} />;
    case "linked_list":
      return <LinkedListRenderer step={step} />;
    case "bst":
      return <BSTRenderer step={step} />;
    default:
      return null;
  }
}

function StackRenderer({ step }: { step: Step }) {
    const state = step.state as number[];
    const topIndex = state.length - 1;

    return (
        <div className={styles.stackWrapper}>
            <div className={styles.stackLabel}>TOP</div>
            <div className={styles.stack}>
                {[...state].reverse().map((value, i) => {
                    const originalIndex = state.length - 1 - i;
                    const isTop = originalIndex === topIndex;
                    const isHighlighted = step.highlighted.includes(originalIndex);

                    return (
                        <div
                            key={i}
                            className={`${styles.stackNode} ${isHighlighted ? styles.stackNodeHighlight : ""} ${isTop ? styles.stackNodeTop : ""}`}
                        >
                            <span className={styles.nodeValue}>{value}</span>
                            {isTop && <span className={styles.stackTopLabel}>← top</span>}
                        </div>
                    )
                })}
                {state.length === 0 && (
                    <div className={styles.emptySlot}>empty</div>
                )}
            </div>
            <div className={styles.stackLabel}>BOTTOM</div>
        </div>
    )
}

function QueueRenderer({ step }: { step: Step }) {
  const state = step.state as number[];

  return (
    <div className={styles.queueWrapper}>
      <div className={styles.queueEndLabel}>FRONT</div>
      <div className={styles.queue}>
        {state.length === 0 ? (
          <div className={styles.emptySlot}>empty</div>
        ) : (
          state.map((value, i) => {
            const isHighlighted = step.highlighted.includes(i);
            const isFront = i === 0;
            const isBack = i === state.length - 1;

            return (
              <div key={i} className={styles.queueNodeWrapper}>
                <div
                  className={`${styles.queueNode} ${isHighlighted ? styles.queueNodeHighlight : ""}`}
                >
                  <span className={styles.nodeValue}>{value}</span>
                  {isFront && <span className={styles.queuePosLabel}>front</span>}
                  {isBack && state.length > 1 && (
                    <span className={styles.queuePosLabel}>back</span>
                  )}
                </div>
                {i < state.length - 1 && (
                  <span className={styles.arrow}>→</span>
                )}
              </div>
            );
          })
        )}
      </div>
      <div className={styles.queueEndLabel}>BACK</div>
    </div>
  );
}

function LinkedListRenderer({ step }: { step: Step }) {
  const state = step.state as number[];

  return (
    <div className={styles.linkedListWrapper}>
      {state.length === 0 ? (
        <div className={styles.emptySlot}>empty</div>
      ) : (
        <div className={styles.linkedList}>
          <div className={styles.headLabel}>HEAD</div>
          {state.map((value, i) => {
            const isHighlighted = step.highlighted.includes(i);

            return (
              <div key={i} className={styles.linkedListNodeWrapper}>
                <div
                  className={`${styles.linkedListNode} ${isHighlighted ? styles.linkedListNodeHighlight : ""}`}
                >
                  <span className={styles.nodeValue}>{value}</span>
                  <div className={styles.pointer}>
                    <span className={styles.pointerDot} />
                  </div>
                </div>
                {i < state.length - 1 ? (
                  <span className={styles.linkedArrow}>→</span>
                ) : (
                  <span className={styles.nullLabel}>→ NULL</span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}

function BSTRenderer({ step }: { step: Step }) {
  const state = step.state[0] as BSTNode | null;

  if (!state) {
    return <div className={styles.emptySlot}>empty</div>;
  }

  return (
    <div className={styles.bstWrapper}>
      <BSTNode
        node={state}
        highlighted={step.highlighted}
        depth={0}
      />
    </div>
  );
}

function BSTNode({
  node,
  highlighted,
  depth,
}: {
  node: BSTNode | null;
  highlighted: number[];
  depth: number;
}) {
  if (!node) return <div className={styles.bstEmpty} />;

  const isHighlighted = highlighted.includes(node.value);

  return (
    <div className={styles.bstNodeWrapper}>
      <div
        className={`${styles.bstNode} ${isHighlighted ? styles.bstNodeHighlight : ""}`}
      >
        <span className={styles.nodeValue}>{node.value}</span>
      </div>

      {(node.left || node.right) && (
        <div className={styles.bstChildren}>
          <div className={styles.bstChild}>
            {node.left && <div className={styles.bstConnector} />}
            <BSTNode
              node={node.left}
              highlighted={highlighted}
              depth={depth + 1}
            />
          </div>
          <div className={styles.bstChild}>
            {node.right && <div className={styles.bstConnector} />}
            <BSTNode
              node={node.right}
              highlighted={highlighted}
              depth={depth + 1}
            />
          </div>
        </div>
      )}
    </div>
  );
}