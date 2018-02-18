import React from 'react'
import PropTypes from 'prop-types'

import { directionToRotate } from '../../../util/pipes'

const Curve = ({ x, y, size, direction, fillColor }) => {
  const rotation = directionToRotate[direction]
  const rotationX = x + (size * 0.5)
  const rotationY = y + (size * 0.5)
  return (
    <g transform={`rotate(${rotation} ${rotationX} ${rotationY})`}>
      <path
        className={`pipe type--curve direction--${direction}`}
        fill={fillColor}
        d={`M
          ${x + (size * 0.30)},${y + (size * 0.00)}
          ${x + (size * 0.70)},${y + (size * 0.00)}
          ${x + (size * 0.70)},${y + (size * 0.15)}
          ${x + (size * 0.65)},${y + (size * 0.15)}
          ${x + (size * 0.65)},${y + (size * 0.35)}
          ${x + (size * 0.85)},${y + (size * 0.35)}
          ${x + (size * 0.85)},${y + (size * 0.30)}
          ${x + (size * 1.00)},${y + (size * 0.30)}
          ${x + (size * 1.00)},${y + (size * 0.70)}
          ${x + (size * 0.85)},${y + (size * 0.70)}
          ${x + (size * 0.85)},${y + (size * 0.65)}
          ${x + (size * 0.35)},${y + (size * 0.65)}
          ${x + (size * 0.35)},${y + (size * 0.15)}
          ${x + (size * 0.30)},${y + (size * 0.15)}
        Z`}
      />
    </g>
  )
}

Curve.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  direction: PropTypes.string.isRequired,
  fillColor: PropTypes.string.isRequired,
}

export default Curve
