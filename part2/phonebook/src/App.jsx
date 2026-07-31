import { useState,useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')


  useEffect(()=>{
    axios
        .get('http://localhost:3001/persons')
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

  const addPerson =(e) =>{
    e.preventDefault()
    if(persons.some(person =>person.name === newName) || persons.some(person => person.number === newNumber)){
      alert(`${newName} is already added to phonebook`)
    }

    const personObject = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }





  return (
    <div>
      <h2>Phonebook</h2>
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
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App