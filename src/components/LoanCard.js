import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import CallReceivedIcon from '@material-ui/icons/CallReceived'

import {connect} from 'react-redux'


const styles = (theme) => ({
    ...theme.spread,
    mainDiv : {
        marginLeft : '15px',
        width: theme.spacing(25),
    },
    schedule : {
        marginRight: '10px',
        padding: '5px 30px' 
    },
    paper: {
        width: '100%',
        marginBottom: '5px',
        padding: '3px'
    }
})

class LoanCard extends Component {

    state={
    }

    render() {
        const {classes} = this.props

        return (
            <Paper elevation={3} className={classes.paper} >                  
                <Grid container direction="row">
                    <Grid container item sm={3} >
                        <CallReceivedIcon/>
                        
                    </Grid> 
                    <Grid container item sm={7} className={classes.schedule} >
                        {this.props.loan["6"].value}
                    </Grid>

                </Grid>
            </Paper>
        )
    }
}

const mapStateToProps = (state) => ({
    user : state.user
})

export default connect(mapStateToProps, {} )(withStyles(styles)(LoanCard))