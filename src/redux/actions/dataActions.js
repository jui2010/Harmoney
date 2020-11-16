import {ADD_NEW_CUSTOMER , GET_MAX_AGREEMENTID, GET_MAX_CUSTOMERID, SET_ALL_USER_LOANS} from '../types'
const { REACT_APP_QB_USER_TOKEN, REACT_APP_QB_REALM } = process.env;

var headers = {
    'QB-Realm-Hostname': REACT_APP_QB_REALM,
    'Authorization': `QB-USER-TOKEN ${REACT_APP_QB_USER_TOKEN}`,
    'Content-Type': 'application/json'
}

//insert new customer in database
export const addNewCustomer = (newCustomer, history) => (dispatch) => {

    var body = {"to":"bqy73bb8e",
                "data": newCustomer
                }
    
    fetch('https://api.quickbase.com/v1/records',
        {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
        })
        .then(res => {
            if (res.ok) {
                return res.json().then(res => {
                    dispatch({
                        type : ADD_NEW_CUSTOMER
                    })
                })
            }
            return res.json().then(resBody => Promise.reject({status: res.status, ...resBody}))
        })
        .catch(err => console.log(err))
}


//insert new loan_detail and application in database
export const addNewLoanDetailAndApplication = (newLoanDetail, newApplication, history) => (dispatch) => {

    var body_loan_detail = {"to":"bqy73d4sz",
                "data": newLoanDetail
                }

    var body_app = {"to":"bqzgvp4k5",
                "data": newApplication
                }
    
    fetch('https://api.quickbase.com/v1/records',
        {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body_loan_detail)
        })
    .then(res => {
        if (res.ok) {

            dispatch({
                type : "ADD_LOAN_DETAIL"
            })

            fetch('https://api.quickbase.com/v1/records',
                {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body_app)
                })
            .then(res => {
                dispatch({
                    type : "ADD_NEW_APPLICATION"
                })
    
                history.push('/')
                return res.json().then(res => console.log(res))

            })         
        }
        return res.json().then(resBody => Promise.reject({status: res.status, ...resBody}))
    })
    .catch(err => console.log(err))
}

//get max agreementid from Loan_details table
export const getMaxAgreementid = () => (dispatch) => {
    var headers = {
        'QB-Realm-Hostname': REACT_APP_QB_REALM,
        'Authorization': `QB-USER-TOKEN ${REACT_APP_QB_USER_TOKEN}`,
        'Content-Type': 'application/json'
    }
    
    var body = {"from":"bqy73d4sz","select":[6],"sortBy":[{"fieldId":6,"order":"DESC"}],"options":{"skip":0,"top":1,"compareWithAppLocalTime":false}}

    fetch('https://api.quickbase.com/v1/records/query',
        {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        })
        .then(res => {
            if (res.ok) {
                return res.json().then(res => {
                    dispatch({
                        type : GET_MAX_AGREEMENTID,
                        payload : res.data[0]["6"].value
                    })
                })
            }
            return res.json().then(resBody => Promise.reject({status: res.status, ...resBody}))
        })
        .catch(err => console.log(err))
}



//get max customerid from customers table
export const getMaxCustomerid = () => (dispatch) => {
    var headers = {
        'QB-Realm-Hostname': REACT_APP_QB_REALM,
        'Authorization': `QB-USER-TOKEN ${REACT_APP_QB_USER_TOKEN}`,
        'Content-Type': 'application/json'
    }
    
    var body = {"from":"bqy73bb8e","select":[13],"sortBy":[{"fieldId":13,"order":"DESC"}],"options":{"skip":0,"top":1,"compareWithAppLocalTime":false}}

    fetch('https://api.quickbase.com/v1/records/query',
        {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        })
        .then(res => {
            if (res.ok) {
                return res.json().then(res => {
                    dispatch({
                        type : GET_MAX_CUSTOMERID,
                        payload : res.data[0]["13"].value
                    })
                })
            }
            return res.json().then(resBody => Promise.reject({status: res.status, ...resBody}))
        })
        .catch(err => console.log(err))
}

//get all loans for authenticated user
export const getUserLoans = (body) => (dispatch) => {
    var headers = {
        'QB-Realm-Hostname': REACT_APP_QB_REALM,
        'Authorization': `QB-USER-TOKEN ${REACT_APP_QB_USER_TOKEN}`,
        'Content-Type': 'application/json'
    }

    fetch('https://api.quickbase.com/v1/records/query',
        {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        })
        .then(res => {
            if (res.ok) {
                return res.json().then(res => {
                    dispatch({
                        type : SET_ALL_USER_LOANS,
                        payload : res.data
                    })
                    console.log(res)
                })
            }
            return res.json().then(resBody => Promise.reject({status: res.status, ...resBody}))
        })
        .catch(err => console.log(err))
}