# pip install openai
# pip install gradio
import gradio as gr
from openai import OpenAI
import os
import time

# Set API key
api_key = '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'  # Ensure you have set the OPENAI_API_KEY in your environment variables
# Initialize the OpenAI client

client = OpenAI(api_key=api_key)
assistant_id = 'asst_cbauAaNXMgMB99Tt9AqEICv4'  # Your assistant ID goes here

# Create a thread to be used for the entire conversation
thread = client.beta.threads.create()

def chat_with_assistant_api(message, history):
    try:
        # Add the new message to the thread
        client.beta.threads.messages.create(
            thread_id=thread.id,
            role="user",
            content=message
        )

        # Run the assistant
        run = client.beta.threads.runs.create(
            thread_id=thread.id,
            assistant_id=assistant_id,
            instructions="Please address the user as Jingchao. The user has a premium account."
        )

        # Wait for the run to complete
        while run.status not in ['completed', 'failed']:
            time.sleep(1)  # Wait for 1 second before checking again
            run = client.beta.threads.runs.retrieve(thread_id=thread.id, run_id=run.id)

        if run.status == 'failed':
            return f"Run failed with error: {run.last_error}"

        # Retrieve messages
        messages = client.beta.threads.messages.list(thread_id=thread.id)

        # Find the last assistant message
        for message in messages.data:
            if message.role == "assistant":
                return message.content[0].text.value

        return "No response from the assistant."

    except Exception as e:
        return f"An error occurred: {str(e)}"

# Create the Gradio chat interface
demo = gr.ChatInterface(
    fn=chat_with_assistant_api,
    title='O3 helper',
    description='You can ask anything about using O3',
    examples=["What is the harmful to O3?",
              "Can I get the summary of use cases of O3?",
              "臭氧的国家标准?"],
    cache_examples=False
)

# Launch the demo
demo.launch(share=True)
