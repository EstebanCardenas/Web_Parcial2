import React, { useState, useEffect } from 'react'
import TableData from './TableData'
import Barchart from './Barchart.js'
import { FormattedMessage } from 'react-intl'

function Frame() {
    const [tableData, setData] = useState([])
    const [chartData, setCharData] = useState([])

    useEffect(() => {
        if (!navigator.onLine) {
            let td = JSON.parse(localStorage.getItem("tableData"))
            let cd = JSON.parse(localStorage.getItem("chartData"))
            if (localStorage.getItem("tableData") !== null && localStorage.getItem("chartData") !== null) {
                setData(td)
                setCharData(cd)
            }
        } else {
            async function fetchData() {
                let url = ""
                const lang = navigator.language
                if (lang === "en") {
                    url = 'https://gist.githubusercontent.com/jhonatan89/2089276d3ce0faceff8e55fc3459b818/raw/30ee1a77b3e328108faaaa9aaac6f2ddaa3d3711/pokemons-en.json'
                }
                else if (lang === "es-ES" || lang === "es") {
                    url = 'https://gist.githubusercontent.com/jhonatan89/e379fadf8ed0f5381a2d8f8f3dea90c3/raw/e2bc20df02828d297f99558551e37959ac97a6f8/pokemon-es.json'
                }
                const res = await (await fetch(url)).json()
                let cData = []
                for (let obj of res) {
                    let pokemon = {}
                    pokemon["name"] = obj["name"]
                    pokemon["height"] = obj["height"]
                    cData.push(pokemon)
                }
                setData(res)
                setCharData(cData.slice())
                localStorage.setItem("tableData", JSON.stringify(res))
                localStorage.setItem("chartData", JSON.stringify(cData))
            }
            fetchData()
        }
    }, [])

    function render() {
        if (tableData.length > 0) {
            return (
                <div>
                    <h1><FormattedMessage id="wanted"/></h1>
                    <TableData
                        data={tableData}
                    />
                    <Barchart
                        data={chartData}
                    />
                </div>
            )
        } else {
            return (
                <div>
                </div>
            )
        }
    }
    return render()
}

export default Frame