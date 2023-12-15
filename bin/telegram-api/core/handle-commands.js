import models from '../../models/index.js'
import {selectChatId} from '../selectors/select-chat-id.js'
import {commandHandlers} from './command-handlers.js'

export async function handleCommands(msg) {
  const chatId = selectChatId(msg)

  const templates = msg.text.split(' ')

  const handler = commandHandlers[msg.text] || commandHandlers[templates[0]]

  if (!handler) return

  const moderator = await models.Cpa.findOne({ user_id: msg.from.id, access: true })

  await handler(msg, chatId, moderator, templates[1])
}
