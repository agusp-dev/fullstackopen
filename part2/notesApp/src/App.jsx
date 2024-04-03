import { useState, useEffect } from 'react'
import axios from 'axios'
import { Note } from './components/Note'

const FILTER = {
  ALL: 'all',
  IMPORTANTS: 'importants'
}

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
        <h4>Filter</h4>
        <input type='radio' id='filterAll' name='filter' value={ FILTER.ALL } defaultChecked onChange={ handleChangeFilter} />
        <label htmlFor='filterAll'>All</label>
        <input type='radio' id='filterImportants' name='filter' value={ FILTER.IMPORTANTS } onChange={ handleChangeFilter } />
        <label htmlFor='filterImportants'>Importants</label>
      </div>

      <div>
        <h4>Agregar Nota</h4>
        <form onSubmit={ handleSubmit }>
          <input value={ newNoteContent } onChange={ handleNewNoteContent } />
          <input type='checkbox' id='isImportant' checked={ newNoteIsImportant } onChange={ handleNewNoteIsImportant }/>
          <label htmlFor='isImportant'>Is Important</label>
          <button type='submit'>Agregar</button>
        </form>
      </div>

      <div>
        <h4>List</h4>
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
