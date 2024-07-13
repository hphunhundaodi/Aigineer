from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize the OpenAI client
api_key = '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'
client = OpenAI(api_key=api_key)
assistant_id = 'asst_lgIpKBMuA2utqbV5Z1BJk7Yd'

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json['message']
    
    try:
        thread = client.beta.threads.create()
        message = client.beta.threads.messages.create(
            thread_id=thread.id,
            role="user",
            content=user_input
        )
        
        run = client.beta.threads.runs.create_and_poll(
            thread_id=thread.id,
            assistant_id=assistant_id,
            instructions="Please be nice to users."
        )
        
        if run.status == 'completed':
            messages = client.beta.threads.messages.list(
                thread_id=thread.id
            )
            response = messages.data[0].content[0].text.value
            return jsonify({'response': response})
        else:
            return jsonify({'error': f"Run status: {run.status}"})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)