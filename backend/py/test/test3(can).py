import os
from openai import OpenAI
import time

# Retrieve API key from environment variables
api_key = "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"

client = OpenAI(api_key=api_key)
assistant_id = 'asst_YovbJCk792wRsmuDGtnyI0jG'  # Your assistant ID goes here

# Create a thread
thread = client.beta.threads.create()

# Create a message in the thread
message = client.beta.threads.messages.create(
  thread_id=thread.id,
  role="user",
  content="我是不是瓜皮"
)

# Start the run and poll for the result
run = client.beta.threads.runs.create_and_poll(
    thread_id=thread.id,
    assistant_id=assistant_id,
    instructions="Please address the user as Jingchao. The user has a premium account."
)

print(run.status)

# List the messages regardless of the status
messages = client.beta.threads.messages.list(
    thread_id=thread.id
)
print(messages)

# 接受请求
# 处理请求
# 返回请求