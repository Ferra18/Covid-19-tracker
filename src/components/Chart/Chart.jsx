import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import { Grid } from '@material-ui/core'

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
            }} options={{
                scales: {
                    xAxes: [{
                        ticks: {
                            autoSkip: true,
                            autoSkipPadding: 30
                        }
                    }]
                }
            }}
        />) : null
    )

    const lineChartVariation = (
        andamento.length ?
        (<Line 
            data={{
                labels: andamento.map(({ data }) => new Date(data).toLocaleDateString()),
                datasets: [{
                    data: andamento.map(({ nuovi_positivi }) => nuovi_positivi),
                    label: 'Nuovi positivi',
                    borderColor: 'rgba(255, 170, 0, 0.5)',
                    backgroundColor: 'rgba(255, 170, 0, 0.1)',
                    fill: true
                }, {
                    data: andamento.map(({ variazione_deceduti }) => variazione_deceduti),
                    label: 'Nuovi decessi',
                    hidden: true,
                    borderColor: 'rgba(194, 194, 194, 0.5)',
                    backgroundColor: 'rgba(194, 194, 194, 0.1)',
                    fill: true
                }]
            }} options={{
                legend: {
                    onClick: function(e, legendItem) {
                        var index = legendItem.datasetIndex;
                        var ci = this.chart;

                        ci.data.datasets.forEach(function(e, i) {
                          var meta = ci.getDatasetMeta(i);
              
                          if (i !== index) {
                            if (!meta.hidden) {
                              meta.hidden = meta.hidden === null ? !meta.hidden : true;
                            } else if (meta.hidden) {
                              meta.hidden = true;
                            }
                          } else if (i === index) {
                            meta.hidden = false;
                          }
                        });
              
                        ci.update();
                      }
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            autoSkip: true,
                            autoSkipPadding: 30
                        }
                    }]
                }
            }}
        />) : null
    )

    return (
        <div className={styles.container}>
            <Grid container spacing={3} justify='center'>
                <Grid item xs={12} md={6}>
                    {lineChart}
                </Grid>
                <Grid item xs={12} md={6}>
                    {lineChartVariation}
                </Grid>
            </Grid>
        </div>
    )
}

export default Chart