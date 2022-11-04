import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Tost = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    }

export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILURE = "GET_USER_FAILURE";


export const UserRequest = () => {
    return {
        type : GET_USER_REQUEST
    }
}

export const UserSuccess = (data) => {
    return {
        type: GET_USER_SUCCESS,
        payload : data
    }
}

export const UserFailure = (err) => {
    return {
        type: GET_USER_FAILURE,
        payload : err
    }
}


export const AddUser = (payload) => (dispatch)=> {
    dispatch(UserRequest())
  
    console.log("payload",payload)
    axios.post('https://heliverse1.herokuapp.com/', payload)
      .then(function (response) {
          console.log("bag", response.data);
          toast.success('User added sucessfully', Tost);
          dispatch(GetUser())
      })
      .catch(function (error) {
        toast.error(error.message, Tost );
          dispatch(UserFailure(error.message))
      });
}

export const GetUser = (payload) => (dispatch)=> {
    dispatch(UserRequest())
  
    axios.get('https://heliverse1.herokuapp.com/')
      .then(function (response) {
          console.log(response.data);
          dispatch(UserSuccess(response.data))
      })
      .catch(function (error) {
          console.log(error);
          dispatch(UserFailure(error.message))
      });
}

export const DelteUser = (id) => (dispatch)=> {
    dispatch(UserRequest())
  
    
    axios.delete(`https://heliverse1.herokuapp.com/${id}`)
    .then(function (response) {
        console.log(response.data);
        toast.success('User removed sucessfully', Tost);
        dispatch(GetUser())
    })
    .catch(function (error) {
        console.log(error);
        dispatch(UserFailure(error.message))
    });
}

export const EditUser = (id,payload) => (dispatch) => {
    console.log(id,payload)
    dispatch(UserRequest())

    axios.put(`https://heliverse1.herokuapp.com/${id}`, payload)
    .then(function (response) {
        console.log(response.data);
        toast.success('User updated sucessfully', Tost);
        dispatch(GetUser())
    })
    .catch(function (error) {
        console.log(error);
        dispatch(UserFailure(error.message))
    });
    }