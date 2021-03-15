import Axios from 'axios'

export const baseURL = window.location.origin.includes('localhost') ? 'http://localhost:3000' : ''
export const api = Axios.create({
  baseURL: 'https://bcw-sandbox.herokuapp.com/',
  timeout: 8000
})

export const setBearer = (bearer) => {
  api.defaults.headers.authorization = bearer
}

export const resetBearer = () => {
  api.defaults.headers.authorization = ''
}
