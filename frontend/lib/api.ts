// handles all communication with the FastAPI backend.
// Every component goes through this isntead of calling fetch directly

import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export interface Step{
    step_index: number;
    total_steps: number;
    description: string;
    state: any[];
    highlighted: number[];
    swapped: number[];
    phase: string | null;
}

export interface AlgorithmResponse{
    algorithm: string;
    input_data: number[];
    steps: Step[];
    total_steps: number;
}

export interface ExplainResponse{
    explanation: string;
}

export async function runAlgorithm(
    algorithm: string,
    inputData: number[],
    target?: number,
    operation?: string
): Promise<AlgorithmResponse>{
    const { data } = await api.post("/api/algorithms/run", {
        algorithm,
        input_data: inputData,
        target: target ?? null,
        operation: operation ?? null,
    });
    return data;
}

export async function explainStep(
    algorithm: string,
    step: Step
): Promise<string>{
    const { data } = await api.post<ExplainResponse>("/api/explain/", {
        algorithm,
        step_index: step.step_index,
        total_steps: step.total_steps,
        description: step.description,
        state: step.state,
        highlighted: step.highlighted,
        phase: step.phase,
    });
    return data.explanation;
}

export async function listAlgorithms(): Promise<string[]>{
    const { data } = await api.get("/api/algorithms/");
    return data.algorithms;
}

