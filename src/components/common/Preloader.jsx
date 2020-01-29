import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

const Preloader = ({ varaint = 'indeterminate', size = 48, thickness = 3.6, disableShrink = true }) => {
    return <CircularProgress
        disableShrink={disableShrink}
        variant={varaint}
        size={size}
        thickness={thickness}
        style={{
            marginTop: '10px',
            margin: ' 10px auto',
            marginLeft: 'auto',
            marginRight: 'auto',
            display: 'block'
        }}
    />

}

export default Preloader