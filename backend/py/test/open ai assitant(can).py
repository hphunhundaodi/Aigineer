from openai import OpenAI

api_key = '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'  # Ensure you have set the OPENAI_API_KEY in your environment variables

# Initialize the OpenAI client
client = OpenAI(api_key=api_key)
assistant_id = 'asst_YovbJCk792wRsmuDGtnyI0jG'
thread = client.beta.threads.create()
message = client.beta.threads.messages.create(
  thread_id=thread.id,
  role="user",
  content="hello!"
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
  print(message.content[0].text.value)
else:
  print(run.status)