// server/api/openai.js
import axios from "axios";

const config = useRuntimeConfig()

const apiKey = config.public.OPENAI_API_KEY
const assistantId = config.public.ASSISTANT_ID
const headers = {
  'Authorization': `Bearer ${apiKey}`,
  'Content-Type': 'application/json',
  'OpenAI-Beta': 'assistants=v2',
}

async function createThread() {
  const response = await fetch('/api/openai/v1/threads', {
    method: 'POST',
    headers,
  })
  
  if (!response.ok) {
    throw new Error('HTTP Error: ' + response.statusText)
  }

  return await response.json()
}

async function createMessage(threadId, role, content) {
  const response = await fetch(`/openai/v1/threads/${threadId}/messages`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ role, content }),
  })

  if (!response.ok) {
    throw new Error('HTTP Error: ' + response.statusText)
  }

  return await response.json()
}

async function createAndPollRun(threadId, instructions) {
  const response = await fetch(`/openai/v1/threads/${threadId}/runs`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ assistant_id: assistantId, instructions }),
  })

  if (!response.ok) {
    throw new Error('HTTP Error: ' + response.statusText)
  }

  const run = await response.json()
  return pollRunStatus(run.id, threadId)
}

async function pollRunStatus(runId, threadId) {
  let status = 'pending'
  let run

  while (status === 'pending') {
    const response = await fetch(`/openai/v1/runs/${runId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'assistants=v2',
      },
    })

    if (!response.ok) {
      throw new Error('HTTP Error: ' + response.statusText)
    }

    run = await response.json()
    status = run.status

    if (status === 'pending') {
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Poll every second
    }
  }

  if (status === 'completed') {
    return getMessages(threadId)
  } else {
    throw new Error('Run did not complete successfully: ' + status)
  }
}

async function getMessages(threadId) {
  const response = await fetch(`/openai/v1/threads/${threadId}/messages`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('HTTP Error: ' + response.statusText)
  }

  return await response.json()
}

export default defineEventHandler(async (event) => {
  const { method } = event.node.req;
  const query = getQuery(event);
  const { action, threadId, role, content, instructions } = query;

  console.log('API Request:', { method, query });

  try {
    switch (method) {
      case 'POST':
        if (action === 'createThread') {
          const result = await createThread();
          console.log('Create Thread Result:', result);
          return result;
        } else if (action === 'createMessage' && threadId && role && content) {
          const result = await createMessage(threadId, role, content);
          console.log('Create Message Result:', result);
          return result;
        } else if (action === 'createAndPollRun' && threadId && instructions) {
          const result = await createAndPollRun(threadId, instructions);
          console.log('Create And Poll Run Result:', result);
          return result;
        }
        break;
      case 'GET':
        if (action === 'getMessages' && threadId) {
          const result = await getMessages(threadId);
          console.log('Get Messages Result:', result);
          return result;
        }
        break;
    }
  } catch (error) {
    console.error('API Error:', error);
    return { error: error.message };
  }

  return { error: 'Invalid API call' };
});
