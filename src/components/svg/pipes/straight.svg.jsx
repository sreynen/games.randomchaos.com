import React from 'react'
import PropTypes from 'prop-types'

import { directionToRotate } from '../../../util/pipes'

const Straight = ({ x, y, size, direction, fillColor }) => (
  <g transform={`rotate(${directionToRotate[direction]} ${x+(size*0.5)} ${y+(size*0.5)})`}>
    <path
      className={`pipe type--straight direction--${direction}`}
      fill={fillColor}
      d={`M
        ${x+(size*0.30)},${y+(size*0.00)}
        ${x+(size*0.70)},${y+(size*0.00)}
        ${x+(size*0.70)},${y+(size*0.15)}
        ${x+(size*0.65)},${y+(size*0.15)}
        ${x+(size*0.65)},${y+(size*0.85)}
        ${x+(size*0.70)},${y+(size*0.85)}
        ${x+(size*0.70)},${y+(size*1.00)}
        ${x+(size*0.30)},${y+(size*1.00)}
        ${x+(size*0.30)},${y+(size*0.85)}
        ${x+(size*0.35)},${y+(size*0.85)}
        ${x+(size*0.35)},${y+(size*0.15)}
        ${x+(size*0.30)},${y+(size*0.15)}
      Z`}
    />
  </g>
)

Straight.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  direction: PropTypes.string.isRequired,
  fillColor: PropTypes.string.isRequired,
}

export default Straight
