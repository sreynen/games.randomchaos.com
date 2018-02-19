import React from 'react'

import { pipePropTypes } from '../../../util/pipes'

const Cross = ({ x, y, size, direction, fillColor }) => (
  <g>
    <path
      className={`pipe type--curve direction--${direction}`}
      fill={fillColor}
      d={`M
        ${x + (size * 0.00)},${y + (size * 0.30)}
        ${x + (size * 0.15)},${y + (size * 0.30)}
        ${x + (size * 0.15)},${y + (size * 0.35)}
        ${x + (size * 0.35)},${y + (size * 0.35)}
        ${x + (size * 0.35)},${y + (size * 0.15)}
        ${x + (size * 0.30)},${y + (size * 0.15)}
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
        ${x + (size * 0.65)},${y + (size * 0.65)}
        ${x + (size * 0.65)},${y + (size * 0.85)}
        ${x + (size * 0.70)},${y + (size * 0.85)}
        ${x + (size * 0.70)},${y + (size * 1.00)}
        ${x + (size * 0.30)},${y + (size * 1.00)}
        ${x + (size * 0.30)},${y + (size * 0.85)}
        ${x + (size * 0.35)},${y + (size * 0.85)}
        ${x + (size * 0.35)},${y + (size * 0.65)}
        ${x + (size * 0.15)},${y + (size * 0.65)}
        ${x + (size * 0.15)},${y + (size * 0.70)}
        ${x + (size * 0.00)},${y + (size * 0.70)}
      Z`}
    />
  </g>
)

Cross.propTypes = pipePropTypes

export default Cross
