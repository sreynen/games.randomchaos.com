import PropTypes from 'prop-types'
import React from 'react'

const SVG = ({ children, className, width, height, viewBox }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    version="1.1"
    width={width}
    height={height}
    viewBox={viewBox}
  >
    {children}
  </svg>
)

SVG.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  className: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  viewBox: PropTypes.string,
}

SVG.defaultProps = {
  width: '50px',
  height: '50px',
  viewBox: '0 0 100 100',
}

export default SVG
