import models from '../../models/index.js'
import {selectChatId} from '../selectors/select-chat-id.js'
import {commandHandlers} from './command-handlers.js'

export async function handleCommands(msg) {
  const chatId = selectChatId(msg)
  const handler = commandHandlers[msg.text]

  if (!handler) return

  const reportModerator = await models.Cpa.findOne({ user_id: msg.from.id, access: true })

  await handler(msg, chatId, reportModerator)
}
