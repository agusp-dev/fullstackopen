import PropTypes from 'prop-types'

export const Person = ({ name, number }) => (
  <li>
    { name } - { number }
  </li>
)

Person.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired
}
