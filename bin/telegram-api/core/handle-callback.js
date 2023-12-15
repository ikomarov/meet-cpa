import {R_ACCESS} from '../../consts/command.js'
import models from '../../models/index.js'
import {callbackHandlers} from './callback-handlers.js'

export async function handleCallback(msg, data, chatId) {
  const query = data.split('/')[0]
  const queryId = Number(data.split('/')[1])

  if (!callbackHandlers[query]) return

  const reportModerator = await models.Cpa.findOne({ user_id: chatId, access: true })

  if (!reportModerator && query !== R_ACCESS) return

  const handler = callbackHandlers[query]

  if (!handler) return

  await handler(msg, queryId, chatId)
}
