import express from 'express'
import { configDotenv } from 'dotenv'
import GlobalRoutes from './src/routes/Global.routes.js'
import sequelize from './src/database/database.config.js'
import configureCors from './corsConfig.js'

const app = express()
const PORT = process.env.PORT || 3000

configDotenv()
configureCors(app)

app.use(express.json())
app.use('/api', GlobalRoutes.router)

app.listen(PORT, async () => {
    await sequelize.sync()
    console.log(`connected ✅ Port: ${PORT}`)
})
