import axios from 'axios'

const success_code = {
  get: 200,
  post: 200,
  patch: 200,
}

const baseUrl = 'http://localhost:3001/api/notes'

export const getAll = () => {
  return axios.get(baseUrl).then(response => response?.data)
}

export const create = (payload) => {
  return axios.post(baseUrl, payload).then(response => {
    return response?.status === success_code.post
      ? response?.data
      : null
  })
}

export const update = (id, payload) => {
  return axios
    .patch(`${baseUrl}/${id}`, payload)
    .then(response => {
      return response?.status === success_code.patch
        ? response?.data
        : null
      }
    )
}
