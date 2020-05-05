import axios from 'axios'

const url = 'https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/'

export const fetchNationalData = async () => {
    try {
        const { data } = await axios.get(`${url}/dpc-covid19-ita-andamento-nazionale.json`)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const fetchRegionalData = async () => {
    try {
        const { data } = await axios.get(`${url}/dpc-covid19-ita-regioni.json`)
        return data
    } catch (error) {
        console.log(error)
    }
}