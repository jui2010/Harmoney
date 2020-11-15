import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'

import {connect} from 'react-redux'
import {addNewCustomer, getMaxCustomerid, getMaxAgreementid} from '../redux/actions/dataActions' 

const styles = (theme) => ({
    ...theme.spread,
    section : {
        padding : '20px'
    },
    mainDiv : {
        display: 'flex', 
        flexDirection : 'column',
        justifyContent:'center',
        alignItems:'center'
    },
    pageTitle : {
        margin : '20px 0px 20px auto' ,
        fontFamily: 'Bebas Neue',
        fontSize : '27px'
    },
    form : {
        textAlign : 'center'
    },
    formMain : {
        backgroundColor : '#424242',
    },
    button : {
        fontFamily: 'Bebas Neue',
        fontSize : '20px',
        marginTop : '10px',
        marginBottom : '5px'
    },
    textField : {
        // border: '1px solid black',
        // borderRadius: '4px',
        marginTop : '15px',
        marginLeft : '20px',
        marginRight : '20px',
        padding : '5px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        fontSize : '15px',
    },
    root: {
        '&.Mui-focused fieldset': {
            borderColor: 'white',
        },
    },

})

class sales extends Component {

    state = {
        applicantType : '',
        firstName : '',
        lastName : '',
        email : '',
        gender : '',
        phone : '',
        street1 : '',
        street2 : '',
        city : '',
        state : '',
        zipcode : '',
        verificationId : '',
        loanAmount : '',
        purposeOfLoan : ''          
    }

    componentDidMount(){
        this.props.getMaxAgreementid()
        this.props.getMaxCustomerid()
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const newCustomer = [
            {
            "13": {
                "value": this.props.data.maxCustomerid + 1  
            },
            "14": {
                "value": this.state.firstName,
            },
            "15": {
                "value": this.state.lastName,
            },
            "18": {
                "value": this.state.gender,
            },
            "17": {
                "value": this.state.email,
            },
            "16": {
                "value": this.state.phone,
            },
            "19": {
                "value": this.state.verificationId,
            },
            "7": {
                "value": this.state.street1,
            },
            "8": {
                "value": this.state.street2,
            },
            "9": {
                "value": this.state.city,
            },
            "10": {
                "value": this.state.state,
            },
            "11": {
                "value": this.state.zipcode,
            },
            "21": {
                "value": this.state.loanAmount,
            },
            "20": {
                "value": this.state.purposeOfLoan,
            }
            }
        ]
        this.props.addNewCustomer(newCustomer , this.props.history)
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    render() {
        const { classes } = this.props
    
        return (
        <form noValidate onSubmit ={this.handleSubmit } style={{paddingBottom: '10px'}}>
            <Grid container style={{border: '1px solid black'}} >
                <Grid item xs={12}>
                    <Typography variant="h4" className={classes.pageTitle}>
                        Apply for a loan
                    </Typography>
                </Grid>
{/* 
                    <TextField 
                        id ="agreementid" 
                        label="Agreement ID" 
                        type="text" 
                        variant="outlined"
                        className={classes.textField}
                        value={this.props.data.maxAgreementid + 1} 
                        onChange= {this.handleChange} fullWidth
                        />

                        <TextField 
                        id ="customerid" 
                        label="Customer ID" 
                        type="text" 
                        variant="outlined"
                        placeholder = "Customer ID"
                        className={classes.textField}
                        value={this.props.data.maxCustomerid + 1} 
                        onChange= {this.handleChange} fullWidth                 
                        />
                         */}
                
                <Grid item xs={4}>
                <TextField 
                id ="firstName" 
                name ="firstName" 
                label="First Name" 
                type="text" 
                variant="outlined"
                placeholder = "First Name"
                className={classes.textField}
                value={this.state.firstName} 
                onChange= {this.handleChange} fullWidth
                />
                </Grid>
                <Grid item xs={4}>
                <TextField 
                id ="lastName" 
                name ="lastName" 
                label="Last Name" 
                type="text" 
                variant="outlined"
                placeholder = "Last Name"
                className={classes.textField}
                value={this.state.lastName} 
                onChange= {this.handleChange} fullWidth 
                />
                </Grid>
                <Grid item xs={4}></Grid>
                
                <Grid item xs={4}>
                <TextField 
                id ="gender" 
                name ="gender" 
                label="Gender" 
                type="text" 
                className={classes.textField}
                variant="outlined"
                placeholder = "Gender"
                value={this.state.gender} 
                onChange= {this.handleChange} fullWidth 
                />
                </Grid>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}></Grid>

                <Grid item xs={4}>
                <TextField 
                id ="email" 
                name ="email" 
                label="Email" 
                type="email" 
                className={classes.textField}
                variant="outlined"
                placeholder = "Email"
                value={this.state.email} 
                onChange= {this.handleChange} fullWidth 
                />
                </Grid>
                <Grid item xs={4}>
                <TextField 
                id ="phone" 
                name ="phone" 
                label="Phone Number" 
                type="numeric" 
                placeholder="Phone Number" 
                variant="outlined"
                className={classes.textField}
                value={this.state.phone} 
                onChange= {this.handleChange} fullWidth 
                />
                </Grid>
                <Grid item xs={4}>
                <TextField 
                id ="verificationId" 
                name ="verificationId" 
                label="Verification ID" 
                type="text" 
                placeholder="Verification ID" 
                className={classes.textField}
                variant="outlined"
                value={this.state.verificationId} 
                onChange= {this.handleChange} fullWidth                         
                />
                </Grid>

                <Grid item xs={4}>
                <TextField 
                id ="street1" 
                name ="street1" 
                label="Address - Street1" 
                type="text" 
                placeholder="Address - Street1" 
                className={classes.textField}
                variant="outlined"
                value={this.state.street1} 
                onChange= {this.handleChange} fullWidth                         
                />
                </Grid>
                <Grid item xs={4}>
                <TextField 
                id ="street2" 
                name ="street2" 
                label="Address - Street1" 
                type="text" 
                placeholder="Address - Street2" 
                className={classes.textField}
                variant="outlined"
                value={this.state.street2} 
                onChange= {this.handleChange} fullWidth                         
                />
                </Grid>
                <Grid item xs={4}>
                <TextField 
                id ="city" 
                name ="city" 
                label="City" 
                type="text" 
                placeholder="City" 
                className={classes.textField}
                variant="outlined"
                value={this.state.city} 
                onChange= {this.handleChange} fullWidth                         
                />
                </Grid>

                <Grid item xs={4}>
                <TextField 
                id ="state" 
                name ="state" 
                label="State" 
                type="text" 
                placeholder="State" 
                className={classes.textField}
                variant="outlined"
                value={this.state.state} 
                onChange= {this.handleChange} fullWidth                         
                />
                </Grid>
                <Grid item xs={4}>
                <TextField 
                id ="zipcode" 
                name ="zipcode" 
                label="Zipcode" 
                type="text" 
                placeholder="Zipcode" 
                className={classes.textField}
                variant="outlined"
                value={this.state.zipcode} 
                onChange= {this.handleChange} fullWidth                         
                />    
                </Grid>
                <Grid item xs={4}></Grid>

                <Grid item xs={4}>
                <TextField 
                id ="applicantType" 
                name ="applicantType" 
                label="Applicant Type" 
                type="text"
                variant="outlined"
                className={classes.textField}
                placeholder = "Applicant Type"
                value={this.state.applicantType} 
                onChange= {this.handleChange} fullWidth 
                />
                </Grid>
                <Grid item xs={4}>
                <TextField 
                id ="purposeOfLoan" 
                name ="purposeOfLoan" 
                label="Purpose of Loan" 
                type="text" 
                placeholder="Purpose of Loan" 
                className={classes.textField}
                variant="outlined"
                value={this.state.typeOfLoan} 
                onChange= {this.handleChange} fullWidth                         
                />
                </Grid>
                <Grid item xs={4}>
                <TextField 
                id ="loanAmount" 
                name ="loanAmount" 
                label="Loan Amount" 
                type="numeric" 
                placeholder="Requested Loan Amount" 
                className={classes.textField}
                variant="outlined"
                value={this.state.loanAmount} 
                onChange= {this.handleChange} fullWidth                         
                />
                </Grid>             
                
                <Button type="submit" variant="contained" color="secondary" className={classes.button}>
                    Submit
                </Button>
                <br />
            </Grid>  
        </form>
        )
    }
}

const mapStateToProps = (state) => ({
    data : state.data
})

export default  connect(mapStateToProps, {addNewCustomer, getMaxCustomerid, getMaxAgreementid})(withStyles(styles)(sales))
