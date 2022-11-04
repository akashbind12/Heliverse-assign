import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Input,
    FormControl,
    FormLabel,
  } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect } from "react";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { AddToCart, EditCart } from '../Redux/cart/action';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AddUser, EditUser } from '../Redux/user/action';

export function ModalComponent({ edit, id, onclose }) {
    
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    const dispatch = useDispatch()
    const [data, setData] = useState({
        "FirstName": "",
        "LastName": "",
        "age": 0,
        "Gender": "",
        "Qualification": "",
        "Occupation": "",   
    })
    
    useEffect(() => {
        if (edit) {
            axios.get(`https://heliverse-assign.herokuapp.com/${id}`)
            .then((prod) => {
                console.log(prod.data)
                setData({
                  "FirstName": prod.data.FirstName,
                  "LastName": prod.data.LastName,
                  "age": prod.data.age,
                  "Gender": prod.data.Gender,
                  "Qualification": prod.data.Qualification,
                  "Occupation": prod.data.Occupation,   
              })
            })
            .catch((err) => console.log(err))
        }
    },[])

    const handlechange = (e) => {
        setData({
            ...data,
            [e.target.name] : e.target.value
        })
    }

    console.log(data)
  
    return (
      <>
          <ModalOverlay />
          <ModalContent>
                <ModalHeader>{edit ? "Update User" : "Add User" }</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>FirstName</FormLabel>
                <Input ref={initialRef} placeholder='Enter first name' value={data.FirstName} name="FirstName" onChange={handlechange} />
              </FormControl>
  
              <FormControl mt={4}>
                <FormLabel>LastName</FormLabel>
                <Input placeholder='Enter last name' value={data.LastName} name="LastName" onChange={handlechange} />
              </FormControl>
              
              <FormControl>
                <FormLabel>Age</FormLabel>
                <Input ref={initialRef} placeholder='Enter age' value={data.age} name="age" onChange={handlechange} />
              </FormControl>  

              <FormControl mt={4}>
                <FormLabel>Gender</FormLabel>
                <Input placeholder='Enter gender' value={data.Gender} name="Gender" onChange={handlechange} />
              </FormControl>
            
              <FormControl mt={4}>
                  <FormLabel>Qualification</FormLabel>
                  <Input placeholder='Enter Qualification' value={data.Qualification} name="Qualification" onChange={handlechange} />
              </FormControl>
            
              <FormControl mt={4}>
                  <FormLabel>Occupation</FormLabel>
                  <Input placeholder='Enter Occupation' value={data.Occupation} name="Occupation" onChange={handlechange} />
              </FormControl>
            
            </ModalBody>
  
            <ModalFooter>
                    {edit ? <Button colorScheme='blue' mr={3} onClick={() => {
                        dispatch(EditUser(id, data))
                        onclose()
                    }}
                    >
                update User
                    </Button> :
                        <Button colorScheme='blue' mr={3} onClick={() => {
                            dispatch(AddUser(data))
                            onclose()
                        }} >
                Add User
            </Button>}
            </ModalFooter>
          </ModalContent> 
          <ToastContainer></ToastContainer>
      </>
    )
  }