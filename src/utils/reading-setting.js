import Cookies from 'js-cookie'

const key = 'readingSetting'

export function getReadingSetting() {
  let result = Cookies.get(key)
  if (result) result = JSON.parse(result)
  // const result = JSON.parse(localStorage.getItem(key))
  return result
}

export function setReadingSetting(readingSetting) {
  // localStorage.setItem(key, JSON.stringify(readingSetting))
  return Cookies.set(key, JSON.stringify(readingSetting))
}
