import PropTypes from 'prop-types'

export const Person = ({ id, name, number, onRemove }) => (
  <li>
    { name } - { number }
    <button onClick={ () => onRemove(id) }>Delete</button>
  </li>
)

Person.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
}
