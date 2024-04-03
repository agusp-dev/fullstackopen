import PropTypes from 'prop-types'

export const SectionTitle = ({ title }) => <h4>{ title }</h4>

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
}
