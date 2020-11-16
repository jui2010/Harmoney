import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'

import {connect} from 'react-redux'
import {addNewCustomer, getMaxCustomerid, getMaxAgreementid, addNewLoanDetailAndApplication} from '../redux/actions/dataActions' 
import {getAuthenticatedUserInfo} from '../redux/actions/userActions' 

const styles = (theme) => ({
    ...theme.spread,
    mainDiv : {
        display: 'flex', 
        flexDirection : 'column',
        justifyContent:'center',
        alignItems:'center'
    },
    pageTitle : {
        margin : '20px 0px 20px auto' ,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        fontSize : '27px',
        fontWeight : 'bold',
        marginLeft : '20px'
    },
    form : {
        textAlign : 'center',
        marginLeft : '20px'

    },
    formMain : {
        backgroundColor : '#424242',
    },
    button : {
        fontFamily: 'Bebas Neue',
        fontSize : '25px',
        marginTop : '10px',
        marginBottom : '5px',
        color : 'white',
        marginLeft : '620px'
    },
    textField : {
        marginBottom : '15px',
        marginLeft : '20px',
        marginRight : '20px',
        padding : '5px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        fontSize : '15px',
        width : '400px'
    },
    section : {
        padding : '5px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        fontSize : '15px',
        fontWeight : 'bold',
        marginLeft : '20px'
    },
    root: {
        '&.Mui-focused fieldset': {
            borderColor: 'white',
        },
    },

})

class sales extends Component {

    state = {
        customerid : this.props.user.authenticatedUser.customerid,
        firstName : this.props.user.authenticatedUser.firstName,
        lastName : this.props.user.authenticatedUser.lastName,
        gender : this.props.user.authenticatedUser.gender,
        email : this.props.user.authenticatedUser.email,
        phone : this.props.user.authenticatedUser.phone,
        verificationid : this.props.user.authenticatedUser.verificationid,
        street1 : this.props.user.authenticatedUser.street1,
        street2 : this.props.user.authenticatedUser.street2,
        city : this.props.user.authenticatedUser.city,
        state : this.props.user.authenticatedUser.state,
        zipcode : this.props.user.authenticatedUser.zipcode,
        country : this.props.user.authenticatedUser.country,
        applicantType : '',
        loanAmount : '',
        purposeOfLoan : ''          
    }

    componentDidMount(){
        var body = {
            "from": "bqy73bb8e",
            "select": [
                13,14,15,16,17,18,19,7,8,9,10,11,12
            ],
            "where": `{17.CT.${this.props.user.authenticatedUser.email}}`,
            "sortBy": [
            {
                "fieldId": 1,
                "order": "ASC"
            }
            ]
        }
        this.props.getAuthenticatedUserInfo(body)
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
                "value": this.state.verificationid,
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
            }
            }
        ]

        const newApplication = [
            {
            "6": {
                "value": this.props.data.maxAgreementid + 1
            },
            "7": {
                "value": this.props.user.authenticatedUser.customerid === "" ? this.props.data.maxCustomerid + 1 : this.props.user.authenticatedUser.customerid
            },
            "8": {
                "value": this.state.applicantType
            }
            }
        ]

        const newLoanDetail = [
            {
            "6": {
                "value": this.props.data.maxAgreementid + 1
            },
            "7": {
                "value": this.state.purposeOfLoan
            },
            "10": {
                "value": this.state.loanAmount
            }
            }
        ]

        //add customer only if it is a new customer
        if(this.props.user.authenticatedUser.verificationid === "")
            this.props.addNewCustomer(newCustomer , this.props.history)
        this.props.addNewLoanDetailAndApplication(newLoanDetail, newApplication, this.props.history)
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

                <Grid item xs={12}>
                    <Typography variant="h4" className={classes.section}>
                        Personal Details
                    </Typography>
                </Grid>
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
                onChange= {this.handleChange} 
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
                value={this.props.user.authenticatedUser.gender === "" ? this.state.gender : this.props.user.authenticatedUser.gender} 
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
                value={this.props.user.authenticatedUser.email === "" ? this.state.email : this.props.user.authenticatedUser.email}  
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
                value={this.props.user.authenticatedUser.phone === "" ? this.state.phone : this.props.user.authenticatedUser.phone} 
                onChange= {this.handleChange} fullWidth 
                />
                </Grid>
                <Grid item xs={4}>
                <TextField 
                id ="verificationid" 
                name ="verificationid" 
                label="Verification ID" 
                type="text" 
                placeholder="Verification ID" 
                className={classes.textField}
                variant="outlined"
                value={this.props.user.authenticatedUser.verificationid === "" ? this.state.verificationid : this.props.user.authenticatedUser.verificationid} 
                onChange= {this.handleChange} fullWidth                         
                />
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="h4" className={classes.section}>
                        Address Details :
                    </Typography>
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
                value={this.props.user.authenticatedUser.street1 === "" ? this.state.street1 : this.props.user.authenticatedUser.street1} 
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
                value={this.props.user.authenticatedUser.street2 === "" ? this.state.street2 : this.props.user.authenticatedUser.street2} 
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
                value={this.props.user.authenticatedUser.city === "" ? this.state.city : this.props.user.authenticatedUser.city} 
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
                value={this.props.user.authenticatedUser.state === "" ? this.state.state : this.props.user.authenticatedUser.state} 
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
                value={this.props.user.authenticatedUser.zipcode === "" ? this.state.zipcode : this.props.user.authenticatedUser.zipcode} 
                onChange= {this.handleChange} fullWidth                         
                />    
                </Grid>
                <Grid item xs={4}></Grid>

                <Grid item xs={12}>
                    <Typography variant="h4" className={classes.section}>
                        Loan Details
                    </Typography>
                </Grid>
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
    user : state.user,
    data : state.data
})

export default  connect(mapStateToProps, {addNewCustomer, getMaxCustomerid, getMaxAgreementid, getAuthenticatedUserInfo, addNewLoanDetailAndApplication})(withStyles(styles)(sales))
