import {REMOVE} from '../reyboards/remove.js'
import bot from './instance.js'

export const handleMessageError = async (chatId) => {
  await bot.sendMessage(chatId, 'Ошибка обработки сообщения', REMOVE)
}