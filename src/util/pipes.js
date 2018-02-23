import PropTypes from 'prop-types'

import { randomFromList, sortNumber } from './general'

const pipeTypeMap = {
  0: 'curve',
  1: 'straight',
  2: 'tee',
  3: 'blank',
  4: 'cross',
  5: 'cap',
}

const directionMap = {
  0: 'up',
  1: 'right',
  2: 'down',
  3: 'left',
}

const directionMapReversed = {
  up: 0,
  right: 1,
  down: 2,
  left: 3,
}

const directionToRotate = {
  up: 0,
  right: 90,
  down: 180,
  left: -90,
}

const pipeConnections = {
  'curve-up': ['up', 'right'],
  'curve-right': ['right', 'down'],
  'curve-down': ['down', 'left'],
  'curve-left': ['left', 'up'],
  'straight-up': ['up', 'down'],
  'straight-right': ['right', 'left'],
  'straight-down': ['up', 'down'],
  'straight-left': ['right', 'left'],
  'tee-up': ['left', 'right', 'down'],
  'tee-right': ['up', 'down', 'left'],
  'tee-down': ['right', 'left', 'up'],
  'tee-left': ['down', 'up', 'right'],
  'blank-up': [],
  'blank-right': [],
  'blank-down': [],
  'blank-left': [],
  'cross-up': ['left', 'right', 'up', 'down'],
  'cross-right': ['left', 'right', 'up', 'down'],
  'cross-down': ['left', 'right', 'up', 'down'],
  'cross-left': ['left', 'right', 'up', 'down'],
  'cap-up': ['up'],
  'cap-right': ['right'],
  'cap-down': ['down'],
  'cap-left': ['left'],
}

const pipeConnectionTypes = Object.keys(pipeConnections)

const pipesThatGoUp = pipeConnectionTypes.filter(
  pipeConnectionType => pipeConnections[pipeConnectionType].includes('up'),
)
const pipesThatDoNotGoUp = pipeConnectionTypes.filter(
  pipeConnectionType => !pipeConnections[pipeConnectionType].includes('up'),
)
const pipesThatGoDown = pipeConnectionTypes.filter(
  pipeConnectionType => pipeConnections[pipeConnectionType].includes('down'),
)
const pipesThatGoLeft = pipeConnectionTypes.filter(
  pipeConnectionType => pipeConnections[pipeConnectionType].includes('left'),
)
const pipesThatDoNotGoLeft = pipeConnectionTypes.filter(
  pipeConnectionType => !pipeConnections[pipeConnectionType].includes('left'),
)
const pipesThatGoRight = pipeConnectionTypes.filter(
  pipeConnectionType => pipeConnections[pipeConnectionType].includes('right'),
)
const pipesThatDoNotGoRight = pipeConnectionTypes.filter(
  pipeConnectionType => !pipeConnections[pipeConnectionType].includes('right'),
)
const pipesThatDoNotGoRightOrDown = pipeConnectionTypes.filter(
  pipeConnectionType => !(
    pipeConnections[pipeConnectionType].includes('right') ||
    pipeConnections[pipeConnectionType].includes('down')
  ),
)

const pipePropTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  direction: PropTypes.string.isRequired,
  fillColor: PropTypes.string.isRequired,
}

const maybeConnectedIndexes = (pipe, index, perRow) =>
  pipeConnections[`${pipe.type}-${pipe.direction}`]
    .reduce((currentIndexes, connection) => {
      const i = parseInt(index, 10)
      if (
        connection === 'up' &&
        i - perRow >= 0
      ) {
        return [...currentIndexes, i - perRow].sort(sortNumber)
      }
      if (
        connection === 'down' &&
        i + perRow < (perRow * perRow)
      ) {
        return [...currentIndexes, i + perRow].sort(sortNumber)
      }
      if (
        connection === 'right' &&
        (i + 1) % perRow !== 0 &&
        i < ((perRow * perRow) - 1)
      ) {
        return [...currentIndexes, i + 1].sort(sortNumber)
      }
      if (
        connection === 'left' &&
        index % perRow !== 0 &&
        index > 0
      ) {
        return [...currentIndexes, i - 1].sort(sortNumber)
      }
      return currentIndexes
    }, [])

const connectedIndexes = (pipes, index, perRow) =>
  maybeConnectedIndexes(pipes[index], index, perRow).filter(
    connected => maybeConnectedIndexes(pipes[connected], connected, perRow)
      .includes(parseInt(index, 10)),
  )

const pipeTypeKeys = Object.keys(pipeTypeMap)
const directionKeys = Object.keys(directionMap)
const randomPipeType = () => randomFromList(pipeTypeKeys)
const randomDirection = () => randomFromList(directionKeys)

const randomPipe = (fillColor = '#ffffff') => ({
  type: pipeTypeMap[randomPipeType()],
  direction: directionMap[randomDirection()],
  fillColor,
})

const centerSource = (perRow) => {
  const centerIndex = Math.floor((perRow * perRow) / 2)
  return {
    [centerIndex]: '#99ccff',
  }
}

const cornerSources = {
  0: '#99ccff',
}

const randomBoard = (perRow, sources, board = []) => {
  if (board.length === perRow * perRow) {
    return board
  }
  if (sources[board.length]) {
    return randomBoard(
      perRow,
      sources,
      [...board, randomPipe(sources[board.length])],
    )
  }
  return randomBoard(
    perRow,
    sources,
    [...board, randomPipe()],
  )
}

const removeListFromList = (originalList, removals) =>
  originalList.filter(item => !removals.includes(item))

const randomNextPipeOnBoard = (perRow, sourceColor, board) => {
  let availablePipes = Object.keys(pipeConnections)
  const index = board.length
  const isOnTop = index < perRow
  const isOnLeft = index % perRow === 0
  const isOnRight = (index + 1) % perRow === 0
  const isOnBottom = index >= perRow * (perRow - 1)
  const aboveConnects = !isOnTop &&
    maybeConnectedIndexes(board[index - perRow], index - perRow, perRow)
      .includes(index)
  const leftConnects = !isOnLeft &&
    maybeConnectedIndexes(board[index - 1], index - 1, perRow)
      .includes(index)

  // Remove pipes with impossible connections
  if (isOnTop || !aboveConnects) {
    availablePipes = removeListFromList(availablePipes, pipesThatGoUp)
  }
  if (isOnBottom) {
    availablePipes = removeListFromList(availablePipes, pipesThatGoDown)
  }
  if (isOnLeft || !leftConnects) {
    availablePipes = removeListFromList(availablePipes, pipesThatGoLeft)
  }
  if (isOnRight) {
    availablePipes = removeListFromList(availablePipes, pipesThatGoRight)
  }
  // Remove pipes missing required connections to existing pipes
  if (aboveConnects) {
    availablePipes = removeListFromList(availablePipes, pipesThatDoNotGoUp)
  }
  if (leftConnects) {
    availablePipes = removeListFromList(availablePipes, pipesThatDoNotGoLeft)
  }
  // Remove pipes that don't move toward full connection below
  if (aboveConnects || leftConnects) {
    if (isOnBottom && !isOnRight) {
      // On bottom row, force connection to right
      availablePipes = removeListFromList(
        availablePipes, pipesThatDoNotGoRight,
      )
    } else if (!isOnBottom) {
      // Above bottom row, force each segment to connect down or right
      availablePipes = removeListFromList(
        availablePipes, pipesThatDoNotGoRightOrDown,
      )
    }
  }

  const pipe = randomFromList(availablePipes).split('-')
  return {
    type: pipe[0],
    direction: pipe[1],
    fillColor: '#ffffff',
  }
}

const randomizeDirections = board =>
  board.map(pipe =>
    Object.assign(pipe, { direction: directionMap[randomDirection()] }),
  )

const singlePathBoard = (perRow, sources, board = []) => {
  if (board.length === 0) {
    return singlePathBoard(
      perRow,
      sources,
      [{
        type: 'cap',
        direction: 'right',
        fillColor: sources[0].fillColor,
      }],
    )
  }
  if (board.length === perRow * perRow) {
    return randomizeDirections(board)
  }
  return singlePathBoard(
    perRow,
    sources,
    [...board, randomNextPipeOnBoard(perRow, sources[0].fillColor, board)],
  )
}

export {
  centerSource,
  cornerSources,
  connectedIndexes,
  directionMap,
  directionMapReversed,
  directionToRotate,
  maybeConnectedIndexes,
  pipePropTypes,
  pipeTypeMap,
  randomBoard,
  randomPipe,
  singlePathBoard,
}
