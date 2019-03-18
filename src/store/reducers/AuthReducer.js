import * as actionTypes from '../actions/Actions';

const initialState = {
    token: null,
    userId: null,
    registrationSuccess: false,
    logInError: null,
    registrationError: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOG_IN:
           return {
               ...state, token: action.token, userId: action.userId, logInError: null,
               registrationError: null
           }
        case actionTypes.LOG_OUT:
            return {
                ...state, token: null, userId: null, logInError: null,
                registrationError: null
            }
        case actionTypes.ON_AUTH:
            return {
                ...state, token: action.token, userId: action.userId, logInError: null,
                registrationError: null
            }
        case actionTypes.ON_REGISTER: 
            return {
                ...state, registrationSuccess: true
            }
        case actionTypes.LOG_IN_FAILED: 
            return {
                ...state, logInError: action.error
            }
        case actionTypes.ON_REGISTRATION_FAILED: 
            return {
                ...state, registrationError: action.error
            }
        default: 
            return state;
    }
}

export default authReducer;