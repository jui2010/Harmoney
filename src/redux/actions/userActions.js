import {SET_AUTHENTICATED_USER_INFO} from '../types'
const { REACT_APP_QB_USER_TOKEN, REACT_APP_QB_REALM } = process.env;

var headers = {
    'QB-Realm-Hostname': REACT_APP_QB_REALM,
    'Authorization': `QB-USER-TOKEN ${REACT_APP_QB_USER_TOKEN}`,
    'Content-Type': 'application/json'
}

//get authenticated customers details
export const getAuthenticatedUserInfo = (body) => (dispatch) => {

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
                        type : SET_AUTHENTICATED_USER_INFO,
                        payload : res.data
                    })
                    console.log(res.data)
                })
            }
            return res.json().then(resBody => Promise.reject({status: res.status, ...resBody}))
        })
        .catch(err => console.log(err))
}