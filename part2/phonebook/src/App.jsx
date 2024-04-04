import { useState, useEffect } from 'react'
import { Person } from './components/Person'
import { Filter } from './components/Filter'
import { PersonForm } from './components/PersonForm'
import { SectionTitle } from './components/SectionTitle'
import { getAll, create, remove } from './services'

function App() {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    getAll()
      .then(initialList => setPersons(initialList))
      .catch(err => alert(err?.message))
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
    create(person)
      .then(newPerson => {
        if (newPerson) setPersons(currentPersons => currentPersons?.concat(newPerson))
      })
      .catch(err => alert(err?.message))
  }

  const removePerson = (id) => {
    remove(id)
      .then(removedPersonId => setPersons(currentPersons => currentPersons?.filter(person => person?.id !== removedPersonId)))
      .catch(err => alert(err?.message))
  }

  const handleFormSubmit = (e) => {
    e?.preventDefault()
    if (!newName || !newPhone) return

    if ( nameAlreadyExists(newName) ) {
      alert(`${newName} already exists!`)
      return
    }

    addNewPerson({ name: newName, number: newPhone })

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
      <PersonForm 
        name={ newName }
        onChangeName={ handleNameChange }
        phone={ newPhone }
        onChangePhone={ handlePhoneChange }
        onHandleSubmit={ handleFormSubmit }
      />
      <SectionTitle title='Numbers'/>
      <div>
        {persons?.length ? (
          <ul>
            {personsFiltered(filter)?.map((person) => (
              <Person 
                key={ person?.id } 
                onRemove={ removePerson } 
                { ...person } 
              />
            ))}
          </ul>
        ) : <div>Empty Phonebook...</div>}
      </div>
    </div>
  )
}

export default App
