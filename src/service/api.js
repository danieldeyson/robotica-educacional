import axios from 'axios'

const api = axios.create({
  //baseURL: process.env.REACT_APP_API_URL
  baseURL: 'https://science-robotica-back.herokuapp.com/api/',
})

export default api