import express from 'express'
import './database/connection'

const app = express()

app.get('/', (request, response) => {
    return response.send('opa')
})

app.listen(5000)