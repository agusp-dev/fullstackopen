import PropTypes from 'prop-types'

export const CreateNoteForm = ({
  onHandleSubmit,
  newNoteContent,
  onHandleNewNoteContent,
  newNoteIsImportant,
  onHandleNewNoteIsImportant
}) => (
  <form onSubmit={ onHandleSubmit }>
    <input value={ newNoteContent } onChange={ onHandleNewNoteContent } />
    <input type='checkbox' id='isImportant' checked={ newNoteIsImportant } onChange={ onHandleNewNoteIsImportant }/>
    Is Important
    <button type='submit'>Agregar</button>
  </form>
)

CreateNoteForm.propTypes = {
  onHandleSubmit: PropTypes.func.isRequired,
  newNoteContent: PropTypes.string.isRequired,
  onHandleNewNoteContent: PropTypes.func.isRequired,
  newNoteIsImportant: PropTypes.bool.isRequired,
  onHandleNewNoteIsImportant: PropTypes.func.isRequired
}
