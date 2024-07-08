// import { defineNuxtPlugin, useRuntimeConfig } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  const apiKey = config.public.OPENAI_API_KEY
  const assistantId = config.public.ASSISTANT_ID
  const headers = {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'OpenAI-Beta': 'assistants=v2',
  }
  async function createThread() {
    const response = await fetch('https://api.openai.com/v1/threads', {
      method: 'POST',
      headers,
    })

    if (!response.ok) {
      throw new Error('HTTP Error: ' + response.statusText)
    }

    return await response.json()
  }

  async function createMessage(threadId: string, role: string, content: string) {
    const response = await fetch(`https://api.openai.com/v1/threads/${threadId}/messages`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ role, content }),
    })

    if (!response.ok) {
      throw new Error('HTTP Error: ' + response.statusText)
    }

    return await response.json()
  }

  async function createAndPollRun(threadId: string, instructions: string) {
    const response = await fetch(`https://api.openai.com/v1/threads/${threadId}/runs`, {
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

  async function pollRunStatus(runId: string, threadId: string) {
    let status = 'pending'
    let run

    while (status === 'pending') {
      const response = await fetch(`https://api.openai.com/v1/runs/${runId}`, {
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

  async function getMessages(threadId: string) {
    const response = await fetch(`https://api.openai.com/v1/threads/${threadId}/messages`, {
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

  nuxtApp.provide('openai', {
    createThread,
    createMessage,
    createAndPollRun,
    getMessages,
  })
})
