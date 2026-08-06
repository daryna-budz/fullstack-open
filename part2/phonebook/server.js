
import express from 'express'
import morgan from 'morgan'
const app = express()

app.use(express.json())

morgan.token('body', (request) => {
  return JSON.stringify(request.body)
})

app.use((request, response, next) => {
  if (request.method === 'POST') {
    morgan(':method :url :status :body')(request, response, next)
  } else {
    morgan('tiny')(request, response, next)
  }
})

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456"
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523"
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345"
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122"
  }
]

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.get('/info', (request, response) => {
  const time = new Date()

  response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${time}</p>`)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if(person){
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
  }else {
    response.status(404).end()
  }
})

app.post('/api/persons', (request, response) => {
  const person = request.body

  if(!person.name || !person.number){
    return response.status(400).json({
      error: 'Name or number is missing'
    })
  }

  if(persons.find(p => p.name === person.name)){
    return response.status(400).json({
      error: 'Name must be unique'
    })
  }

  const newPerson = {
    id: Math.floor(Math.random() * 1000000),
    name: person.name,
    number: person.number
  }

  persons = [...persons, newPerson]
  response.json(newPerson)
})

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})