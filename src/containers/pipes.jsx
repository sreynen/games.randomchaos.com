import React from 'react'

import { intKeys, randomFromList } from '../util/general'
import {
  connectedIndexes, directionMap, directionMapReversed, pipeTypeMap,
} from '../util/pipes'
import PipesBoard from '../components/svg/pipes/board.svg'

class Pipes extends React.Component {
  constructor(props) {
    const pipeTypes = Object.keys(pipeTypeMap)
    const directions = Object.keys(directionMap)
    const pipe = (fillColor = '#ffffff') => ({
      type: pipeTypeMap[randomFromList(pipeTypes)],
      direction: directionMap[randomFromList(directions)],
      fillColor,
    })
    super(props)
    this.state = {
      pipes: [
        pipe(), pipe(), pipe(), pipe(), pipe(), pipe('#99ccff'),
        pipe(), pipe(), pipe(), pipe(), pipe(), pipe(),
        pipe(), pipe(), pipe(), pipe(), pipe(), pipe(),
        pipe(), pipe(), pipe(), pipe(), pipe(), pipe(),
        pipe(), pipe(), pipe(), pipe(), pipe(), pipe(),
        pipe(), pipe(), pipe(), pipe(), pipe(), pipe(),
      ],
      perRow: 6,
      pipeSize: 40,
      sources: {
        5: '#99ccff',
      },
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
    const newPipes = pipes.map(pipe => ({
      type: pipe.type,
      direction: pipe.direction,
      fillColor: '#ffffff',
    }))
    const uncheckedPipes = intKeys(pipes)
    let fillCheckEdges = intKeys(this.state.sources).map((index) => {
      newPipes[index].fillColor = this.state.sources[index]
      return index
    })
    // Fill everything connected to filled pipes
    while (fillCheckEdges.length > 0) {
      let newFillCheckEdges = []
      let addFillCheckEdges = []
      fillCheckEdges.forEach((edgePipe) => {
        // Mark current edge as checked
        const uncheckedIndex = uncheckedPipes.indexOf(edgePipe)
        if (uncheckedIndex > -1) {
          uncheckedPipes.splice(uncheckedIndex, 1)
        }
        // Move to next unchecked edges
        addFillCheckEdges = connectedIndexes(pipes, edgePipe, this.state.perRow)
          .filter(edge => uncheckedPipes.includes(parseInt(edge, 10)))
        // Copy fillColor from source
        addFillCheckEdges.forEach((newEdgePipe) => {
          newPipes[newEdgePipe].fillColor = newPipes[edgePipe].fillColor
        })
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
