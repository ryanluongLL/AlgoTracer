"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import styles from "./page.module.css";
import Sidebar from "@/components/layout/Sidebar";
import Canvas from "@/components/visualizer/Canvas";
import Controls from "@/components/visualizer/Controls";
import ExplainPanel from "@/components/visualizer/ExplainPanel";
import { runAlgorithm, explainStep, Step } from "@/lib/api";

export default function VisualizerPage() {
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1500);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("bubble_sort");
  const [inputData, setInputData] = useState([5, 3, 8, 1, 9, 2]);
  const [explanation, setExplanation] = useState("");
  const [isLoadingExplanation, setIsLoadingExplanation] = useState(false);
  const [isLoadingAlgorithm, setIsLoadingAlgorithm] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchExplanation = useCallback(async (step: Step, algorithm: string) => {
    setIsLoadingExplanation(true);
    try {
      const result = await explainStep(algorithm, step);
      setExplanation(result);
    } catch {
      setExplanation("Could not load explanation.");
    } finally {
      setIsLoadingExplanation(false);
    }
  }, []);

  const handleRun = useCallback(async (algorithm: string, data: number[], target?: number, operation?: string) => {
    setIsPlaying(false);
    setIsLoadingAlgorithm(true);
    try {
      const response = await runAlgorithm(algorithm, data, target, operation);
      setSteps(response.steps);
      setCurrentStep(0);
      setSelectedAlgorithm(algorithm);
      fetchExplanation(response.steps[0], algorithm);
    } catch {
      setExplanation("Failed to run algorithm.");
    } finally {
      setIsLoadingAlgorithm(false);
    }
  }, [fetchExplanation]);

  // Auto play
  useEffect(() => {
    if (!isPlaying) return;
  
    let cancelled = false;
  
    const advance = async () => {
      if (cancelled) return;
  
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        const next = prev + 1;
        fetchExplanation(steps[next], selectedAlgorithm).then(() => {
          if (!cancelled && isPlaying) {
            setTimeout(advance, speed);
          }
        });
        return next;
      });
    };
  
    setTimeout(advance, speed);
  
    return () => {
      cancelled = true;
    };
  }, [isPlaying]);

  // Fetch explanation when step changes
  useEffect(() => {
    if (steps.length === 0 || isPlaying) return;
    fetchExplanation(steps[currentStep], selectedAlgorithm);
  }, [currentStep]);

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
          <ExplainPanel
            step={activeStep}
            explanation={explanation}
            isLoading={isLoadingExplanation}
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