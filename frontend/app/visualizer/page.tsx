"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import styles from "./page.module.css";
import Sidebar from "@/components/layout/Sidebar";
import Canvas from "@/components/visualizer/Canvas";
import Controls from "@/components/visualizer/Controls";
import PseudocodePanel from "@/components/visualizer/PseudocodePanel";
import { runAlgorithm, Step } from "@/lib/api";

export default function VisualizerPage() {
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1500);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("bubble_sort");
  const [inputData, setInputData] = useState([5, 3, 8, 1, 9, 2]);
  const [isLoadingAlgorithm, setIsLoadingAlgorithm] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleRun = useCallback(async (
    algorithm: string,
    data: number[],
    target?: number,
    operation?: string
  ) => {
    setIsPlaying(false);
    setIsLoadingAlgorithm(true);
    try {
      const response = await runAlgorithm(algorithm, data, target, operation);
      setSteps(response.steps);
      setCurrentStep(0);
      setSelectedAlgorithm(algorithm);
    } catch {
      console.error("Failed to run algorithm.");
    } finally {
      setIsLoadingAlgorithm(false);
    }
  }, []);

  // Auto play
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, speed, steps.length]);

  const handleStepForward = () => {
    if (currentStep < steps.length - 1) setCurrentStep((p) => p + 1);
  };

  const handleStepBack = () => {
    if (currentStep > 0) setCurrentStep((p) => p - 1);
  };

  const handleSkipToEnd = () => {
    setCurrentStep(steps.length - 1);
    setIsPlaying(false);
  };

  const handleSkipToStart = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const handleAlgorithmChange = (algorithm: string) => {
    setSelectedAlgorithm(algorithm);
  };

  // Run default on mount
  useEffect(() => {
    handleRun("bubble_sort", inputData);
  }, []);

  const activeStep = steps[currentStep] ?? null;

  return (
    <div className={styles.page}>
      <div className={styles.body}>
        <div className={styles.sidebar}>
          <Sidebar
            selectedAlgorithm={selectedAlgorithm}
            onRun={handleRun}
            onAlgorithmChange={handleAlgorithmChange}
            inputData={inputData}
            setInputData={setInputData}
            isLoading={isLoadingAlgorithm}
          />
        </div>

        <div className={styles.canvas}>
          <Canvas
            step={activeStep}
            isLoading={isLoadingAlgorithm}
            algorithm={selectedAlgorithm}
          />
        </div>

        <div className={styles.explainPanel}>
          <PseudocodePanel
            step={activeStep}
            algorithm={selectedAlgorithm}
          />
        </div>
      </div>

      <div className={styles.controls}>
        <Controls
          currentStep={currentStep}
          totalSteps={steps.length}
          isPlaying={isPlaying}
          speed={speed}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onStepForward={handleStepForward}
          onStepBack={handleStepBack}
          onSkipToEnd={handleSkipToEnd}
          onSkipToStart={handleSkipToStart}
          onSpeedChange={setSpeed}
        />
      </div>
    </div>
  );
}