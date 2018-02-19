import React from 'react'

import { directionToRotate, pipePropTypes } from '../../../util/pipes'

const Straight = ({ x, y, size, direction, fillColor }) => {
  const rotation = directionToRotate[direction]
  const rotationX = x + (size * 0.5)
  const rotationY = y + (size * 0.5)
  return (
    <g transform={`rotate(${rotation} ${rotationX} ${rotationY})`}>
      <path
        className={`pipe type--straight direction--${direction}`}
        fill={fillColor}
        d={`M
          ${x + (size * 0.30)},${y + (size * 0.00)}
          ${x + (size * 0.70)},${y + (size * 0.00)}
          ${x + (size * 0.70)},${y + (size * 0.15)}
          ${x + (size * 0.65)},${y + (size * 0.15)}
          ${x + (size * 0.65)},${y + (size * 0.85)}
          ${x + (size * 0.70)},${y + (size * 0.85)}
          ${x + (size * 0.70)},${y + (size * 1.00)}
          ${x + (size * 0.30)},${y + (size * 1.00)}
          ${x + (size * 0.30)},${y + (size * 0.85)}
          ${x + (size * 0.35)},${y + (size * 0.85)}
          ${x + (size * 0.35)},${y + (size * 0.15)}
          ${x + (size * 0.30)},${y + (size * 0.15)}
        Z`}
      />
    </g>
  )
}

Straight.propTypes = pipePropTypes

export default Straight
