
import PropTypes from 'prop-types'

const Header = ({ name }) => <h2>{ name }</h2>

const Part = ({ name, exercises }) => <p>{ name }: { exercises }</p>

const Content = ({ parts }) => parts?.map(({ name, exercises }) => <Part key={ name } name={ name } exercises={ exercises } />)

const Total = ({ parts }) => <strong>Total of { parts?.reduce((accum, { exercises }) => accum + exercises, 0) } exercises</strong>

export const Course = ({ course }) => {
  console.log('Course', course)
  return (
    <>
      <Header name={ course?.name } />
      <Content parts={ course?.parts } />
      <Total parts={ course?.parts }/>
    </>
  )
}

Course.propTypes = {
  course: PropTypes.shape({
    name: PropTypes.string.isRequired,
    parts: PropTypes.arrayOf({})
  })
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
}

Part.propTypes = {
  name: PropTypes.string.isRequired,
  exercises: PropTypes.number.isRequired,
}

Total.propTypes = {
  parts: PropTypes.number.isRequired,
}
