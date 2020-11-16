import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Dialog from '@material-ui/core/Dialog'

import CallReceivedIcon from '@material-ui/icons/CallReceived'

import {connect} from 'react-redux'
import {getUserCashflow} from '../redux/actions/dataActions' 

const styles = (theme) => ({
    ...theme.spread,
    allLoans : {
        padding: '5px' 
    },
    paper: {
        width: '600px',
        height: '50px',
        // marginBottom: '5px',
        padding: '3px',
        backgroundColor : '#f2f4f2'
    },
    mainGrid : {
        padding: '30px',
        backgroundColor : '#f2f4f2'
    },
    section : {
        backgroundColor : 'white',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        marginTop : '1px',
        fontWeight : 'bold',
        fontSize : '16px',
        padding : '10px'
    },
    section1 : {
        backgroundColor : '#5d189e',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        // marginTop : '10px',
        fontWeight : 'bold',
        fontSize : '16px',
        color : 'white'
    },
    val : {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        // marginTop : '10px',
        // fontWeight : 'bold',
        fontSize : '25px'
    },
    val1 : {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        fontWeight : 'bold',
        fontSize : '25px',
        color: 'white'
    },
    heading : {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        fontWeight : 'bold',
        fontSize : '16px',
        color : '#3a3c3a'
    },
    heading1 : {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        fontWeight : 'bold',
        fontSize : '17px',
        color : '#fbfffb'
    },
    ld: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        fontWeight : 'bold',
        fontSize : '30px'
    },
    sec : {
        // padding: '10px',
        fontSize : '22px'
    },
    tab_head : {
        backgroundColor : '#f2f4f2'
    },
    status : {
        color : 'white',
        padding : '3px 15px',
        borderRadius : '3px'
    }
})

class LoanCard extends Component {

    state = {
        open : false
    }

    handleClickOpen = () => {
        this.setState({
            open : true
        })
    }

    handleClose = () => {
        this.setState({
            open : false
        })
    }

    renderCashflow(){
        const {allUserCashflow} = this.props.data
        
        var body_cf = {
            "from": "bqy8u4dc9",
            "select": [
                6,8,9,10,18
            ],
            "where": `{6.CT.${this.props.loan["6"].value}}`,
            "sortBy": [
                {
                    "fieldId": 9,
                    "order": "DESC"
                }
            ],
            "options": {
              "skip": 0,
              "top": 12,
              "compareWithAppLocalTime": false
            }
        }
        this.props.getUserCashflow(body_cf)

        return allUserCashflow.map((cf) => 
            <Grid container item xs={12} style={{color : '#494b49'}} >
                <Grid item xs={4}> {cf["9"].value}</Grid> 
                <Grid item xs={4}> ${Math.round(cf["8"].value,0)}</Grid>  
                <Grid item xs={4} style={{color: cf["18"].value === "2020-11-01" ? '#43ad37' : '#aeb5b5'}}>
                    Pay Now
                </Grid>  
            </Grid>
        )
    }

    render() {
        const {classes, loan} = this.props

        return (
            <Fragment>
                <div className={classes.section} style={{width : '500px', fontSize: '35px'}}>
                    All Loan Requests
                </div>
                <Paper elevation={1} className={classes.paper} onClick={this.handleClickOpen}>                  
                    <Grid container >
                        <Grid container item sm={3} >
                            <CallReceivedIcon/>
                        </Grid> 
                        <Grid container item sm={7} className={classes.allLoans} >
                            {loan["12"].value}
                        </Grid>
                        <Grid container item sm={2} className={classes.status} style={{backgroundColor : loan["21"].value === null ? "#e2cc50" : "#43ad37"}} >
                            {loan["21"].value === null ? "Pending" : "Disbursed" }
                        </Grid>
                    </Grid>
                </Paper>
                
                <Dialog fullWidth onClose={this.handleClose} open={this.state.open} maxWidth="md">
                    <Grid container className={classes.mainGrid} >
                        <Grid container item xs={12} className={classes.ld} alignItems="center" justify="center">
                            <Grid item>
                                Loan Details ({loan["12"].value})
                            </Grid>
                        </Grid>

                        <Grid container item xs={4} className={classes.section}  alignItems="center" justify="center">
                            <Grid item className={classes.sec} >
                                <div className={classes.val}>$ {loan["11"].value}</div> 
                                <div className={classes.heading}>Loan Amount</div>
                            </Grid>
                        </Grid>
                        <Grid container item xs={4} className={classes.section}  alignItems="center" justify="center" style={{borderRight : '1px solid #c8ccc8', borderLeft : '1px solid #c8ccc8'}}>
                            <Grid item className={classes.sec} >
                                <div className={classes.val}>{loan["14"].value * 100} % for {loan["13"].value} months</div> 
                                <div className={classes.heading}>Interest Rate</div>
                            </Grid>
                        </Grid>
                        <Grid container item xs={4} className={classes.section}  alignItems="center" justify="center">
                            <Grid item className={classes.sec} >
                                <div className={classes.val}>$ {Math.ceil(loan["21"].value)}</div> 
                                <div className={classes.heading}>EMI per month</div>
                            </Grid>
                        </Grid>

                        <Grid container item xs={4} className={classes.section1} direction="column" alignItems="center" justify="center" style={{borderRight : '1px solid #c8ccc8'}}>
                            <Grid item className={classes.sec} style={{padding: '30px 5px'}}>
                                <div className={classes.val1} style={{marginLeft : '25px'}} >{loan["6"].value}</div> 
                                <div className={classes.heading1} style={{padding : '30px auto'}}>Agreement Id</div>
                            </Grid>
                            <Grid item className={classes.sec} style={{borderTop : '1px solid #fbfffb', padding: '30px 5px'}}>
                                <div className={classes.val1} style={{marginLeft : '80px'}} >$ {Math.ceil(loan["24"].value)}</div> 
                                <div className={classes.heading1}>Outstanding Principal Amount</div>
                            </Grid>
                        </Grid>

                        <Grid container item xs={8} className={classes.section}  alignItems="center" justify="center">
                            <Grid container item className={classes.sec} xs={12} >
                                Payment History for the past 12 months
                            </Grid>
                            <Grid item xs={4} className={classes.tab_head}> Payment Date</Grid> 
                            <Grid item xs={4} className={classes.tab_head}> Amount Collected</Grid>  
                            <Grid item xs={4} className={classes.tab_head}> &nbsp;</Grid>  
                                {this.renderCashflow()}
                        </Grid>

                    </Grid>
                </Dialog>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    data : state.data
})

export default connect(mapStateToProps, {getUserCashflow} )(withStyles(styles)(LoanCard))