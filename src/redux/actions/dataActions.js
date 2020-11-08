import {ADD_NEW_CUSTOMER , GET_MAX_AGREEMENTID, GET_MAX_CUSTOMERID } from '../types'
const { REACT_APP_QB_USER_TOKEN, REACT_APP_QB_REALM } = process.env;

var headers = {
    'QB-Realm-Hostname': REACT_APP_QB_REALM,
    'Authorization': `QB-USER-TOKEN ${REACT_APP_QB_USER_TOKEN}`,
    'Content-Type': 'application/json'
}

//insert new customer in database
export const addNewCustomer = (newCustomer, history) => (dispatch) => {

    var body = {"to":"bqxxssmjp",
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
            dispatch({
                type : ADD_NEW_CUSTOMER
            })

            history.push('/')
            return res.json().then(res => console.log(res));
        }
        return res.json().then(resBody => Promise.reject({status: res.status, ...resBody}));
    })
    .catch(err => console.log(err))

}


export const getMaxAgreementid = () => (dispatch) => {
    var headers = {
        'QB-Realm-Hostname': REACT_APP_QB_REALM,
        'Authorization': `QB-USER-TOKEN ${REACT_APP_QB_USER_TOKEN}`,
        'Content-Type': 'application/json'
    }
    
    var body = {"from":"bqybp5qaf","select":[6],"sortBy":[{"fieldId":6,"order":"DESC"}],"options":{"skip":0,"top":1,"compareWithAppLocalTime":false}}

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
                });
            }
            return res.json().then(resBody => Promise.reject({status: res.status, ...resBody}));
        })
        .catch(err => console.log(err))
}

export const getMaxCustomerid = () => (dispatch) => {
    var headers = {
        'QB-Realm-Hostname': REACT_APP_QB_REALM,
        'Authorization': `QB-USER-TOKEN ${REACT_APP_QB_USER_TOKEN}`,
        'Content-Type': 'application/json'
    }
    
    var body = {"from":"bqxxssmjp","select":[16],"sortBy":[{"fieldId":16,"order":"DESC"}],"options":{"skip":0,"top":1,"compareWithAppLocalTime":false}}

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
                        payload : res.data[0]["16"].value
                    })
                });
            }
            return res.json().then(resBody => Promise.reject({status: res.status, ...resBody}));
        })
        .catch(err => console.log(err))
}