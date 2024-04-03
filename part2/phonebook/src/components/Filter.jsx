import PropTypes from 'prop-types'

export const Filter = ({ filter, onChange }) => (
  <div>
    Filter: 
    <input value={ filter } onChange={ onChange } />
  </div>
)

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}
