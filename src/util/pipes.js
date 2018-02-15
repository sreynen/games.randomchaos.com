const pipeTypeMap = {
  0: 'curve',
  1: 'straight',
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

export {
  pipeTypeMap,
  directionMap,
  directionMapReversed,
  directionToRotate,
}
