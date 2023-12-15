import {R_ACCESS} from '../../consts/command.js'
import {CHAT_ID} from '../../consts/env.js'
import models from '../../models/index.js'
import {REMOVE} from '../reyboards/remove.js'
import bot from './instance.js'

export const callbackHandlers = {
  [R_ACCESS]: async (msg, queryId, chatId) => {
    if(chatId !== Number(CHAT_ID)) return

    await models.Moderators.findOneAndUpdate({user_id: queryId}, {access: true})

    await bot.sendMessage(queryId, 'Доступ предоставлен', REMOVE)
  },
}
