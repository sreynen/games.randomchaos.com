import { connectedIndexes, maybeConnectedIndexes } from '../../src/util/pipes'

const straightUpPipe = {type: 'straight', direction: 'up'}
const curveUpPipe = {type: 'curve', direction: 'up'}
const curveRightPipe = {type: 'curve', direction: 'right'}
const straightRightPipe = {type: 'straight', direction: 'right'}
const boardOne = [
  curveUpPipe, straightRightPipe, curveUpPipe,
  straightUpPipe, curveUpPipe, straightUpPipe,
  curveUpPipe, straightRightPipe, curveUpPipe,
]
/**
 * ┗ - ┗
 * | ┗ |
 * ┗ - ┗
 * https://en.wikipedia.org/wiki/Box-drawing_character
 */

test("straightUpPipe is {type: 'straight', direction: 'up'}", () => {
  expect(straightUpPipe).toEqual({type: 'straight', direction: 'up'})
})

test("curveUpPipe is {type: 'curve', direction: 'up'}", () => {
  expect(curveUpPipe).toEqual({type: 'curve', direction: 'up'})
})

test("curveRightPipe is {type: 'curve', direction: 'right'}", () => {
  expect(curveRightPipe).toEqual({type: 'curve', direction: 'right'})
})

test("straightRightPipe is {type: 'straight', direction: 'right'}", () => {
  expect(straightRightPipe).toEqual({type: 'straight', direction: 'right'})
})

test("maybeConnectedIndexes(straightUpPipe, 6, 6) is [0, 12]", () => {
  expect(maybeConnectedIndexes(straightUpPipe, 6, 6)).toEqual([0, 12])
})

test("maybeConnectedIndexes(straightUpPipe, 5, 6) is [11]", () => {
  expect(maybeConnectedIndexes(straightUpPipe, 5, 6)).toEqual([11])
})

test("maybeConnectedIndexes(curveUpPipe, 8, 6) is [2, 9]", () => {
  expect(maybeConnectedIndexes(curveUpPipe, 8, 6)).toEqual([2, 9])
})

test("maybeConnectedIndexes(curveRightPipe, 8, 6) is [9, 14]", () => {
  expect(maybeConnectedIndexes(curveRightPipe, 8, 6)).toEqual([9, 14])
})

test("maybeConnectedIndexes(straightRightPipe, 13, 6) is [12, 14]", () => {
  expect(maybeConnectedIndexes(straightRightPipe, 13, 6)).toEqual([12, 14])
})

test("maybeConnectedIndexes(straightRightPipe, 12, 6) is [13]", () => {
  expect(maybeConnectedIndexes(straightRightPipe, 12, 6)).toEqual([13])
})

test("connectedIndexes(boardOne, 6, 3) is [3, 7]", () => {
  expect(connectedIndexes(boardOne, 6, 3)).toEqual([3, 7])
})

test("connectedIndexes(boardOne, 3, 3) is [6]", () => {
  expect(connectedIndexes(boardOne, 3, 3)).toEqual([6])
})

test("connectedIndexes(boardOne, 4, 3) is []", () => {
  expect(connectedIndexes(boardOne, 4, 3)).toEqual([])
})

test("connectedIndexes(boardOne, 0, 3) is [1]", () => {
  expect(connectedIndexes(boardOne, 0, 3)).toEqual([1])
})

test("connectedIndexes(boardOne, 5, 3) is [8]", () => {
  expect(connectedIndexes(boardOne, 5, 3)).toEqual([8])
})
