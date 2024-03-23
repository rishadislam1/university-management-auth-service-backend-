import mongoose from 'mongoose'
import app from './app'
import config from './config'

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)
    console.log('Connect Successfully')
    app.listen(config.port, () => {
      console.log('Listing on port', config.port)
    })
  } catch (err) {
    console.log('Fail to Connect Database,', err)
  }
}

bootstrap()
