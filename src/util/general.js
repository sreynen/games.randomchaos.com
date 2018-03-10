const intKeys = object => Object.keys(object).map(key => parseInt(key, 10))
const randomFromList = list => list[Math.floor(Math.random() * list.length)]
const removeListFromList = (originalList, removals) =>
  originalList.filter(item => !removals.includes(item))
const sortNumber = (a, b) => a - b

export {
  intKeys,
  randomFromList,
  removeListFromList,
  sortNumber,
}
