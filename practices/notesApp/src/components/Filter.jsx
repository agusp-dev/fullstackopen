import PropTypes from 'prop-types'
import { FILTER } from '../constants'

export const Filter = ({ onHandleChangeFilter }) => (
  <>
    <input type='radio' id='filterAll' name='filter' value={ FILTER.ALL } defaultChecked onChange={ onHandleChangeFilter} />
    All
    <input type='radio' id='filterImportants' name='filter' value={ FILTER.IMPORTANTS } onChange={ onHandleChangeFilter } />
    Importants
  </>
)

Filter.propTypes = {
  onHandleChangeFilter: PropTypes.func.isRequired,
}
