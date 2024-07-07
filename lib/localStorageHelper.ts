export const isLocalStorageAvailable = () => {
  try {
    const testKey = '__test__'
    localStorage.setItem(testKey, testKey)
    localStorage.removeItem(testKey)
    return true
  } catch (error) {
    return false
  }
}
