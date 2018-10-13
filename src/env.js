import path from 'path'
import dotenv from 'dotenv'

const result = dotenv.config({ path: path.resolve(__dirname, '..', '.env') })

export const number = (value, defaultValue = 0) => {
  value = parseInt(value, 10)

  return Number.isFinite(value) ? value : defaultValue
}

export default result.parsed
