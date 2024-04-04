import { useState, useEffect } from 'react'
import { Note } from './components/Note'
import { SectionTitle } from './components/SectionTitle'
import { Filter } from './components/Filter'
import { CreateNoteForm } from './components/CreateNoteForm'
import { Notification } from './components/Notification'
import { getAll, create, update } from './services'
import { FILTER } from './constants'

function App() {
  
  const [notes, setNotes] = useState([])
  const [newNoteContent, setNewNoteContent] = useState('')
  const [newNoteIsImportant, setNewNoteIsImportant] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const getNotes = () => {
    getAll()
      .then(initialNotes => setNotes(initialNotes))
      .catch(error => setErrorMessage(error?.message))
  }

  useEffect(() => {
    getNotes()
  }, [])

  const resetStates = () => {
    setNewNoteContent('')
    setNewNoteIsImportant(false)
  }

  const handleChangeFilter = event => {
    const filterStr = event?.target?.value
    if (filterStr === FILTER.IMPORTANTS) {
      const importants = notes?.filter(({ important }) => important)
      setNotes(importants)
      return
    }
    getNotes()
  }

  const handleNewNoteContent = (event) => {
    const newValue = event?.target?.value
    setNewNoteContent(newValue)
  }

  const handleNewNoteIsImportant = () => {
    const newValue = event?.target?.checked
    setNewNoteIsImportant(newValue)
  }

  const createNote = (note) => {
    create(note)
      .then(newNote => {
        if (newNote?.id) {
          setNotes(currentNotes => currentNotes?.concat(newNote))
        }
      })
      .catch(error => setErrorMessage(error?.message))
  }

  const updateNote = (id, important) => {
    if (!id) return
    update(id, { important })
      .then(updatedNote => {
        if (updatedNote?.id) {
          setNotes(currentNotes => currentNotes?.map(note => note?.id !== updatedNote?.id ? note : updatedNote))
        }
      })
      .catch(error => setErrorMessage(error?.message))
  }

  const handleSubmit = (event) => {
    event?.preventDefault()

    if (!newNoteContent) return
    
    const notePayload = {
      content: newNoteContent,
      important: newNoteIsImportant
    }

    createNote(notePayload)
    resetStates()
  }

  return (
    <div>
      <h1>Notes</h1>
      { errorMessage && <Notification message={ errorMessage }/> }
      <div>
        <SectionTitle title='Filter' />
        <Filter onHandleChangeFilter={ handleChangeFilter } />
      </div>

      <div>
        <SectionTitle title='Add Note' />
        <CreateNoteForm 
          onHandleSubmit={ handleSubmit }
          newNoteContent={ newNoteContent }
          onHandleNewNoteContent={ handleNewNoteContent }
          newNoteIsImportant={ newNoteIsImportant }
          onHandleNewNoteIsImportant={ handleNewNoteIsImportant }
        />
      </div>

      <div>
        <SectionTitle title='List' />
        <ul>
          {notes.map(note => 
            <Note 
              key={note.id}
              onToggleImportance={ updateNote } 
              { ...note } 
            />
          )}
        </ul>
      </div>
    </div>
  )
}

export default App
