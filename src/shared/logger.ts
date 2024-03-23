import winston, { format } from 'winston'
import path from 'path'
import DailyRotateFile from 'winston-daily-rotate-file'

const { combine, timestamp, label, printf } = format

const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp)
  const hour = date.getHours()
  const minute = date.getMinutes()
  const seconds = date.getSeconds()

  return `${date.toDateString()} ${hour}:${minute}:${seconds} :: [${label}] ${level}: ${message}`
})

const infoLogger = winston.createLogger({
  level: 'info',
  format: combine(label({ label: 'PH' }), timestamp(), myFormat),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.Console(),
    new DailyRotateFile({
      filename: path.join(process.cwd(), 'logs', 'winston', 'successes', 'PHU-%DATE%-success.log'),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d'
  }),
  ],
})

const errorLogger = winston.createLogger({
  level: 'error',
  format: combine(label({ label: 'PH' }), timestamp(), myFormat),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.Console(),
  
    new DailyRotateFile({
      filename: path.join(process.cwd(), 'logs', 'winston', 'errors', 'PHU-%DATE%-error.log'),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d'
  }),
  ],
})

export { infoLogger, errorLogger }
