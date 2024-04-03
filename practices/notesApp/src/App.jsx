import { useState, useEffect } from 'react'
import { Note } from './components/Note'
import { SectionTitle } from './components/SectionTitle'
import { Filter } from './components/Filter'
import { CreateNoteForm } from './components/CreateNoteForm'
import { getAll, create, update } from './services'
import { FILTER } from './constants'

function App() {
  
  const [notes, setNotes] = useState([])
  const [newNoteContent, setNewNoteContent] = useState('')
  const [newNoteIsImportant, setNewNoteIsImportant] = useState(false)

  useEffect(() => {
    getAll()
      .then(initialNotes => setNotes(initialNotes))
      .catch(error => alert(error?.message))
  }, [])

  const resetStates = () => {
    setNewNoteContent('')
    setNewNoteIsImportant(false)
  }

  const filterNotes = (str) => {
    if (!str) return notes
    if (str === FILTER.ALL) return notes
    if (str === FILTER.IMPORTANTS) return notes?.filter(({ important }) => important)
  }

  const handleChangeFilter = event => {
    const filterStr = event?.target?.value
    setNotes( filterNotes(filterStr) )
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
      .catch(error => alert(error?.message))
  }

  const updateNote = (id, important) => {
    if (!id) return
    update(id, { important })
      .then(updatedNote => {
        if (updatedNote?.id) {
          setNotes(currentNotes => currentNotes?.map(note => note?.id !== updatedNote?.id ? note : updatedNote))
        }
      })
      .catch(error => alert(error?.message))
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
