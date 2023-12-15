import TelegramBot from 'node-telegram-bot-api'
import {T_TOKEN} from '../../consts/env.js'

const bot = new TelegramBot(T_TOKEN, {polling: true})

export default bot
