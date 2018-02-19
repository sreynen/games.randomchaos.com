import PropTypes from 'prop-types'

import { sortNumber } from './general'

const pipeTypeMap = {
  0: 'curve',
  1: 'straight',
  2: 'tee',
  3: 'blank',
  4: 'cross',
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
}

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

export {
  connectedIndexes,
  directionMap,
  directionMapReversed,
  directionToRotate,
  maybeConnectedIndexes,
  pipePropTypes,
  pipeTypeMap,
}
