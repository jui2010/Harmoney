import {SET_AUTHENTICATED, SET_AUTHENTICATED_USER_INFO} from '../types'

const initialState = {
    authenticatedUser : {
        firstName:"Vannie",
        lastName:"Enevold",
        // profilePicture:"https://lh3.googleusercontent.com/a-/AOh14GgN7FFpwiW9NW9vvhqax-tyoBY6eVrCUI2BkU0oRr0",
        profilePicture:"",
        email:"venevold7i@unc.edu",
        customerid : '',
        phone : '',
        gender : '',
        verificationid : '',
        street1: '',
        street2: '',
        city: '',
        state: '',
        zipcode: '',
        country: ''
    },
    authenticated : false,
    loading : false
}
export default function(state = initialState , action){
    switch(action.type){
        case SET_AUTHENTICATED_USER_INFO :
            return {
                ...state,
                authenticatedUser : {
                    ...state.authenticatedUser,
                    customerid : action.payload[0][13].value,
                    phone : action.payload[0][16].value,
                    gender : action.payload[0][18].value,
                    verificationid : action.payload[0][19].value,
                    street1: action.payload[0][7].value,
                    street2: action.payload[0][8].value,
                    city: action.payload[0][9].value,
                    state: action.payload[0][10].value,
                    zipcode: action.payload[0][11].value,
                    country: action.payload[0][12].value,
                }
            }

        case SET_AUTHENTICATED :
            return {
                ...state,
                authenticated : true
            }
        
        default : 
            return {
                ...state
            }
    }
}