import {HELP, MODER} from '../../consts/commad-text.js'
import {
  HELP_COMMAND, START_COMMAND, STATUS,
} from '../../consts/command.js'
import {CHAT_ID} from '../../consts/env.js'
import {getMainReport} from '../clients/get-main-report.js'
import {getInfo} from '../clients/info.js'
import bot from './instance.js'

export const commandHandlers = {
  [START_COMMAND]: async (msg, chatId, moderator) => {
    if (moderator) return;

    const opts = {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Дать доступ', callback_data: `request_access/${chatId}` }]
        ]
      }
    }

    await bot.sendMessage(CHAT_ID, `Запрос Access на модерацию - ${chatId}`, opts)

    await getInfo(msg, MODER)
  },
  [HELP_COMMAND]: async (msg) => await getInfo(msg, HELP),
  [STATUS]: async (msg, chatId, moderator) => {
    if (!moderator) return

    await getMainReport(chatId)
  },
}
