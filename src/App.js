import React from 'react'

import { Cards, Chart, RegionPicker } from './components'
import styles from './App.module.css'
import { fetchNationalData, fetchRegionalData } from './api'
import { groupBy } from './utils'

import titleImage from './images/title.png'

class App extends React.Component {

    state = {
        andamento: {
            Nazionale: []
        },
        regioni: [],
        regioneSelezionata: 'Nazionale',
    }

    async componentDidMount() {
        const fetchedNationalData = await fetchNationalData()
        const fetchedRegionalData = await fetchRegionalData()
        const regions = fetchedRegionalData.filter((item) => {return item.data === fetchedRegionalData[0].data}).map((region) => region.denominazione_regione)

        var data = groupBy(fetchedRegionalData, 'denominazione_regione')
        data.Nazionale = fetchedNationalData

        for (let region in data) {
            data[region].forEach((andamentoGiornaliero, index) => {
                if (index===0) {
                    andamentoGiornaliero.variazione_guariti = 0
                    andamentoGiornaliero.variazione_deceduti = 0
                } else {
                    andamentoGiornaliero.variazione_guariti = andamentoGiornaliero.dimessi_guariti - data[region][index-1].dimessi_guariti
                    andamentoGiornaliero.variazione_deceduti = andamentoGiornaliero.deceduti - data[region][index-1].deceduti
                }
            })
        }

        this.setState({ andamento: data, regioni: regions})
    }

    handleSelectedRegionChange = async (region) => {
        this.setState({ regioneSelezionata: region })
    }
    
    render() {
        const { andamento, regioneSelezionata, regioni } = this.state
        return (
            <div className={styles.container}>
                <img className={styles.image} src={titleImage} alt='COVID-19'/>
                <Cards latest={andamento[regioneSelezionata].length > 0 ? andamento[regioneSelezionata].slice(-1)[0] : {}} />
                <RegionPicker regions={regioni} handleSelectedRegionChange={this.handleSelectedRegionChange}/>
                <Chart andamento={andamento[regioneSelezionata]}/>
            </div>
        )
    }
}

export default App