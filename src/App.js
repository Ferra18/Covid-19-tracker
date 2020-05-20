import React from 'react'

import { Cards, Chart, Map, RegionPicker } from './components'
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
        updatedAt: null
    }

    async fetchData() {
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

        this.setState({ andamento: data, regioni: regions, updatedAt: Date.parse(fetchedNationalData[fetchedNationalData.length -1].data) })
    }

    async componentDidMount() {
        await this.fetchData()
    }

    handleSelectedRegionChange = async (region) => {
        const now = new Date()
        const diff = now - this.state.updatedAt
        console.log(diff)
        this.setState({ regioneSelezionata: region })
        if (diff >= 86400000) {     // Automatically fetch new data if data are old than one day when changing the selected region
            await this.fetchData()
        }
        
    }
    
    render() {
        const { andamento, regioneSelezionata, regioni, updatedAt } = this.state
        return (
            <div className={styles.container}>
                <img className={styles.image} src={titleImage} alt='COVID-19'/>
                <RegionPicker regions={regioni} lastUpdate={updatedAt} handleSelectedRegionChange={this.handleSelectedRegionChange}/>
                <Cards latest={andamento[regioneSelezionata].length > 0 ? andamento[regioneSelezionata].slice(-1)[0] : {}} />
                <Chart andamento={andamento[regioneSelezionata]}/>
                <Map></Map>
            </div>
        )
    }
}

export default App