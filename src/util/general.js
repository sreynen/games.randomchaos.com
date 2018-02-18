const intKeys = object => Object.keys(object).map(key => parseInt(key, 10))
const randomFromList = list => list[Math.floor(Math.random() * list.length)]
const sortNumber = (a, b) => a - b

export {
  intKeys,
  randomFromList,
  sortNumber,
}
