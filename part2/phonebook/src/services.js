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

export const update = (id, payload) => axios
  .patch(`${baseUrl}/${id}`, payload)
  .then(response => response?.status === 200
    ? response?.data
    : null
  )

export const remove = (id) => axios
  .delete(`${baseUrl}/${id}`)
  .then(response => response?.status === 200
    ? response?.data?.id
    : null
  )
