import {R_ACCESS} from '../../consts/command.js'
import models from '../../models/index.js'
import {generateRandomCode} from '../../utils/get-random-code.js'
import bot from './instance.js'

export const callbackHandlers = {
  [R_ACCESS]: async (msg, queryId) => {
    const code = generateRandomCode()

    await models.Cpa.create({
      user_id: queryId,
      access: true,
      code
    })

    await bot.sendMessage(queryId, `Доступ предоставлен\n\nВаша ссылка - https://t.me/meet_met_bot?start=${code}`)
  },
}
