import {
  intKeys, randomFromList, removeKeysFromObject, removeListFromList,
} from '../../src/util/general'

const sourceMap = {'0': '#99ccff', '8': '#99ccff'}
const list = [0, 5, 7, 8]
const smallList = [0, 8]

test("sourceMap is {'0': '#99ccff', '8': '#99ccff'}", () => {
  expect(sourceMap).toEqual({'0': '#99ccff', '8': '#99ccff'})
})

test("list is [0, 5, 7, 8]", () => {
  expect(list).toEqual([0, 5, 7, 8])
})

test("smallList is [0, 8]", () => {
  expect(smallList).toEqual([0, 8])
})

test("intKeys(sourceMap) is [0, 8]", () => {
  expect(intKeys(sourceMap)).toEqual(smallList)
})

test("list.includes(randomFromList(list)) is true", () => {
  expect(list.includes(randomFromList(list))).toEqual(true)
})

test("removeKeysFromObject(sourceMap, ['8']) is {'0': '#99ccff'}", () => {
  expect(removeKeysFromObject(sourceMap, ['8'])).toEqual({'0': '#99ccff'})
})

test("removeKeysFromObject(sourceMap, [8]) is {'0': '#99ccff'}", () => {
  expect(removeKeysFromObject(sourceMap, [8])).toEqual({'0': '#99ccff'})
})

test("removeListFromList(list, smallList) is [5, 7]", () => {
  expect(removeListFromList(list, smallList)).toEqual([5, 7])
})
