import React from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'

import styles from './Map.module.css'

const Map = () => {

    //const mapUrl = '/public/regions.topojson'
    //const path = '/Users/ferra/Developer/Projects/Covid-19-tracker/src/maps/regions.topojson'
    const url = 'https://raw.githubusercontent.com/Dataninja/geo-shapes/master/italy/regions.topojson'
    
    const width = 1200
    const height = 1200

    const geoMap = (
        <ComposableMap projectionConfig={{ scale: 6000, center: [12.56738, 41.8719406] }} width={width} height={height} style={{ width: "100%", height: "auto" }}>
                <Geographies geography={url}>
                    {( {geographies} ) => 
                    geographies.map((geography, i) => {
                        console.log(geography)
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