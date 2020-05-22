import React from 'react'

import { Cards, Chart, Map, RegionPicker } from './components'
import styles from './App.module.css'
import { fetchNationalData, fetchRegionalData, fetchProvincialData } from './api'
import { groupBy } from './utils'

import titleImage from './images/title.png'

class App extends React.Component {

    state = {
        andamento: {
            Nazionale: []
        },
        andamentoProvince: {
            Nazionale: []
        },
        regioni: [],
        regioneSelezionata: 'Nazionale',
        updatedAt: null
    }

    async fetchData() {
        const fetchedNationalData = await fetchNationalData()
        const fetchedRegionalData = await fetchRegionalData()
        const fetchedProvincialData = await fetchProvincialData()

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

        var dataProvince = groupBy(fetchedProvincialData, 'denominazione_regione')
        let dataForNational = groupBy(fetchedRegionalData, 'denominazione_regione')
        Object.keys(dataForNational).forEach((regione) => dataForNational[regione] = dataForNational[regione].slice(-1)[0])
        dataProvince.National = Object.values(dataForNational)
        // TODO: Join Bolzano and Trento data as "Trentino-Alto Adige" - Only here!
        console.log(dataProvince)
        this.setState({ andamento: data, andamentoProvince: dataProvince, regioni: regions, updatedAt: Date.parse(fetchedNationalData[fetchedNationalData.length -1].data) })
    }

    async componentDidMount() {
        await this.fetchData()
    }

    handleSelectedRegionChange = async (region) => {
        const now = new Date()
        const diff = now - this.state.updatedAt

        this.setState({ regioneSelezionata: region })
        if (diff >= 86400000) {     // Automatically fetch new data if data are old than one day when changing the selected region
            await this.fetchData()
        }
        
    }
    
    render() {
        const { andamento, andamentoProvince, regioneSelezionata, regioni, updatedAt } = this.state
        let regionForMap = regioneSelezionata //andamentoProvince[regione].slice(-1)[0]
        const trendForMap = andamentoProvince[regioneSelezionata]
        
        // if (Object.keys(trendForMap).length > 0 && trendForMap[Object.keys(trendForMap)[0]].length > 0) {
        //    Object.keys(trendForMap).forEach((regione) => trendForMap[regione] = trendForMap[regione].slice(-1)[0])
        // }
        if (regionForMap === 'P.A. Bolzano' || regionForMap === 'P.A. Trento') {
            regionForMap = 'trentino-alto adige'
        }
        
        return (
            <div className={styles.container}>
                <img className={styles.image} src={titleImage} alt='COVID-19'/>
                <RegionPicker regions={regioni} lastUpdate={updatedAt} handleSelectedRegionChange={this.handleSelectedRegionChange}/>
                <Cards latest={andamento[regioneSelezionata].length > 0 ? andamento[regioneSelezionata].slice(-1)[0] : {}} />
                <Chart andamento={andamento[regioneSelezionata]}/>
                <Map selectedRegion={regionForMap} latest={trendForMap}></Map>
            </div>
        )
    }
}

export default App