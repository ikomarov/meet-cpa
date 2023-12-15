import {getStatusText} from '../../consts/commad-text.js'
import models from '../../models/index.js'
import {logError} from '../../utils/logger.js'
import bot from '../core/instance.js'
import {REMOVE} from '../reyboards/remove.js'

export async function getMainReport(chatId, codeAdmin = '') {
  try {
    // Определение временных границ
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const weekAgo = new Date(new Date().setDate(today.getDate() - 7))
    const monthAgo = new Date(new Date().setDate(today.getDate() - 30))

    let code = codeAdmin

    if (!code) {
      const manager = await models.Cpa.findOne({
        user_id: chatId
      })

      code = manager?.code
    }

    // Агрегация данных
    const count = await models.Profiles.countDocuments({
      referral_id: code
    })
    const activeCount = await models.Profiles.countDocuments({
      bot_inactive: { $ne: true },
      is_active: true,
      referral_id: code
    })
    const todayOnline = await models.Profiles.countDocuments({
      referral_id: code,
      last_time_success_login: { $gte: today }
    })
    const weekOnline = await models.Profiles.countDocuments({
      referral_id: code,
      last_time_success_login: { $gte: weekAgo }
    })
    const monOnline = await models.Profiles.countDocuments({
      referral_id: code,
      last_time_success_login: { $gte: monthAgo }
    })
    const todayNew = await models.Profiles.countDocuments({
      referral_id: code,
      created_at: { $gte: today }
    })
    const weekNew = await models.Profiles.countDocuments({
      referral_id: code,
      created_at: { $gte: weekAgo }
    })
    const monNew = await models.Profiles.countDocuments({
      referral_id: code,
      created_at: { $gte: monthAgo }
    })
    const maleCount = await models.Profiles.countDocuments({
      referral_id: code,
      gender: 'M'
    })
    const femaleCount = await models.Profiles.countDocuments({
      referral_id: code,
      gender: 'F'
    })

    const text = getStatusText({
      code,
      count,
      activeCount,
      todayOnline,
      weekOnline,
      monOnline,
      todayNew,
      weekNew,
      monNew,
      maleCount,
      femaleCount
    })

    await bot.sendMessage(chatId, text, REMOVE)
  } catch (e) {
    logError('Ошибка задачи по Reports', e)
  }
}
