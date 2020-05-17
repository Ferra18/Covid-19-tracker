import React from 'react'
import { Card, CardHeader, CardContent, NativeSelect, FormControl, Typography } from '@material-ui/core'

import styles from './RegionPicker.module.css'

const RegionPicker = ({ regions: regionsProp, lastUpdate, handleSelectedRegionChange }) => {

    var dateLastUpdate = 'Loading...'
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    if (lastUpdate) {
        const date = new Date(lastUpdate)
        dateLastUpdate = date.toLocaleString('it-IT', options)
    }

    return (
        <Card className={styles.cardContainer}>
            <CardHeader title='Covid-19 Tracker' />
            <CardContent>
                <Typography color='textSecondary' variant='body1' align='justify' gutterBottom>
                    Covid-19 Tracker è un'applicazione per tracciare l'andamento dell'infezione da coronavirus sul territorio italiano. Utilizza i dati forniti dalla protezione civile italiana, i quali vengono aggiornati giornalmente alle ore 17:00.
                </Typography>
                <Typography color='textSecondary' variant='body1' align='justify'>
                    Seleziona la regione per la quale vuoi visualizzare i dati, altrimenti seleziona 'Nazionale' per visualizzare l'andamento nazionale.
                </Typography>
                <FormControl className={styles.formControl}>
                    <NativeSelect className={styles.select} defaultValue='' onChange={(e) => handleSelectedRegionChange(e.target.value)}>
                        <option value='Nazionale'>Nazionale</option>
                        {regionsProp.map((region, i) => <option key={i} value={region}>{region}</option>)}
                    </NativeSelect>
                </FormControl>
                <Typography className={styles.lastUpdate} color='textSecondary' variant='body2' align='right'>
                    Dati aggiornati a: {dateLastUpdate}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default RegionPicker