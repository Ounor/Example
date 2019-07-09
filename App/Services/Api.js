// a library to wrap and simplify api calls
import apisauce from 'apisauce'

// our "constructor"
const create = (baseURL = 'http://193.124.114.46:3001/') => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache'
    },
    timeout: 1000
  })

  const getRoot = () => api.get('')
  const getUser = (token) => api.get('/api/protected/user-info', {}, {headers: {'Authorization': 'bearer ' + token}})
  const getTransactions = (username) => api.get('/api/protected/transactions', {q: username})
  const signUp = (username, password, email) => api.post('/users', {username: username, password: password, email: email})

  return {
    getTransactions,
    getRoot,
    getUser,
    signUp
  }
}

export default {
  create
}
