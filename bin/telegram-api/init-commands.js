import {logError} from '../utils/logger.js'
import {handleCallback} from './core/handle-callback.js'
import {handleCommands} from './core/handle-commands.js'
import {handleMessageError} from './core/handle-message-error.js'
import bot from './core/instance.js'
import { selectChatId } from './selectors/select-chat-id.js'

let commandState = {}

bot.on('text', async (msg) => {
  const chatId = selectChatId(msg)

  // Early exit if this chatId is being processed.
  if (commandState[chatId]) return

  commandState[chatId] = true

  try {
    await handleCommands(msg)
  } catch (error) {
    logError(error.message)

    await handleMessageError(chatId, error)
  } finally {
    commandState[chatId] = false
  }
})

let commandStateCallback = false

bot.on('callback_query', async (callbackQuery) => {
  const message = callbackQuery.message
  const chatId = selectChatId(message)

  if (commandStateCallback) return
  commandStateCallback = true

  try {
    await handleCallback(message, callbackQuery.data, chatId)
  } catch (error) {
    await handleMessageError(chatId, error)
  } finally {
    commandStateCallback = false
  }

  try {
    //был баг при загрузке фото, починился таким образом, пока для нас это нормально
    await bot.answerCallbackQuery(callbackQuery.id)
  } catch (e) {
    logError(e.message)
  }
})
