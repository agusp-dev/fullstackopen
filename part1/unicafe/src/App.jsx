import { useState } from 'react'
import PropTypes from 'prop-types'

const Title = () => <h1>Give Feedback</h1>
const Subtitle = () => <h2>Statistics</h2>

const Button = ({ title, onClick }) => <button onClick={ onClick }>{ title }</button>

const Statistic = ({ text, value, sign = '' }) => <p>{ text }: { value } { sign }</p>

const GOOD_LABEL = 'Good'
const NEUTRAL_LABEL = 'Neutral'
const BAD_LABEL = 'Bad'

const getSum = (v1, v2, v3) => v1 + v2 + v3

const getAverage = (v1, v2, v3) => {
  const good = v1
  const bad = (-1) * v3
  return (good + bad) / getSum(v1, v2, v3)
}

const getPositivePercent = (v1, v2, v3) => {
  const total = getSum(v1, v2, v3)
  return v1 * 100 / total
}

export const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClickGood = () => {
    setGood(prevValue => prevValue + 1)
  }

  const handleClickNeutral = () => {
    setNeutral(prevValue => prevValue + 1)
  }

  const handleClickBad = () => {
    setBad(prevValue => prevValue + 1)
  }

  return (
    <div>
      <Title />
      <div>
        <Button title={ GOOD_LABEL } onClick={ handleClickGood } />
        <Button title={ NEUTRAL_LABEL } onClick={ handleClickNeutral } />
        <Button title={ BAD_LABEL } onClick={ handleClickBad } />
      </div>
      <Subtitle />
      {(good > 0 || neutral > 0 || bad > 0) ? (
        <div>
          <Statistic text={ GOOD_LABEL } value={ good } />
          <Statistic text={ NEUTRAL_LABEL } value={ neutral } />
          <Statistic text={ BAD_LABEL } value={ bad } />
          <Statistic text='All' value={ getSum(good, neutral, bad) } />
          <Statistic text='Average' value={ getAverage(good, neutral, bad) } />
          <Statistic text='Positive' value={ getPositivePercent(good, neutral, bad) } sign='%'  />
        </div>
      ) : <p>No feedback given!</p>}
    </div>
  )
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

Statistic.propTypes = {
  text: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  sign: PropTypes.string,
}