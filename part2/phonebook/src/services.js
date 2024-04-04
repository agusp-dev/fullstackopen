import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

export const getAll = () => axios
  .get(baseUrl)
  .then(response => response?.status === 200
    ? response?.data 
    : [] 
  )

export const create = (payload) => axios
  .post(baseUrl, payload)
  .then(response => response?.status === 201
    ? response?.data
    : null
  )
