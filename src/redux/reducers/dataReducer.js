import { GET_MAX_AGREEMENTID, GET_MAX_CUSTOMERID } from '../types'

const initialState = {
    maxAgreementid : 1,
    maxCustomerid : 1
}

export default function (state = initialState, action){
    switch(action.type){

        case GET_MAX_AGREEMENTID : 
            return {
                ...state,
                maxAgreementid : action.payload
            }

        case GET_MAX_CUSTOMERID : 
            return {
                ...state,
                maxCustomerid : action.payload
            }

        default : 
            return {
                ...state
            }
    }
}