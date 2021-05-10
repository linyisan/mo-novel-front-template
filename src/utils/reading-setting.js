import Cookies from 'js-cookie'

const key = 'readingSetting'

export function getReadingSetting() {
  const result = JSON.parse(Cookies.get(key))
  // const result = JSON.parse(localStorage.getItem(key))
  return result
}

export function setReadingSetting(readingSetting) {
  // localStorage.setItem(key, JSON.stringify(readingSetting))
  return Cookies.set(key, JSON.stringify(readingSetting))
}
