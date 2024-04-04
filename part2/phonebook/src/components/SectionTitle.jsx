import PropTypes from 'prop-types'

export const SectionTitle = ({ title }) => <h3>{ title }</h3>

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
}
