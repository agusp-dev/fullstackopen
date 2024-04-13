const { persons } = require('./persons')

const express = require('express')
const app = express()

app.get('/api/info', (request, response) => {
  response.send(`
    <p>Phonebook has info for ${persons?.length} persons</p>
    <p>${new Date()}</p>
  `)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${3001}`)
})
