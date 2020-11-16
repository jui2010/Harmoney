import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'

import UserProfile from '../components/UserProfile'
import withStyles from '@material-ui/core/styles/withStyles'

import LoanCard from '../components/LoanCard'

import {connect} from 'react-redux'
import {getUserLoans} from '../redux/actions/dataActions' 

const styles = (theme) => ({
    ...theme.spread,
    mainGrid : {
        marginTop : '1px'
    },
    section : {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        // marginTop : '1px',
        fontWeight : 'bold',
        fontSize : '30px',
        // padding : '10px'
    },
})

class profile extends Component {

    componentDidMount(){ 
        var body = {
            "from": "bqzgvp4k5",
            "select": [
                6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24
            ],
            "where": `{20.CT.${this.props.user.authenticatedUser.email}}`,
            "sortBy": [
                {
                    "fieldId": 1,
                    "order": "ASC"
                }
            ]
        }
        this.props.getUserLoans(body)
    }

    renderAllUserLoans(){
        const { allUserLoans } = this.props.data
        return (
            allUserLoans.map(loan => <LoanCard key={loan["6"].value} loan={loan} /> )
        )
    }

    render() {
        const {classes} = this.props

        return (
            <Grid container spacing={5} className={classes.mainGrid}>

                <Grid container item={true} sm={3} >
                    <UserProfile />
                </Grid> 
                <Grid container item={true} sm={8}  style={{borderLeft: '1px solid black'}}>
                    {this.renderAllUserLoans()}
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    user : state.user,
    data : state.data
})

export default connect(mapStateToProps , {getUserLoans})(withStyles(styles)(profile))