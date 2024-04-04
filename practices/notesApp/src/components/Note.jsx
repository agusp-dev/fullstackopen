import PropTypes from 'prop-types'

export const Note = ({ id, content, important, onToggleImportance }) => (
  <li className='note'>
    <div>
      { content }
    </div>
    <div>
     { important ? 'Important' : 'Is Not Important' }
    </div>
    <div>
      <button onClick={ () => onToggleImportance(id, !important) }>Change Importance</button>
    </div>
  </li>
)

Note.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  important: PropTypes.bool.isRequired,
  onToggleImportance: PropTypes.func.isRequired,
}