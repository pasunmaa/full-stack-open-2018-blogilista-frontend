const http = require('http')
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')

const middleware = require('./utils/middleware')
const config = require('./utils/config')

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(express.static('build'))
if ( process.env.NODE_ENV !== 'test' )
  app.use(middleware.logger(':method :url :respdata :status :res[content-length] - :response-time ms'))
app.use(middleware.tokenExtractor)

app.use(express.static(path.join(__dirname, 'build')))
app.get('/*', (req, res) =>
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
)

app.use(middleware.error)

const server = http.createServer(app)

server.listen(config.port, () => {
  console.log(`Blogilista UI server 1.0 running on port ${config.port}`)
})

/* server.on('close', () => {
  mongoose.connection.close()
}) */

module.exports = {
  app, server
}