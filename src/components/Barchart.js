import React, {useState, useEffect, useRef} from 'react'
import {FormattedMessage} from 'react-intl'
import * as d3 from "d3"

function Barchart(props) {
    const canv_ref = useRef(null)
    const [drawn, setDrawn] = useState(false)

    function drawChart(data, max) {
        const canvas = d3.select(canv_ref.current)
        const width = 1000
        const height = 500
        const margin = { top:10, left:50, bottom: 40, right: 10}
        const iwidth = width - margin.left - margin.right
        const iheight = height - margin.top -margin.bottom

        const svg = canvas.append("svg")
        svg.attr("width", width)
        svg.attr("height", height)

        let g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`)

        const y = d3.scaleLinear()
            .domain([0, max])
            .range([iheight, 0])

        const x = d3.scaleBand()
            .domain(data.map(d => d["name"]))
            .range([0, iwidth])
            .padding(0.1)

        const bars = g.selectAll("rect").data(data)

        bars.enter().append("rect")
            .attr("class", "bar")
            .style("fill", "steelblue")
            .attr("x", d => x(d["name"]))
            .attr("y", d => y(d["height"]))
            .attr("height", d => iheight - y(d["height"]))
            .attr("width", x.bandwidth())
        
        g.append("g")
        .classed("x--axis", true)
        .call(d3.axisBottom(x))
        .attr("transform", `translate(0, ${iheight})`)  

        g.append("g")
        .classed("y--axis", true)
        .call(d3.axisLeft(y))
    }

    useEffect(() => {
        let data = props["data"]
        if (data.length > 0 && !drawn) {
            let max = Math.max(...data.map(e => e["height"]))
            drawChart(data, max)
            setDrawn(true)
        }
    }, [props, drawn])

    return (
        <div ref={canv_ref}>
            <h1><FormattedMessage id="chartTitle"/></h1>
        </div>
    )
}

export default Barchart