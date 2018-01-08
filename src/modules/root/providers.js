import HttpProvider from '@cerebral/http'
import FormsProvider from '@cerebral/forms'
import config from 'config'

const localStorageToken = window.localStorage.getItem('authorization.token')
const jwtToken = localStorageToken ? JSON.parse(localStorageToken) : null

export const http = HttpProvider({
  baseUrl: `${config.api.protocol}://${config.api.host}:${config.api.port}/${
    config.api.baseUrl
  }`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    Accept: 'application/json',
    Authorization: `Bearer ${jwtToken}`,
  },
  withCredentials: true, // true if CORS is required
})

export const forms = FormsProvider({
  errorMessages: {
    minLength (value, minLength) {
      return `${minLength} characters minimum.`
    },
    isEmail (value) {
      return `${value} is not a valid email`
    },
    equalsField (value, field) {
      return `Not equal to ${field}`
    },
  },
})
