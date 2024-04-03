import axios from 'axios'

const success_code = {
  get: 200,
  post: 201,
  patch: 200,
}

const baseUrl = 'http://localhost:3001/notes'

export const getAll = () => {
  const nonExisting = {
    id: '10000',
    content: 'This note is not saved to server',
    important: true,
  }
  return axios.get(baseUrl).then(response => {
    return response?.status === success_code.get
      ? response?.data?.concat(nonExisting)
      : []
  })
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
