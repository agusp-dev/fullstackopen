import PropTypes from 'prop-types'

export const Note = ({ note = {} }) => (
  <li>{ note?.content }</li>
)

Note.propTypes = {
  note: PropTypes.shape({ 
    content: PropTypes.string.isRequired,
  })
}