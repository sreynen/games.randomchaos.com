import React from 'react'

import { intKeys } from '../util/general'
import {
  connectedIndexes, copyPipeColor, cornerSources, directionMap,
  directionMapReversed, emptyPipes, singlePathBoard, uncheckedConnectedIndexes
} from '../util/pipes'
import { removeListFromList } from '../util/general'
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
    // Empty all pipes
    let newPipes = emptyPipes(pipes)
    let uncheckedPipes = intKeys(pipes)
    let fillCheckEdges = intKeys(this.state.sources).map((index) => {
      newPipes[index].fillColor = this.state.sources[index]
      return index
    })
    // Fill everything connected to filled pipes
    while (fillCheckEdges.length > 0) {
      let newFillCheckEdges = []
      let addFillCheckEdges = []
      fillCheckEdges.forEach((edgePipe) => {
        uncheckedPipes = removeListFromList(uncheckedPipes, [edgePipe])
        addFillCheckEdges = uncheckedConnectedIndexes(
          pipes, edgePipe, this.state.perRow, uncheckedPipes,
        )
        newPipes = copyPipeColor(newPipes, edgePipe, addFillCheckEdges)
        newFillCheckEdges = newFillCheckEdges.concat(addFillCheckEdges)
      })
      fillCheckEdges = newFillCheckEdges
    }
    return newPipes
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
