import gradio as gr
from openai import OpenAI
import os

# Set API key
api_key = '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'  # Ensure you have set the OPENAI_API_KEY in your environment variables

# Initialize the OpenAI client
client = OpenAI(api_key=api_key)

# Define the function to interact with OpenAI API
def chat_with_openai(user_input):
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": user_input}
        ]
    )
    system_message = response.choices[0].message.content
    return system_message

# Create the Gradio interface
demo = gr.Interface(fn=chat_with_openai, inputs="textbox", outputs="textbox")

# Launch the demo
demo.launch(share=True)
