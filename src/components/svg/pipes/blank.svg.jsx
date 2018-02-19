import React from 'react'

import { pipePropTypes } from '../../../util/pipes'

const Blank = ({ x, y, size, direction, fillColor }) => (
  <g>
    <path
      className={`pipe type--curve direction--${direction}`}
      fill={fillColor}
      d={`M
        ${x + (size * 0.35)},${y + (size * 0.35)}
        ${x + (size * 0.35)},${y + (size * 0.65)}
        ${x + (size * 0.65)},${y + (size * 0.65)}
        ${x + (size * 0.65)},${y + (size * 0.35)}
      Z`}
    />
  </g>
)

Blank.propTypes = pipePropTypes

export default Blank
