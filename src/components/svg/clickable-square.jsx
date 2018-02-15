import React from 'react'
import PropTypes from 'prop-types'

const ClickableSquare = ({ size, x, y, clickHandler }) => (
  <rect
    className="transparent"
    x={x}
    y={y}
    width={size}
    height={size}
    onClick={clickHandler}
  />
)

ClickableSquare.propTypes = {
  size: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  clickHandler: PropTypes.func.isRequired,
}

export default ClickableSquare
