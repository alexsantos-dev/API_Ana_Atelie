import express from 'express'
import { configDotenv } from 'dotenv'
import GlobalRoutes from './src/routes/Global.routes.js'
import sequelize from './src/database/database.config.js'

configDotenv()
sequelize.sync()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use('/api', GlobalRoutes.router)

app.listen(PORT, () => {
    console.log(`connected ✅ Port: ${PORT}`)
})
