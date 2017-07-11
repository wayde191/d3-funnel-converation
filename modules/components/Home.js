import React from 'react'
import Title from 'react-title-component'
import * as d3 from 'd3'
import D3Funnel from 'd3-funnel'

export default React.createClass({

  getInitialState: function () {
    this.funnelHeight = 500
    this.funnelCellGap = 20
    this.data = [
      [ 'Teal', 12000, '#008080' ],
      [ 'Byzantium', 4000, '#702963' ],
      [ 'Byzantium', 2000, '#21ff45' ],
      [ 'Persimmon', 2500, '#ff634d' ],
      [ 'Azure', 1500, '#007fff' ]
    ]
    this.options = {
      chart: {
        width: 300,
        height: 500,
        bottomWidth: 4 / 8
      },
      block: {
        minHeight: 25
      },
      label: {
        format: '{l}\n{f}'
      }
    }

    return { data: [] }
  },

  getCellHeight: function () {
    let cellCount = this.data.length
    return (this.funnelHeight - cellCount * this.funnelCellGap) / cellCount
  },

  addGap: function (point) {
    const pointArr = point.split(',')
    let y = pointArr[1]

    pointArr[1] = parseInt(y) - 20 + ''
    return pointArr.join(',')
  },

  getShortPath: function (pathStr) {
    const pathArr = pathStr.split(' ')
    let rightBottom = pathArr[2]
    let leftBottom = pathArr[3]
    pathArr[2] = this.addGap(rightBottom)
    pathArr[3] = this.addGap(leftBottom)

    return pathArr.join(' ')
  },

  componentDidMount: function () {
    let chart = new D3Funnel('#funnel')
    chart.draw(this.data, this.options)

    let self = this
    d3.selectAll('#funnel path')[0].forEach(function (path) {
      path.setAttribute('d', self.getShortPath(path.getAttribute('d')))
    })
    d3.selectAll('#funnel text')[0].forEach(function (path) {
      path.setAttribute('y', parseInt(path.getAttribute('y')) - 10)
    })


  },

  render() {
    const container = { width: '960px', margin: '0 auto', backgroundColor: '#3e2566' }
    const svgFunnel = { display: 'inline-block' }
    const beginToOffer = { width: '100px', display: 'inline-block', backgroundColor: '#999' }

    const nextStageBlock = { width: '260px', display: 'inline-block', backgroundColor: '#6b2822' }
    const nextStage = { width: '500px', height: this.funnelHeight + 'px', display: 'inline-block', backgroundColor: '#17996b' }
    const absolute = { width: '960px', position: 'absolute' }

    const lineCell = { width: '400px', height: this.getCellHeight() + 'px', backgroundColor: '#6b062c' }
    const gapCell = { width: '400px', height: '20px', backgroundColor: '#36186b' }

    const line = { width: '300px', height: this.getCellHeight() / 2 + 'px', float: 'left', borderBottom: '1px solid black' }
    const lineContent = { float: 'left', paddingLeft: '10px', lineHeight: this.getCellHeight() + 'px', height: this.getCellHeight() + 'px' }

    const relative = { position: 'relative' }

    return (
      <div>
        <Title render={prev => `${prev} | Home`}/>
        <p>Home!</p>

        <div style={container}>

          <div style={absolute}>
            <div style={nextStageBlock}></div>
            <div style={nextStage}>
              <div style={lineCell}>
                <div style={line}></div>
                <div style={lineContent}>
                  50%
                </div>
              </div>
              <div style={gapCell}>hello</div>
              <div style={lineCell}>hello</div>
              <div style={gapCell}>hello</div>
              <div style={lineCell}>hello</div>
              <div style={gapCell}>hello</div>
              <div style={lineCell}>hello</div>
              <div style={gapCell}>hello</div>
              <div style={lineCell}>hello</div>
              <div style={gapCell}>hello</div>
            </div>
          </div>

          <div style={relative}>
            <div style={beginToOffer}>hello</div>
            <div style={svgFunnel} id="funnel"></div>
          </div>

        </div>

      </div>

    )
  }
})

