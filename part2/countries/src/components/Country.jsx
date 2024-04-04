import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { getCapitalWeather } from '../services'

export const Country = ({ name, capital, languages, flags }) => {

  const [weather, setWeather] = useState()

  useEffect(() => {
    if (capital) {
      getCapitalWeather(capital)
        .then(capitalWeather => setWeather(capitalWeather))
        .catch(err => console.log(err))
    }
  }, [capital])

  return (
    <div className='country'>
      <div className='country-name'>
        <img width={24} height={20} src={ flags?.png } alt={ flags?.alt } />
        <h3>{ name?.common ?? '-' }</h3>
      </div>
      <div>
        Capital: <span>{ capital[0] ?? '-' }</span>
      </div>
      <div>
        Lenguas:
        <ul>
          {Object.values(languages)?.map(lang => <li key={ lang }>{ lang }</li>)}
        </ul>
      </div>
      {weather && (
        <div>
          Temperatura:
          <div className='weather'>
            <img width={48} src={ weather?.icon } alt={ weather?.text } />
            <h6>{ weather?.text ?? '-' }</h6>
          </div>
        </div>
      )}
    </div>
  )
}

Country.propTypes = {
  name: PropTypes.shape({
    common: PropTypes.string,
  }).isRequired,
  capital: PropTypes.arrayOf(PropTypes.string).isRequired,
  languages: PropTypes.shape({}),
  flags: PropTypes.shape({
    png: PropTypes.string,
    alt: PropTypes.string
  }),
}
