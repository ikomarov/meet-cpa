import {STATUS} from './command.js'

export const HELP = `
Вот список команд, которые доступны:

${STATUS} - получить отчет по вашему коду
`

export const MODER = 'Получили запрос, ждем одобрения администратора. После пришлем код и ссылку'

export const getStatusText = ({code, count, activeCount, todayOnline, weekOnline, monOnline, todayNew, weekNew, monNew, maleCount, femaleCount, todayFrom, weekFrom, monFrom}) => `
*Ваш код ${code}*
*Всего регистраций* _${count}_ 
*Активных пользователей* _${activeCount}_ из _${count}_ 

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

Гео
Сегодня - _${todayFrom}_
За 7 дней - _${weekFrom}_
За 30 дней - _${monFrom}_
`
