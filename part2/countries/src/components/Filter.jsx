import PropTypes from 'prop-types'

export const Filter = ({ onFilterChange }) => (
  <div>
    Find a Countries
    <input placeholder='Country name' onChange={ onFilterChange } />
  </div>
)

Filter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
}
