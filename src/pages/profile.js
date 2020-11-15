import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'

import UserProfile from '../components/UserProfile'
import withStyles from '@material-ui/core/styles/withStyles'

import {connect} from 'react-redux'

const styles = (theme) => ({
    ...theme.spread,
    mainGrid : {
        marginTop : '1px'
    }
})

class profile extends Component {
    render() {
        const {classes} = this.props
        return (
            <Grid container spacing={5} className={classes.mainGrid}>

                <Grid container item={true} sm={3} >
                    <UserProfile />
                </Grid> 

                <Grid container item={true} sm={4}  style={{border: '1px solid black'}}>
                </Grid>
            </Grid>
        )
    }
}

export default connect(null )(withStyles(styles)(profile))