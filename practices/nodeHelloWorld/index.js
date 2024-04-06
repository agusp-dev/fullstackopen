const http = require('http')

const app = http.createServer((request, response) => {
  response.writeHead(201, { 'Content-Type': 'text/plain' })
  response.end('Hello world')
})

const PORT = 3002

app.listen(PORT)

console.log(`Server running on port ${PORT}`)
