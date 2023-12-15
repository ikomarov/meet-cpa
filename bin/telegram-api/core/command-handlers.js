import {HELP, MODER} from '../../consts/commad-text.js'
import {
  BYCODE,
  HELP_COMMAND, R_ACCESS, START_COMMAND, STATUS,
} from '../../consts/command.js'
import {CHAT_ID} from '../../consts/env.js'
import {getMainReport} from '../clients/get-main-report.js'
import {getInfo} from '../clients/info.js'
import bot from './instance.js'

export const commandHandlers = {
  [START_COMMAND]: async (msg, chatId, moderator) => {
    if (chatId === CHAT_ID) return
    if (moderator) return

    const opts = {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Дать доступ', callback_data: `${R_ACCESS}/${chatId}` }]
        ]
      }
    }

    await bot.sendMessage(CHAT_ID, `Запрос Access на получение ссылки - ${chatId}`, opts)

    await getInfo(msg, MODER)
  },
  [HELP_COMMAND]: async (msg, chatId, moderator) => {
    if (!moderator) return

    await getInfo(msg, HELP)
  },
  [STATUS]: async (msg, chatId, moderator) => {
    if (chatId === CHAT_ID) return
    if (!moderator) return

    await getMainReport(chatId)
  },
  [BYCODE]: async (msg, chatId, moderator, code) => {
    if (String(chatId) !== CHAT_ID) return

    await getMainReport(chatId, code)
  },
}
