from openai import OpenAI
client = OpenAI(api_key = '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')
import time
assistant_id='asst_w2gHV2XhjGNa03nCwJNbxSvq'
thread = client.beta.threads.create()
message = client.beta.threads.messages.create(
  thread_id=thread.id,
  role="user",
  content=""
)
run = client.beta.threads.runs.create_and_poll(
    thread_id=thread.id,
    assistant_id=assistant_id,
    instructions="Please address the user as Jingchao. The user has a premium account."
)

# Check if the run has completed and then list the messages
if run.status == 'completed':
    messages = client.beta.threads.messages.list(
        thread_id=thread.id
    )
    for message in messages.data:
        print(f"{message.role.title()}: {message.content}")
else:
    print(f"Run ended with status: {run.status}")