import axios from 'axios'

const api = axios.create({
  baseURL: 'REACT_APP_API_URL/api/',
})

export default api
