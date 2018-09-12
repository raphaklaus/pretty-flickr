import * as bodyParser from 'body-parser'
import dotenv from 'dotenv'
import express from 'express'
import { routes } from './routes'

dotenv.config()

const app = express()

app.use(bodyParser.json())

app.use('/', express.static(__dirname + '/../../dist'))

routes(app)

app.listen(3000, () => {
  console.log('Listening...')
})
