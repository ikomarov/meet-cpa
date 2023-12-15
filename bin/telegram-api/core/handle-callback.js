import {callbackHandlers} from './callback-handlers.js'

export async function handleCallback(msg, data, chatId) {
  const query = data.split('/')[0]
  const queryId = Number(data.split('/')[1])

  if (!callbackHandlers[query]) return

  const handler = callbackHandlers[query]

  if (!handler) return

  await handler(msg, queryId, chatId)
}
