import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const apiKey = import.meta.env.VITE_WEATHER_API_KEY
const weatherBaseUrl = 'https://api.weatherapi.com/v1/current.json?key='

export const getAll = () => (
  axios
    .get(baseUrl)
    .then(response => response?.status === 200 ? response?.data : [])
)

export const getCapitalWeather = (capital) => {  
  const weatherUrl = `${weatherBaseUrl}${apiKey}&q=${capital}&aqi=no`
  return axios
    .get(weatherUrl)
    .then(response => response?.status === 200 ? response?.data?.current?.condition : null)
}
