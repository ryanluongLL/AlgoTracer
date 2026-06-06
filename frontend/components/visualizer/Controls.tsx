import styles from "./Controls.module.css"
import {
    SkipBack,
    ChevronLeft,
    Play,
    Pause,
    ChevronRight,
    SkipForward,
} from "lucide-react"

interface ControlsProps{
    currentStep: number;
    totalSteps: number;
    isPlaying: boolean;
    speed: number;
    onPlay: () => void;
    onPause: () => void;
    onStepForward: () => void;
    onStepBack: () => void;
    onSkipToEnd: () => void;
    onSkipToStart: () => void;
    onSpeedChange: (speed: number) => void;
}

export default function Controls({
    currentStep,
    totalSteps,
    isPlaying,
    speed,
    onPlay,
    onPause,
    onStepForward,
    onStepBack,
    onSkipToEnd,
    onSkipToStart,
    onSpeedChange,
}: ControlsProps) {
    const progress = totalSteps > 0 ? ((currentStep + 1) / totalSteps) * 100 : 0;

    const speedOptions = [
        { label: "0.5x", value: 3000 },
        { label: "1x", value: 1500 },
    ]

    return (
        <div className={styles.controls}>
            {/* Progress bar */}
            <div className={styles.progressBar}>
                <div
                    className={styles.progressFill}
                    style={{width: `${progress}`}}
                />
            </div>

            <div className={styles.inner}>
                {/* Step buttons */}
                <div className={styles.buttons}>
                    <button
                        className={styles.iconButton}
                        onClick={onSkipToStart}
                        disabled={currentStep === 0}
                        title="Skip to start"
                    >
                        <SkipBack size={16} />
                    </button>

                    <button
                        className={styles.iconButton}
                        onClick={onStepBack}
                        disabled={currentStep === 0}
                        title="Step back"
                    >
                        <ChevronLeft size={18} />
                    </button>

                    <button
                        className={styles.playButton}
                        onClick={isPlaying ? onPause : onPlay}
                        disabled={totalSteps === 0}
                    >
                        {isPlaying ? <Pause size={18}/> : <Play size={18} />}
                    </button>

                    <button
                        className={styles.iconButton}
                        onClick={onStepForward}
                        disabled={currentStep >= totalSteps - 1}
                        title="Step forward"
                    >
                        <ChevronRight size={18} />
                    </button>

                    <button
                        className={styles.iconButton}
                        onClick={onSkipToEnd}
                        disabled={currentStep >= totalSteps - 1}
                        title="Skip to end"
                    >
                        <SkipForward size={16} />
                    </button>
                </div>

                {/* Step counter */}
                <div className={styles.counter}>
                    <span className={styles.counterAccent}>{currentStep + 1}</
                    span>
                    <span className={styles.counterSeparator}>/</span>
                    <span>{totalSteps}</span>
                </div>

                {/* Speed selector */}
                <div className={styles.speedSelector}>
                    {speedOptions.map((option) => (
                        <button
                            key={option.value}
                            className={`${styles.speedButton} ${speed === option.value ? styles.speedButtonActive : ""}`}
                            onClick={() => onSpeedChange(option.value)}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}