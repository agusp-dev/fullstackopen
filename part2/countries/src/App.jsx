import { useState, useEffect } from 'react'
import { Filter } from './components/Filter'
import { Countries } from './components/Countries'
import { getAll } from './services'

const tlc = (str) => str?.toLowerCase()

const filterMatch = (str1, str2) => tlc(str1)?.startsWith(tlc(str2))

export const App = () => {

  const [allCountries, setAllCountries] = useState()
  const [countries, setCountries] = useState(null)

  useEffect(() => {
    getAll()
      .then(list => setAllCountries(list))
      .catch(err => console.log(err))
  }, [])

  const filteredCountries = (filter) => {
    const filteredList = allCountries?.filter(country => filterMatch(country?.name?.common, filter))
    setCountries(filteredList)
  }

  const handleFilterChange = (e) => {
    const str = e?.target?.value
    if (!str) {
      setCountries(null)
      return
    }
    filteredCountries(str)
  }

  return (
    <div>
      <h1>Countries App</h1>
      <Filter onFilterChange={ handleFilterChange } />
      <Countries list={ countries } />
    </div>
  )
}
