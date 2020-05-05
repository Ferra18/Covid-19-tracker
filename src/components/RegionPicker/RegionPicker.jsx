import React from 'react'
import { NativeSelect, FormControl } from '@material-ui/core'

import styles from './RegionPicker.module.css'

const RegionPicker = ({ regions: regionsProp, handleSelectedRegionChange }) => {

    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue='' onChange={(e) => handleSelectedRegionChange(e.target.value)}>
                <option value='Nazionale'>Nazionale</option>
                {regionsProp.map((region, i) => <option key={i} value={region}>{region}</option>)}
            </NativeSelect>
        </FormControl>
    )
}

export default RegionPicker