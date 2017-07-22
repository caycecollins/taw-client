export default function apiGetFactory (endpoint, pathCheck, requiredCheck) {
  const apiGet = async ({ path, http, state, storage, router }) => {
    if (!state.get('authorization.authenticated')) return path.error()
    if (!endpoint || !pathCheck) return path.error({ error: 'endpoint and path required' })
    const requiredPathFromLocalStorage = storage.get(requiredCheck)
    if (requiredCheck && !requiredPathFromLocalStorage) {
      return path.error({ error: 'big error' })
    }
    // const pathFromLocalStorage = storage.get(pathCheck)
    // if (pathFromLocalStorages) {
    //   state.set(pathCheck, pathFromLocalStorage)
    //   return path.success({ result: pathFromLocalStorage })
    // } else {
    //   const getDataFromApi = await http.get(endpoint)
    //   storage.set(pathCheck, getDataFromApi.result)
    //   return path.success({ result: getDataFromApi.result })
    // }
    const getDataFromApi = await http.get(endpoint)
    state.set(pathCheck, getDataFromApi.result)
    storage.set(pathCheck, getDataFromApi.result)
    return path.success({ result: getDataFromApi.result })
  }
  return apiGet
}
