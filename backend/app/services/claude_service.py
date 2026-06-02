import anthropic
from app.config import settings
from app.models.step import ExplainRequest

client = anthropic.Anthropic(api_key=settings.anthropic_api_key)

async def get_explanation(request: ExplainRequest) -> str:
    prompt = f"""You are an AI tutor helping a student understand algorithms step by step.

Algorithm: {request.algorithm}
Current step: {request.step_index + 1} of {request.total_steps}
What is happening: {request.description}
Current state of the data: {request.state}
Active indices or nodes: {request.highlighted}
Phase: {request.phase if request.phase else "N/A"}

Explain what is happening at this exact step in simple, friendly language for a high school or early college student.
Keep your explanation to 2-3 sentences maximum.
Focus only on this step — do not summarize the whole algorithm.
If relevant, mention why this step matters or what it is trying to achieve."""
    
    message = client.messages.create(
        model="claude-opus-4-5",
        max_tokens=1024,
        messages=[
            {"role": "user", "content": prompt}
        ]
    )

    return message.content[0].text