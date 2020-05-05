import React from 'react'
import { Card, CardContent, Typography, Grid } from '@material-ui/core'
import CountUp from 'react-countup'
import Emoji from 'react-emoji-render'
import cx from 'classnames'

import styles from './Cards.module.css'

const Cards = ({latest: {totale_positivi, dimessi_guariti, deceduti, variazione_totale_positivi, variazione_guariti, variazione_deceduti}}) => {
    if (!totale_positivi) {
        return 'Loading...'
    }
    return (
        <div className={styles.container}>
            <Grid container spacing={3} justify='center'>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.infected)}>
                    <CardContent>
                        <Typography color='textSecondary' align='right' gutterBottom>Totale positivi</Typography>
                        <Typography variant='h2'>
                            <CountUp start={0} end={totale_positivi} duration={2.5} separator='.' />
                        </Typography>
                        <Typography color='textSecondary' align='right'>
                            {variazione_totale_positivi > 0 ? (<Emoji text='⇧'/>) : (<Emoji text='⇩'/>)}
                            <CountUp start={0} end={variazione_totale_positivi} duration={2.5}  separator='.' />
                        </Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.recovered)}>
                    <CardContent>
                        <Typography color='textSecondary' align='right' gutterBottom>Guariti</Typography>
                        <Typography variant='h2'>
                            <CountUp start={0} end={dimessi_guariti} duration={2.5} separator='.' />
                        </Typography>
                        <Typography color='textSecondary' align='right'>
                            {variazione_guariti > 0 ? (<Emoji text='⇧'/>) : (<Emoji text='⇩'/>)}
                            <CountUp start={0} end={variazione_guariti} duration={2.5} separator='.' />
                        </Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.deaths)}>
                    <CardContent>
                        <Typography color='textSecondary' align='right' gutterBottom>Decessi</Typography>
                        <Typography variant='h2'>
                            <CountUp start={0} end={deceduti} duration={2.5} separator='.' />    
                        </Typography>
                        <Typography color='textSecondary' align='right'>
                            {variazione_deceduti > 0 ? (<Emoji text='⇧'/>) : (<Emoji text='⇩'/>)}
                            <CountUp start={0} end={variazione_deceduti} duration={2.5} separator='.' />
                        </Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    )
}

export default Cards