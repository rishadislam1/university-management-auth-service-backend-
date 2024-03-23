import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { errorLogger, infoLogger } from './shared/logger'

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)
    infoLogger.info('Connect Successfully')
    app.listen(config.port, () => {
      infoLogger.info('Listing on port', config.port)
    })
  } catch (err) {
    errorLogger.error('Fail to Connect Database,', err)
  }
}

bootstrap()
