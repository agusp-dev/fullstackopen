
import PropTypes from 'prop-types'

const Header = ({ name }) => <h1>{ name }</h1>

const Part = ({ name, exercises }) => <p>{ name }: { exercises }</p>

const Content = ({ parts }) => parts?.map(({ name, exercises }) => <Part key={ name } name={ name } exercises={ exercises } />)

const Total = ({ parts }) => <p>Number of exercises: { parts?.reduce((accum, { exercises }) => accum + exercises, 0) }</p>

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header name={ course?.name } />
      <Content parts={ course?.parts } />
      <Total parts={ course?.parts } />
    </div>
  )
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

export default App