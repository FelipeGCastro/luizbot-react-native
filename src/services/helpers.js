import api from './api'

async function callGetApi (path, params, signOut) {
  try {
    const result = await api.get(path, params || {})
    if (result) {
      return result.data
    }
  } catch (error) {
    console.log(error)
    if (error.response.data.error === 'Token invalid') signOut()
  }
}
async function callUptadeApi (path, params, signOut) {
  try {
    const result = await api.put(path, params || {})
    if (result) {
      return result.data
    }
  } catch (error) {
    if (error.response.data.error === 'Token invalid') signOut()
  }
}

export {
  callGetApi,
  callUptadeApi
}
