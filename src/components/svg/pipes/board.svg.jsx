import React from 'react'
import PropTypes from 'prop-types'

import ClickableSquare from '../clickable-square'
import SVG from '../svg'
import Curve from './curve.svg'
import Straight from './straight.svg'

const pipeTypeToComponent = {
  curve: Curve,
  straight: Straight,
}

const PipesBoard = ({ clickHandler, perRow, pipes, pipeSize }) => {
  const pipeList = pipes.map((pipe, index) => {
    const x = index % perRow
    const y = Math.floor(index / perRow)
    const PipeType = pipeTypeToComponent[pipe.type]
    return (
      <PipeType
        key={`${x}-${y}`}
        size={pipeSize}
        x={pipeSize * x}
        y={pipeSize * y}
        direction={pipe.direction}
        fillColor={pipe.fillColor}
      />
    )
  })
  const clickableList = pipes.map((pipe, index) => {
    const x = index % perRow
    const y = Math.floor(index / perRow)
    return (
      <ClickableSquare
        key={`${x}-${y}`}
        size={pipeSize}
        x={pipeSize * x}
        y={pipeSize * y}
        clickHandler={() => { clickHandler(x, y) }}
      />
    )
  })
  return (
    <SVG
      className="pipes-board"
      height={`${pipeSize * perRow}px`}
      width={`${pipeSize * perRow}px`}
      viewBox={`0 0 ${pipeSize * perRow} ${pipeSize * perRow}`}
    >
      {pipeList}
      {clickableList}
    </SVG>
  )
}

PipesBoard.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  perRow: PropTypes.number.isRequired,
  pipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  pipeSize: PropTypes.number.isRequired,
}

export default PipesBoard
