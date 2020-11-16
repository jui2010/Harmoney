import { GET_MAX_AGREEMENTID, GET_MAX_CUSTOMERID, SET_ALL_USER_LOANS} from '../types'

const initialState = {
    allUserLoans : [],
    maxAgreementid : 1,
    maxCustomerid : 1
}

export default function (state = initialState, action){
    switch(action.type){

        case SET_ALL_USER_LOANS : 
            return {
                ...state,
                allUserLoans : action.payload
            }

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