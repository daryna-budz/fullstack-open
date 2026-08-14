
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import Person from './models/person.js'

dotenv.config()

const app = express()

app.use(express.static('dist'))
app.use(express.json())
app.use(cors())


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

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then((person)=>{
      response.json(person)
    })
})

app.get('/info', (request, response) => {
  const time = new Date()

  Person.find({}).then((persons) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${time}</p>`)
  })
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndRemove(request.params.id).then((result) => {
    response.status(204).end()
  })
  .catch((error) => {
    console.log(error)
    response.status(400).send({ error: 'malformatted id' })
  })
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if(!body.name || !body.number){
    return response.status(400).json({
      error: 'Name or number is missing'
    })
  }

  Person.findOne({ name: body.name }).then(existingPerson => {
  if (existingPerson) {
    return response.status(400).json({
      error: 'Name must be unique'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then((savedPerson) => {
    response.json(savedPerson)
  })
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


})