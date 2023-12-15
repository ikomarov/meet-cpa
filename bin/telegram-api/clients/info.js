import bot from '../core/instance.js'
import {REMOVE} from '../reyboards/remove.js'
import {selectChatId} from '../selectors/select-chat-id.js'

export async function getInfo(msg, text) {
  const chatId = selectChatId(msg)

  await bot.sendMessage(chatId, text, REMOVE)
}