# AlgoTracer

**Watch algorithms think, one step at a time.**

AlgoTracer is an interactive algorithm visualizer. Pick one of 12 sorting, searching, or data structure algorithms, give it your own input, and step through the run forward and backward while the matching pseudocode line highlights in sync.

**Live demo:** [tracer-algo.vercel.app](https://tracer-algo.vercel.app)

> The backend runs on Render's free tier, so the first request after a period of inactivity can take up to a minute while the server wakes up.

## Features

* **12 algorithms.** Bubble, Selection, Insertion, Merge, and Quick Sort; Linear and Binary Search; Linked List, Stack, Queue, and Binary Search Tree.
* **Step through any run.** Play, pause, step forward, step back, or jump to the start or end at two playback speeds.
* **Synced pseudocode.** Every step highlights the pseudocode line that produced it, so the animation and the logic never drift apart.
* **Your own input.** Enter any array, a target value for searching, and an operation (insert, delete, push, pop, enqueue, dequeue, search, traverse) for data structures.
* **Data structure views.** Linked lists render as connected nodes, stacks as vertical columns, queues with front and back markers, and BSTs as real trees.
* **No LLM calls.** Every step and every highlight comes from the algorithm engines themselves.

## Architecture

![AlgoTracer architecture: the Next.js app sends a run request to the FastAPI backend, which passes it through a rate limiter to the algorithm router and on to the sorting, searching, or data structure engine, then returns a list of step snapshots that the browser plays back and maps to pseudocode lines](docs/architecture_excalidraw.png)

The backend runs the whole algorithm up front and returns every step at once. Each step is a full snapshot of the data at that moment, so the frontend never recomputes anything: stepping backward is just showing the previous snapshot, and playback is a timer moving an index through the list. This keeps the server stateless and makes step back as cheap as step forward.

## How a run works

![How a run works: the user chooses an algorithm and input, the frontend posts it to FastAPI, the API validates the request and checks the rate limit, the engine runs the algorithm on a copy of the input and returns every step, and the frontend renders each snapshot while highlighting the matching pseudocode line](docs/sequence_diagram.png)

1. The user picks an algorithm, enters an array, and adds a target or operation if the algorithm needs one.
2. The frontend sends one `POST /api/algorithms/run` request.
3. FastAPI validates the request, applies the rate limit, and dispatches to the right engine, which runs on a copy of the input.
4. The engine returns an ordered list of step snapshots. From then on, playback happens entirely in the browser.

Every step the engines emit has the same shape:

```json
{
  "step_index": 1,
  "total_steps": 24,
  "description": "Swapping 5 and 3, larger value bubbles right",
  "state": [3, 5, 8, 1, 9, 2],
  "highlighted": [0, 1],
  "swapped": [0, 1],
  "phase": null
}
```

`highlighted` and `swapped` tell the canvas which nodes to color, and `phase` marks stages like divide and merge in Merge Sort or partition in Quick Sort. For a BST, `state` holds a nested tree of `{ value, left, right }` nodes instead of a flat array.

## Tech stack

| Layer | Tools |
|---|---|
| Frontend | Next.js 16, React 19, TypeScript, CSS Modules |
| Backend | Python 3.11, FastAPI, Pydantic, slowapi |
| Testing | pytest |
| Deployment | Vercel (frontend), Render (backend) |

## Project structure

```
AlgoTracer/
├── backend/
│   ├── app/
│   │   ├── engines/
│   │   │   ├── sorting.py           # 5 sorting algorithms that emit steps
│   │   │   ├── searching.py         # linear and binary search
│   │   │   └── data_structures.py   # linked list, stack, queue, BST
│   │   ├── models/step.py           # Step, request, and response models
│   │   ├── routers/algorithms.py    # /api/algorithms routes and dispatch
│   │   ├── config.py                # environment settings
│   │   └── main.py                  # app setup, CORS, rate limiting
│   ├── tests/                       # pytest suites for each engine
│   └── requirements.txt
├── docs/                            # architecture and flow diagrams
└── frontend/
    ├── app/
    │   ├── page.tsx                 # landing page
    │   ├── visualizer/page.tsx      # playback state and layout
    │   └── about/page.tsx
    ├── components/
    │   ├── layout/                  # Navbar, Sidebar
    │   └── visualizer/              # Canvas, ArrayNode, DataStructureCanvas,
    │                                # Controls, PseudocodePanel
    └── lib/
        ├── api.ts                   # backend client
        ├── pseudocode.ts            # pseudocode for all 12 algorithms
        └── pseudocode-mapper.ts     # maps each step to its pseudocode line
```

## Running locally

**Backend** (Python 3.11)

```bash
cd backend
python -m venv venv
source venv/bin/activate          # Windows Git Bash: source venv/Scripts/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```

The API runs at `http://localhost:8000`, with interactive docs at `http://localhost:8000/docs`.

**Frontend**

```bash
cd frontend
npm install
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local
npm run dev
```

Open `http://localhost:3000`.

### Environment variables

| Variable | Where | Purpose |
|---|---|---|
| `ALLOWED_ORIGINS` | backend | Comma separated list of frontend URLs allowed by CORS |
| `ENVIRONMENT` | backend | `development` or `production` |
| `NEXT_PUBLIC_API_URL` | frontend | Base URL of the backend |

## Testing

```bash
cd backend
pytest tests/ -v
```

28 tests cover the engines. For every algorithm they check that the final state is correct, that step indices run in order, that every step reports the same total, and that each step holds its own snapshot rather than a shared reference to one array.

## API

| Method | Route | Description |
|---|---|---|
| `GET` | `/api/algorithms/` | List supported algorithms |
| `POST` | `/api/algorithms/run` | Run an algorithm and return every step |
| `GET` | `/health` | Health check |

Example request:

```json
{
  "algorithm": "binary_search",
  "input_data": [1, 3, 5, 7, 9, 11],
  "target": 7
}
```

Searching algorithms require `target`. Data structures require `operation`, plus `target` for insert, delete, push, enqueue, and search.

## Roadmap

* Emit the executing pseudocode line from each engine instead of matching on step descriptions
* Live comparison and swap counters so runs can be compared against their Big O
* Predict the next step quiz mode
* Graph algorithms: BFS, DFS, and Dijkstra

## Author

Built by Luan Luong. [GitHub](https://github.com/ryanluongLL) · [LinkedIn](https://www.linkedin.com/in/luan-luong-132776314/)