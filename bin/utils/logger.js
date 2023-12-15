import { createLogger, format, transports } from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'

// Создание папки логов, если она ещё не существует
import fs from 'fs'

const logDir = 'logs'

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir)
}

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    new DailyRotateFile({
      filename: 'logs/cpa-error-%DATE%.log',
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: false,
      maxSize: '20m',
      maxFiles: '14d'
    }),
    new transports.File({ filename: 'logs/repo-combined.log' }),
    new transports.Console({ format: format.simple() })
  ]
})

export function logError(message, error) {
  logger.error(message, error)
}

export function logWarn(message) {
  logger.warn(message)
}

export function logInfo(message) {
  logger.info(message)
}

