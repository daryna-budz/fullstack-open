import { useState,useEffect } from 'react'
import phonebook from './services/phonebook'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)


  useEffect(()=>{
    phonebook
        .getAll()
        .then(response => {
          console.log("Promise fulfilled!")
          setPersons(response.data)
        })
  }, [])

  const handleChange = (e) => {
     setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }

  const filteredPersons = persons.filter(person =>
      person.name.toLowerCase().includes(filter.toLowerCase())
  )

const deletePerson = (id) => {
  const person = persons.find(person => person.id === id)

  const confirmDelete = window.confirm(
    `Delete ${person.name}?`
  )

  if (confirmDelete) {
    phonebook
      .deletePerson(id)
      .then(() => {
        setPersons(prevPersons =>
          prevPersons.filter(person => person.id !== id)
        )
      })
  }
}

const updatePerson = (id, newNumber) => {
  const person = persons.find(person => person.id === id)

  const confirmUpdate = window.confirm(
    `${person.name} is already in the phonebook. Do you want to update their number?`
  )

  if (confirmUpdate) {
    phonebook
      .update(id, { ...person, number: newNumber })
      .then(() => {
        setPersons(prevPersons =>
          prevPersons.map(person => person.id === id ? { ...person, number: newNumber } : person)
        )
        setMessage(`Updated ${person.name}'s number`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }
}

  const addPerson =(e) =>{
    e.preventDefault()
    const existingPerson = persons.find(
      person => person.name === newName
    )

    if (existingPerson) {
      updatePerson(existingPerson.id, newNumber)
      return
    }

    const personObject = {
      name: newName,
      number: newNumber
    }

    phonebook
      .create(personObject)
      .then(response => {
        setPersons(prevPersons => prevPersons.concat(response.data))
        setNewName('')
        setNewNumber('')
        setMessage(`Added ${response.data.name}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch(error => {
        setMessage(error.response.data.error)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }





  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h2>add a new</h2>

      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        handleChange={handleChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  )
}

export default App