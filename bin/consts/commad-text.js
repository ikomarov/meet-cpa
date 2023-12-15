import {STATUS} from './command.js'

export const HELP = `
Вот список команд, которые доступны:

${STATUS} - получить отчет по вашему коду
`

export const MODER = 'Получили запрос, ждем ответа администратора. После пришлем вам код и ссылку.'

export const getStatusText = ({count, activeCount, inactiveCount, notActiveCount, todayOnline, weekOnline, monOnline, todayNew, weekNew, monNew, maleCount, femaleCount, todayFrom, weekFrom, monFrom}) => `
*Пользователей* _${count}_
*Активных пользователей* _${activeCount}_
{bot-inactive: true} _${inactiveCount}_
{is-active: false} _${notActiveCount}_

*Онлайн*
Сегодня - _${todayOnline}_
За 7 дней - _${weekOnline}_
За 30 дней - _${monOnline}_

*Новых пользователей*
Сегодня - _${todayNew}_
За 7 дней - _${weekNew}_
За 30 дней - _${monNew}_

Мужской пол - _${maleCount}_
Женский пол - _${femaleCount}_

*Откуда сегодня*
${todayFrom}

*Откуда за 7 дней*
${weekFrom}

*Откуда за 30 дней*
${monFrom}
`
