import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'

import styles from './Chart.module.css'

const Chart = ({andamento: andamentoProp}) => {
    const [andamento, setAndamento] = useState(andamentoProp)

    useEffect(() => {
        if (andamentoProp) {
            setAndamento(andamentoProp)
        }
    }, [andamentoProp])

    const lineChart = (
        andamento.length ?
        (<Line 
            data={{
                labels: andamento.map(({ data }) => new Date(data).toLocaleDateString()),
                datasets: [{
                    data: andamento.map(({ totale_positivi }) => totale_positivi),
                    label: 'Totale positivi',
                    borderColor: 'rgba(255, 170, 0, 0.5)',
                    fill: false
                }, {
                    data: andamento.map(({ dimessi_guariti }) => dimessi_guariti),
                    label: 'Guariti',
                    borderColor: 'rgba(76, 230, 0, 0.5)',
                    //backgroundColor: 'rgba(0, 255, 0, 0.5)',
                    fill: false
                }, {
                    data: andamento.map(({ deceduti }) => deceduti),
                    label: 'Decessi',
                    borderColor: 'rgba(194, 194, 194, 0.5)',
                    backgroundColor: 'rgba(194, 194, 194, 0.5)',
                    fill: false
                }]
            }}
        />) : null
    )

    return (
        <div className={styles.container}>
            {lineChart}
        </div>
    )
}

export default Chart