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

  const getUser = (token) => api.get('/api/protected/user-info', {}, {headers: {'Authorization': 'bearer ' + token}})
  const getTransactions = (token) => api.get('/api/protected/transactions', {}, {headers: {'Authorization': 'bearer ' + token}})
  const signUp = (username, password, email) => api.post('/users', {username: username, password: password, email: email})
  const signIn = (email, password) => api.post('/sessions/create', {email: email, password: password})
  const createTransaction = (name, amount, token) => api.post('/api/protected/transactions', {name: name, amount: amount}, {headers: {'Authorization': 'bearer ' + token}})
  const getUsers = (filter, token) => api.post('/api/protected/users/list', {filter}, {headers: {'Authorization': 'bearer ' + token}})

  return {
    getTransactions,
    getUser,
    signUp,
    signIn,
    createTransaction,
    getUsers
  }
}

export default {
  create
}
