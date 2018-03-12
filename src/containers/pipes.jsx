import React from 'react'

import {
  cornerSources, directionMap, directionMapReversed, emptyPipes,
  fillConnections, fillFromSources, singlePathBoard,
} from '../util/pipes'
import PipesBoard from '../components/svg/pipes/board.svg'

class Pipes extends React.Component {
  constructor(props) {
    const perRow = 11
    const sources = cornerSources
    super(props)
    this.state = {
      pipes: singlePathBoard(perRow, sources),
      perRow,
      pipeSize: 30,
      sources,
    }
    this.pipeClickHandler = this.pipeClickHandler.bind(this)
  }

  componentWillMount() {
    this.setState(prevState => (
      { pipes: this.updateFillColors(prevState.pipes) }
    ))
  }

  updateFillColors(pipes) {
    return fillConnections(
      fillFromSources(
        emptyPipes(pipes), this.state.sources,
      ), this.state.perRow,
    )
  }

  pipeClickHandler(x, y) {
    const pipeIndex = x + (y * this.state.perRow)
    const directionKeys = Object.keys(directionMap)
    const maxDirectionKey = directionKeys[directionKeys.length - 1]
    this.setState((prevState) => {
      const pipes = prevState.pipes.slice(0)
      const pipeDirection = prevState.pipes[pipeIndex].direction
      let directionIndex = directionMapReversed[pipeDirection]
      directionIndex += 1
      if (directionIndex > maxDirectionKey) {
        directionIndex = 0
      }
      pipes[pipeIndex].direction = directionMap[directionIndex]
      return { pipes: this.updateFillColors(pipes) }
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
