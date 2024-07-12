import openai
import time

# Retrieve API key from environment variables
api_key = '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'
openai.api_key = api_key

# Assistant ID (if necessary)
assistant_id = 'asst_YovbJCk792wRsmuDGtnyI0jG'  # Replace with your actual assistant ID

# Define the function to interact with OpenAI API
def chat_with_openai(prompt):
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "Please address the user as Jingchao. The user has a premium account."},
            {"role": "user", "content": prompt}
        ]
    )
    return response.choices[0].message['content']

# Test the function
try:
    prompt = "特斯拉4680电池能量密度大概是多少，请用wh/kg来表达"
    response = chat_with_openai(prompt)
    print(response)
except openai.error.APIConnectionError as e:
    print(f"API connection error: {e}")
except openai.error.OpenAIError as e:
    print(f"OpenAI error: {e}")
except Exception as e:
    print(f"An error occurred: {e}")
