import React from 'react'

import { randomFromList } from '../util/general'
import { directionMap, directionMapReversed, pipeTypeMap } from '../util/pipes'
import PipesBoard from '../components/svg/pipes/board.svg'

class Pipes extends React.Component {
  constructor(props) {
    const pipeTypes = Object.keys(pipeTypeMap)
    const directions = Object.keys(directionMap)
    const pipe = () => ({
      'type': pipeTypeMap[randomFromList(pipeTypes)],
      'direction': directionMap[randomFromList(directions)],
    })
    super(props)
    this.state = {
      pipes: [
        pipe(), pipe(), pipe(), pipe(), pipe(), pipe(),
        pipe(), pipe(), pipe(), pipe(), pipe(), pipe(),
        pipe(), pipe(), pipe(), pipe(), pipe(), pipe(),
        pipe(), pipe(), pipe(), pipe(), pipe(), pipe(),
        pipe(), pipe(), pipe(), pipe(), pipe(), pipe(),
        pipe(), pipe(), pipe(), pipe(), pipe(), pipe(),
      ],
      perRow: 6,
      pipeSize: 40,
    }
    this.pipeClickHandler = this.pipeClickHandler.bind(this)
  }

  pipeClickHandler(x, y) {
    const pipeIndex = x + (y * this.state.perRow)
    const directionKeys = Object.keys(directionMap)
    const maxDirectionKey = directionKeys[directionKeys.length - 1]
    this.setState((prevState, props) => {
      const pipes = prevState.pipes.slice(0)
      let directionIndex = directionMapReversed[prevState.pipes[pipeIndex].direction]
      directionIndex++
      if (directionIndex > maxDirectionKey) {
        directionIndex = 0
      }
      pipes[pipeIndex].direction = directionMap[directionIndex]
      return {pipes: pipes}
    })
  }

  render() {
    return (
      <PipesBoard
        perRow={this.state.perRow}
        pipeSize={this.state.pipeSize}
        pipes={this.state.pipes}
        clickHandler={this.pipeClickHandler}
      />
    )
  }
}

export default Pipes
