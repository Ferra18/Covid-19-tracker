import React, { useState, useEffect } from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import { scaleLinear } from 'd3-scale'

import styles from './Map.module.css'

const Map = ({ selectedRegion: regioneSelezionata, latest: trendForMap }) => {

    const [trend, setTrend] = useState(trendForMap)

    useEffect(() => {
        if (trendForMap) {
            setTrend(trendForMap)
        }
    }, [trendForMap])

    const mapUrl = require('../../maps/'+ regioneSelezionata.toLowerCase() +'.topojson')
    
    const width = 1200
    const height = 1200

    const colorScale = scaleLinear()
        .domain([0.29, 0.68])
        .range(["#ffedea", "#ff5233"]);

    const geoMap = (
        <ComposableMap projectionConfig={{ scale: 6000, center: [12.56738, 41.8719406] }} width={width} height={height} style={{ width: "100%", height: "auto" }}>
                <Geographies geography={mapUrl}>
                    {( {geographies} ) => 
                    geographies.map((geography, i) => {
                        //console.log(geography)
                        return (
                            <Geography 
                                key = {i} 
                                geography = {geography}
                                style = {{
                                    default: {
                                        fill: "#ECEFF1",
                                        stroke: "#607D8B",
                                        strokeWidth: 0.75,
                                        outline: "none",
                                    },
                                    hover: {
                                        fill: "#CFD8DC",
                                        stroke: "#607D8B",
                                        strokeWidth: 1,
                                        outline: "none",
                                    },
                                        pressed: {
                                        fill: "#FF5722",
                                        stroke: "#607D8B",
                                        strokeWidth: 1,
                                        outline: "none",
                                    }
                                }}
                            />
                        )}
                    )}
                </Geographies>
            </ComposableMap>
    )

    return (
        <div className={styles.mapContainer}>
            {geoMap}
            MAP
        </div>
    )
}

export default Map