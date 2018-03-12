const intKeys = object => Object.keys(object).map(key => parseInt(key, 10))
const randomFromList = list => list[Math.floor(Math.random() * list.length)]
const removeKeysFromObject = (originalObject, removalKeys) => {
  const removeKeyStrings = removalKeys.map(key => key.toString())
  return Object.keys(originalObject)
    .filter(key => !removeKeyStrings.includes(key))
    .reduce((result, key) => ({ ...result, [key]: originalObject[key] }), {})
}
const removeListFromList = (originalList, removals) =>
  originalList.filter(item => !removals.includes(item))
const sortNumber = (a, b) => a - b

export {
  intKeys,
  randomFromList,
  removeKeysFromObject,
  removeListFromList,
  sortNumber,
}
