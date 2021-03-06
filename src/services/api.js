import axios from 'axios'

// Create axios client, pre-configured with baseURL
const api = axios.create({
  baseURL: 'https://luiz-binance-bot.herokuapp.com'
  // baseURL: 'http://192.168.1.81:3333'
})

// Set JSON Web Token in Client to be included in all calls
export const setClientToken = token => {
  api.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${token}`
    return config
  })
}

export default api
