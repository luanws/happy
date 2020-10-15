import express from 'express'
import './database/connection'
import routes from './routes'
import path from 'path'
import 'express-async-errors'

const app = express()

app.use(express.json())
app.use(routes)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))

app.listen(5000)