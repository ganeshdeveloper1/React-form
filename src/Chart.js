import React from 'react'
import { useEffect, useRef, useState } from 'react'
import './chart.scss'
import * as d3 from 'd3'

const Barchart = () => {
  const getRandom = () => {
    return Math.ceil(Math.random() * 99)
  }

  const [sample, setSample] = useState([
    { category: 'A', quantity: getRandom() },
    { category: 'B', quantity: getRandom() },
    { category: 'C', quantity: getRandom() },
    { category: 'D', quantity: getRandom() },
    { category: 'E', quantity: getRandom() },
    { category: 'F', quantity: getRandom() },
  ])

  const d3Chart = useRef()
  // Ref for updating dimension
  const [dimensions, setDimensions] = useState({
    width: '100%',
    height: '400px',
  })
  // Ref for resize event update
  const update = useRef(false)

  const updateGraph = () => {
    setSample([
      { category: 'A', quantity: getRandom() },
      { category: 'B', quantity: getRandom() },
      { category: 'C', quantity: getRandom() },
      { category: 'D', quantity: getRandom() },
      { category: 'E', quantity: getRandom() },
      { category: 'F', quantity: getRandom() },
    ])
  }
  useEffect(() => {
    const handleChange = () => {
      setDimensions({
        width: '150px',
        height: '400px',
      })
    }
    // Listen for any resize event update
    window.addEventListener('resize', handleChange)
    // If resize, remove the previous chart
    if (update.current) {
      d3.selectAll('g').remove()
    } else {
      update.current = true
    }
    // Draw chart using the data and updated dimensions
    DrawChart(sample, dimensions)

    return () => window.removeEventListener('resize', handleChange)
  }, [dimensions, sample])

  const margin = { top: 50, right: 30, bottom: 17, left: 60 }

  function DrawChart(data, dimensions) {
    const chartwidth = 600
    const chartheight = 400

    const svg = d3
      .select(d3Chart.current)
      .attr('width', chartwidth + margin.left + margin.right)
      .attr('height', chartheight + margin.top + margin.bottom)

    // x scale
    const x = d3
      .scaleBand()
      .domain(d3.range(data.length))
      .range([margin.left, chartwidth - margin.right])
      .padding(0.1)

    svg
      .append('g')
      .attr('transform', 'translate(0,' + chartheight + ')')
      .call(
        d3
          .axisBottom(x)
          .tickFormat((i) => data[i].category)
          .tickSizeOuter(0)
      )

    const max = d3.max(data, function (d) {
      return d.quantity
    })

    // y scale
    const y = d3.scaleLinear().domain([0, max]).range([chartheight, margin.top])

    svg
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',0)')
      .call(d3.axisLeft(y))

    // Draw bars
    svg
      .append('g')
      .attr('fill', '#4CD7D0')
      .selectAll('rect')
      .data(data)
      .join('rect')
      .attr('x', (d, i) => x(i))
      .attr('y', (d) => y(d.quantity))
      .attr('height', (d) => y(0) - y(d.quantity))
      .attr('width', x.bandwidth())
  }

  return (
    <div id='barChart'>
      <h3 className='header'>Bar Chart</h3>
      <svg ref={d3Chart}></svg>

      <button onClick={updateGraph}>Generate</button>
    </div>
  )
}

export default Barchart
