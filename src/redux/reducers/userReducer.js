import {SET_AUTHENTICATED } from '../types'

const initialState = {
    authenticatedUser : {
        firstName:"Jui",
        lastName:"Thombre",
        profilePicture:"https://lh3.googleusercontent.com/a-/AOh14GgN7FFpwiW9NW9vvhqax-tyoBY6eVrCUI2BkU0oRr0",
        email:"jui20oct@gmail.com"
    },
    authenticated : false,
    loading : false
}
export default function(state = initialState , action){
    switch(action.type){
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