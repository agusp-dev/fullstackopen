import { useState, useEffect } from 'react'
import axios from 'axios'
import { Person } from './components/Person'
import { Filter } from './components/Filter'
import { PersonForm } from './components/PersonForm'

const PERSONS_ENDPOINT = 'http://localhost:3001/persons'

function App() {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get(PERSONS_ENDPOINT)
      .then(response => {
        if (response?.status === 200) {
          setPersons(response?.data)
        }
      })
  }, [])

  const handleFilterChange = (e) => {
    setFilter(e?.target?.value)
  }

  const handleNameChange = (e) => {
    setNewName(e?.target?.value)
  }

  const handlePhoneChange = (e) => {
    setNewPhone(e?.target?.value)
  }

  const resetStates = () => {
    setNewName('')
    setNewPhone('')
  }

  const nameAlreadyExists = (name) => persons?.find(person => person?.name === name)

  const addNewPerson = (person) => {
    axios
      .post(PERSONS_ENDPOINT, person)
      .then(response => {
        if (response?.status === 201) {
          setPersons(currentPersons => currentPersons?.concat(response?.data))
        }
      })
  }

  const handleFormSubmit = (e) => {
    e?.preventDefault()
    if (!newName || !newPhone) return

    if ( nameAlreadyExists(newName) ) {
      alert(`${newName} already exists!`)
      return
    }

    const payload = { name: newName, number: newPhone }

    addNewPerson(payload)
    // setPersons(currentPersons => [...currentPersons, { id: currentPersons?.length + 1, ...payload }])

    resetStates()
  }

  const personsFiltered = filter => {
    if (!filter) return persons
    return persons?.filter(({ name }) => name?.toLowerCase()?.startsWith(filter?.toLowerCase()) )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={ filter } onChange={ handleFilterChange } />
      <h3>Add a New</h3>
      <PersonForm 
        name={ newName }
        onChangeName={ handleNameChange }
        phone={ newPhone }
        onChangePhone={ handlePhoneChange }
        onHandleSubmit={ handleFormSubmit }
      />
      <h3>Numbers</h3>
      <div>
        {persons?.length ? (
          <ul>
            { personsFiltered(filter)?.map(({ id, name, number }) => <Person key={ id } name={ name } number={ number } /> ) }
          </ul>
        ) : <div>Empty Phonebook...</div>}
      </div>
    </div>
  )
}

export default App
