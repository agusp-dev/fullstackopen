import { useState } from 'react'
import PropTypes from 'prop-types'
import { Country } from './Country'

export const Countries = ({ list = null }) => {

  const [selectedCountry, setSelectedCountry] = useState()

  if (list === null) return 'Please, search a country by name'
  if (list?.length === 0) return 'No matches found...'
  if (list?.length === 1) {
    const { 
      name, 
      capital, 
      languages, 
      flags 
    } = list[0]
    return <Country name={ name } capital={ capital } languages={ languages } flags={ flags } />
  }
  if (list?.length > 10) return 'Too many matches, specify another filter!'

  return (
    <>
      <ul>
        {list?.map(country => (
          <li 
            key={ country?.fifa }
          >
            <div>
              { country?.name?.common }
              <button onClick={ () => setSelectedCountry(country) }>Show</button>
            </div>
          </li>
        ))}
      </ul>
      {selectedCountry && (
        <Country 
          name={ selectedCountry?.name } 
          capital={ selectedCountry?.capital } 
          languages={ selectedCountry?.languages } 
          flags={ selectedCountry?.flags } 
        />
      )}
    </>
  )
}

Countries.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({})),
}
