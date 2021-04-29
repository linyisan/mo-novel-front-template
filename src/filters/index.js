// import dicts from '@/dicts'

/*
function dataMapFilter(value, dataMapName) {
  const keyValue = dicts[dataMapName].reduce((acc, cur) => {
    acc[cur.value] = cur.label
  }, {})
  return keyValue[value]
}
*/

/**
 * Upper case first char
 * @param {String} string
 */
export function uppercaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
