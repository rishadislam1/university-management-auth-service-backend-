import dotenv from 'dotenv'
import path from 'path'
// eslint-disable-next-line no-undef
dotenv.config({ path: path.join(process.cwd(), '.env') })

const config = {
  
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  default_student_password: process.env.DEFAULT_STUDENT_PASSWORD
}

export default config
