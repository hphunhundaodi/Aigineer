from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
import os

app = Flask(__name__)
CORS(app)

api_key = os.getenv('OPENAI_API_KEY')
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
            messages = client.beta.threads.messages.list(thread_id=thread.id)
            latest_message = messages.data[0]
            message_content = latest_message.content[0].text
            annotations = message_content.annotations
            citations = []
            
            for index, annotation in enumerate(annotations):
                message_content.value = message_content.value.replace(annotation.text, f' [{index}]')
                
                if (file_citation := getattr(annotation, 'file_citation', None)):
                    try:
                        cited_file = client.files.retrieve(file_citation.file_id)
                        filename = cited_file.filename if cited_file.filename else "Unknown file"
                        citations.append(f'[{index}]{filename}')
                    except Exception as e:
                        citations.append(f'[{index}]Error retrieving file: {str(e)}')
                elif (file_path := getattr(annotation, 'file_path', None)):
                    try:
                        cited_file = client.files.retrieve(file_path.file_id)
                        filename = cited_file.filename if cited_file.filename else "Unknown file"
                        citations.append(f'[{index}]{filename}')
                    except Exception as e:
                        citations.append(f'[{index}]Error retrieving file: {str(e)}')
                else:
                    citations.append(f'[{index}]No file information available')
            
            response = message_content.value + '\n' + '\n'.join(citations)
            return jsonify({'response': response})
        else:
            return jsonify({'error': f"Run status: {run.status}"})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)