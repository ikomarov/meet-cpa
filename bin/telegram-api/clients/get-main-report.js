import {getStatusText} from '../../consts/commad-text.js'
import models from '../../models/index.js'
import {logError} from '../../utils/logger.js'
import bot from '../core/instance.js'
import {REMOVE} from '../reyboards/remove.js'

export async function getMainReport(chatId) {
  try {
    // Определение временных границ
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const weekAgo = new Date(new Date().setDate(today.getDate() - 7))
    const monthAgo = new Date(new Date().setDate(today.getDate() - 30))

    // Агрегация данных
    const count = await models.Profiles.countDocuments()
    const activeCount = await models.Profiles.countDocuments({
      bot_inactive: { $ne: true },
      is_active: true
    })
    const inactiveCount = await models.Profiles.countDocuments({
      bot_inactive: true,
    })
    const notActiveCount = await models.Profiles.countDocuments({
      is_active: false
    })
    const todayOnline = await models.Profiles.countDocuments({ last_time_success_login: { $gte: today } })
    const weekOnline = await models.Profiles.countDocuments({ last_time_success_login: { $gte: weekAgo } })
    const monOnline = await models.Profiles.countDocuments({ last_time_success_login: { $gte: monthAgo } })
    const todayNew = await models.Profiles.countDocuments({ created_at: { $gte: today } })
    const weekNew = await models.Profiles.countDocuments({ created_at: { $gte: weekAgo } })
    const monNew = await models.Profiles.countDocuments({ created_at: { $gte: monthAgo } })
    const maleCount = await models.Profiles.countDocuments({ gender: 'M' })
    const femaleCount = await models.Profiles.countDocuments({ gender: 'F' })

    const aggregateFromStats = async (sinceDate) => {
      const stats = await models.Profiles.aggregate([
        {
          $match: {
            referral_id: { $exists: true, $ne: '' },
            created_at: { $gte: sinceDate }
          }
        },
        { $group: { _id: '$referral_id', count: { $sum: 1 } } },
        { $sort: { count: -1 } } // Добавление этапа сортировки по убыванию
      ])

      return stats.map(stat => {
        const safeReferralId = stat._id.replace(/[*_`[\]()]/g, '\\$&')
        return `${safeReferralId}: ${stat.count}`
      }).join('\n')
    }


    const todayFrom = await aggregateFromStats(today)
    const weekFrom = await aggregateFromStats(weekAgo)
    const monFrom = await aggregateFromStats(monthAgo)

    // Создание текста для отправки
    const text = getStatusText({
      count,
      activeCount,
      inactiveCount,
      notActiveCount,
      todayOnline,
      weekOnline,
      monOnline,
      todayNew,
      weekNew,
      monNew,
      maleCount,
      femaleCount,
      todayFrom,
      weekFrom,
      monFrom
    })

    await bot.sendMessage(chatId, text, REMOVE)
  } catch (e) {
    logError('Ошибка задачи по Reports', e)
  }
}
