import { useState } from 'react'

const Title = () => <h1>Anecdote of the day</h1>

const Subtitle = () => <h1>Anecdote with most votes</h1>

const AnecdoteVotes = ({ count }) => <p>Votes Count: { count }</p>

const Button = ({ title, onClick }) => <button onClick={ onClick }>{ title }</button>

const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
  'The only way to go fast, is to go well.'
]

const INITIAL_POINTS = {
  0: 0,
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  7: 0,
}

export const App = () => {

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(INITIAL_POINTS)
  console.log('points', points)

  const getRandomInt = (min, max) => {
    if (min < 0) {
      min = 0
    }
    if (max > anecdotes.length) {
      max = anecdotes.length
    }

    return Math.floor(Math.random() * (max - min))
  }

  const handleClickNext = () => {
    const random = getRandomInt(0, anecdotes.length)
    setSelected(random)
  }

  const handleClickVote = () => {
    setPoints(currentPoints => ({
      ...currentPoints,
      [selected]: Number([currentPoints[selected]]) + 1
    }))
  }

  const getHighestNumberVotesAnecdoteIndex = () => {
    let anecdoteIndex = 0
    const toArray = Object.values(points)

    toArray?.forEach((anecdotePoints, index) => {
      if (index < toArray?.length - 1) {

        const nextIndex = index + 1
        const nextPoint = points[nextIndex]
        if (nextPoint > anecdotePoints) {
          anecdoteIndex = nextIndex
        }

      }
    })

    return anecdoteIndex
  }

  const getHighestNumberOfVotesAnecdote = () => {
    const index = getHighestNumberVotesAnecdoteIndex()
    console.log('getHighestNumberOfVotesAnecdote', index)
  }

  return (
    <div>
      <Title />
      <div>
        {selected} - {anecdotes[selected]}
        <AnecdoteVotes count={ points[selected] } />
      </div>
      <Button title='Vote!' onClick={ handleClickVote } />
      <Button title='Next Anecdote' onClick={ handleClickNext } />
      <div>
        <Subtitle />
        { getHighestNumberOfVotesAnecdote() }
      </div>
    </div>
  )
}
