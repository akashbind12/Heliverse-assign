import { GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS } from "./action"



const initState = {
    isLoading: false,
    isError: false,
    user : [],
}

export const UserReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case GET_USER_REQUEST: {
            return {
                ...state,
                isLoading: true,
                isError : false
            }
        }
        case GET_USER_SUCCESS: {

            return {
                ...state,
                user : payload,
                isLoading: false,  
            }
        }
        case GET_USER_FAILURE: {
            return {
                ...state,
                isLoading: false,
                isError: true,
            }
        }
        default:
            return state
    }
}