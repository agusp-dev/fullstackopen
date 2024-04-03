import { useState, useEffect } from 'react'
import axios from 'axios'
import { Note } from './components/Note'
import { SectionTitle } from './components/SectionTitle'
import { Filter } from './components/Filter'
import { CreateNoteForm } from './components/CreateNoteForm'
import { FILTER } from './constants'

function App() {
  
  const [notes, setNotes] = useState([])
  const [newNoteContent, setNewNoteContent] = useState('')
  const [newNoteIsImportant, setNewNoteIsImportant] = useState(false)

  console.log('notes', notes)

  useEffect(() => {
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        if (response?.status === 200 || response?.status === 201) {
          setNotes( response?.data )
        }
      })
  }, [])

  // const resetStates = () => {
  //   setNewNoteContent('')
  //   setNewNoteIsImportant(false)
  // }

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

  //TODO CHECK
  const handleSubmit = (event) => {
    event?.preventDefault()

    // if (!newNoteContent) return
    
    // const newNotePayload = {
    //   id: notesArr?.length + 1,
    //   content: newNoteContent,
    //   important: newNoteIsImportant
    // }

    // onAddNewNote( newNotePayload )
    // resetStates()
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
            <Note key={note.id} note={note} />
          )}
        </ul>
      </div>
    </div>
  )
}

export default App
