import styles from "./ArrayNode.module.css"

interface ArrayNodeProps{
    value: number;
    index: number;
    isHighlighted: boolean;
    isSwapped: boolean;
    isSorted: boolean;
}

export default function ArrayNode({
    value,
    index,
    isHighlighted,
    isSwapped,
    isSorted,
}: ArrayNodeProps) {
    const getNodeStyle = () => {
        if (isSwapped) return styles.nodeSwap;
        if (isHighlighted) return styles.nodeHighligh;
        if (isSorted) return styles.nodeSorted;
        return styles.nodeDefault;
    };

    return (
        <div className={styles.wrapper}>
            <div className={`${styles.node} ${getNodeStyle()}`}>
                <span className={styles.value}>{value}</span>
            </div>
            <span className={styles.index}>{index}</span>
        </div>
    )
}