export default function apiGetFactory (endpoint, pathCheck, requiredCheck) {
  const apiGet = async ({ path, http, state, storage }) => {
    if (!endpoint || !pathCheck) return path.error({ error: 'endpint and path required' })
    const requiredPathFromLocalStorage = storage.get(requiredCheck)
    if (requiredCheck && !requiredPathFromLocalStorage) {
      return path.error({ error: 'big error' })
    }
    const pathFromLocalStorage = storage.get(pathCheck)
    if (pathFromLocalStorage) {
      state.set(pathCheck, pathFromLocalStorage)
      return path.success({ result: pathFromLocalStorage })
    } else {
      const getDataFromApi = await http.get(endpoint)
      storage.set(pathCheck, getDataFromApi.result)
      return path.success({ result: getDataFromApi.result })
    }
  }
  return apiGet
}
