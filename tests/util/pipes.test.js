import {
  centerSource, colorMap, connectedIndexes, connectedPipeIndexColorMap,
  copyPipeColor, cornerSources, emptyPipes, fadedColorMap,
  fadePartialConnections, fillConnections, fillFromSources, filledPipeIndexes,
  indexesAsColorMap, maybeConnectedIndexes, partialConnectionIndexes,
  pipeTypeMap, randomBoard, randomNextPipeOnBoard, randomPipe, randomPipeType,
  singlePathBoard,
} from '../../src/util/pipes'

let input, expectedResult
const straightUpPipe = {
  type: 'straight', direction: 'up', fillColor: colorMap.white
}
const curveUpPipe = {
  type: 'curve', direction: 'up', fillColor: colorMap.white
}
const curveRightPipe = {
  type: 'curve', direction: 'right', fillColor: colorMap.white
}
const straightRightPipe = {
  type: 'straight', direction: 'right', fillColor: colorMap.white
}
const capRightPipe = {
  type: 'cap', direction: 'right', fillColor: colorMap.white
}
const boardOne = [
  { ...curveUpPipe, fillColor: colorMap.blue }, straightRightPipe, curveUpPipe,
  straightUpPipe, curveUpPipe, straightUpPipe,
  curveUpPipe, straightRightPipe, curveUpPipe,
]
/**
 * ╚ ═ ╚
 * ║ ╚ ║
 * ╚ ═ ╚
 * https://en.wikipedia.org/wiki/Box-drawing_character
 */
 const boardTwo = [
   { ...capRightPipe, fillColor: colorMap.blue }, straightRightPipe, curveUpPipe,
   straightUpPipe, curveUpPipe, straightUpPipe,
   curveUpPipe, straightRightPipe, curveUpPipe,
 ]
 /**
  * ╞ ═ ╚
  * ║ ╚ ║
  * ╚ ═ ╚
  * https://en.wikipedia.org/wiki/Box-drawing_character
  */

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

test("copyPipeColor(boardOne, 0, [1])[1].fillColor is colorMap.blue", () => {
  expect(copyPipeColor(boardOne, 0, [1])[1].fillColor).toEqual(colorMap.blue)
})

test("filledPipeIndexes(boardOne) is [0]", () => {
  expect(filledPipeIndexes(boardOne)).toEqual([0])
})

expectedResult = "{ 0: colorMap.blue, 1: colorMap.blue }"

test(`indexesAsColorMap([0, 1], colorMap.blue) is ${expectedResult}`, () => {
  expect(indexesAsColorMap([0, 1], colorMap.blue)).toEqual(
    { 0: colorMap.blue, 1: colorMap.blue }
  )
})

input = "connectedPipeIndexColorMap(boardOne, [0], 3)"

test(`${input} is {1: colorMap.blue}`, () => {
  expect(
    connectedPipeIndexColorMap(boardOne, [0], 3)
  ).toEqual({ 1: colorMap.blue })
})

input = "fillFromSources(boardOne, { 1: colorMap.blue })[1].fillColor"

test(`${input} is colorMap.blue`, () => {
  expect(
    fillFromSources(boardOne, { 1: colorMap.blue })[1].fillColor
  ).toEqual(colorMap.blue)
})

test("fillConnections() output looks right", () => {
  const board = boardOne.map(pipe => ({...pipe}))
  board[6].fillColor = colorMap.blue
  const output = fillConnections(board, 3)
  expect(fillConnections(boardOne, 3)[1]).toEqual(
    { ...straightRightPipe, fillColor: colorMap.blue }
  )
  expect(output[1].fillColor).toEqual(colorMap.blue)
  expect(output[6].fillColor).toEqual(colorMap.blue)
  expect(output[3].fillColor).toEqual(colorMap.blue)
  expect(output[7].fillColor).toEqual(colorMap.blue)
})

test("singlePathBoard() output looks right", () => {
  expect(singlePathBoard(3, cornerSources)).toBeDefined()
  expect(singlePathBoard(3, cornerSources)[0].type).toEqual('cap')
  expect(singlePathBoard(3, cornerSources)[0].fillColor).toEqual(colorMap.blue)
})

test(`randomPipe() output looks right`, () => {
  const output = randomPipe()
  expect(output).toBeDefined()
  expect(output).toHaveProperty('type')
  expect(output).toHaveProperty('direction')
  expect(output).toHaveProperty('fillColor')
  expect(output.fillColor).toEqual(colorMap.white)
})

test(`randomBoard(3, cornerSources) output looks right`, () => {
  const output = randomBoard(3, cornerSources)
  const first = output[0]
  expect(output).toBeDefined()
  expect(output).toHaveLength(9)
  expect(first).toHaveProperty('type')
  expect(first).toHaveProperty('direction')
  expect(first).toHaveProperty('fillColor')
  expect(first.fillColor).toEqual(colorMap.blue)
})

test(`centerSource() output looks right`, () => {
  expect(centerSource(3)).toEqual({ 4: colorMap.blue })
  expect(centerSource(5)).toEqual({ 12: colorMap.blue })
})

test(`randomPipeType() output looks right`, () => {
  const output = randomPipeType()
  expect(output).toBeDefined()
})

test(`randomNextPipeOnBoard() output looks right`, () => {
  const board = [curveUpPipe, straightRightPipe]
  const output = randomNextPipeOnBoard(3, colorMap.blue, board)
  expect(output).toBeDefined()
})

test(`emptyPipes() output looks right`, () => {
  const output = emptyPipes(boardOne)
  expect(output).toBeDefined()
})

test(`partialConnectionIndexes() output looks right`, () => {
  const board = boardOne.map(pipe => ({...pipe}))
  const output = partialConnectionIndexes(boardOne, 3)
  board[6].fillColor = colorMap.blue
  const outputTwo = partialConnectionIndexes(board, 3)
  expect(output).toEqual([0, 1, 2, 3, 4, 5, 7, 8])
  expect(outputTwo).toEqual([0, 1, 2, 3, 4, 5, 7, 8])
})

test(`fadePartialConnections() output looks right`, () => {
  const board = boardOne.map(pipe => ({...pipe}))
  board[6].fillColor = colorMap.blue
  const output = fadePartialConnections(fillConnections(board, 3), 3)
  const outputTwo = fadePartialConnections(fillConnections(boardTwo, 3), 3)
  expect(output).toBeDefined()
  expect(output[0].fillColor).toEqual(fadedColorMap.blue)
  expect(output[1].fillColor).toEqual(fadedColorMap.blue)
  expect(output[6].fillColor).toEqual(colorMap.blue)
  expect(outputTwo).toBeDefined()
  expect(outputTwo[0].fillColor).toEqual(colorMap.blue)
  expect(outputTwo[1].fillColor).toEqual(fadedColorMap.blue)
})
