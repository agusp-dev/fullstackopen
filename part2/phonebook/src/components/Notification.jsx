import PropTypes from 'prop-types'

export const Notification = ({ type, message }) => (
  <div className={ type }>{ message }</div>
)

Notification.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
}