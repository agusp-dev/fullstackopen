import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

export const getAll = () => (
  axios
    .get(baseUrl)
    .then(response => response?.status === 200 ? response?.data : [])
)
