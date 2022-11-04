import { GET_AUTH_FAILURE, GET_AUTH_REQUEST, GET_AUTH_SUCCESS, GET_AUTH_LOGOUT } from "./action"


const initState = {
    isLoading: false,
    isError: false,
    isauth: localStorage.getItem("isauth") || false,
    user : null,
}

export const authReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case GET_AUTH_REQUEST: {
            return {
                ...state,
                isLoading: true,
                isError : false
            }
        }
        case GET_AUTH_SUCCESS: {
            localStorage.setItem("isauth",true)
            return {
                ...state,
                isauth: true,
                user : payload,
                isLoading: false,  
            }
        }
        case GET_AUTH_FAILURE: {
            return {
                ...state,
                isLoading: false,
                isError: true,
            }
        }
        case GET_AUTH_LOGOUT: {
            localStorage.removeItem("isauth")
            return {
                ...state,
                isauth: false,
                user : null,
            }
        }
      
        default:
            return state
    }
}