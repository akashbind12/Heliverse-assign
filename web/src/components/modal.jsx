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
        "Name": "",
        "Email": "",
        "PhoneNumber": 0,
        "Address": "",
        "Company": "",
        "Designation": "",   
    })
    
    useEffect(() => {
        if (edit) {
            axios.get(`https://heliverse1.herokuapp.com/${id}`)
            .then((prod) => {
                console.log(prod.data)
                setData({
                  "Name": prod.data.Name,
                  "Email": prod.data.Email,
                  "PhoneNumber": prod.data.PhoneNumber,
                  "Address": prod.data.Address,
                  "Company": prod.data.Company,
                  "Designation": prod.data.Designation,   
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
                <FormLabel>Name</FormLabel>
                <Input ref={initialRef} placeholder='Enter Name' value={data.Name} name="Name" onChange={handlechange} />
              </FormControl>
  
              <FormControl mt={4}>
                <FormLabel>Email</FormLabel>
                <Input placeholder='Enter Email' value={data.Email} name="Email" onChange={handlechange} />
              </FormControl>
              
              <FormControl>
                <FormLabel>PhoneNumber</FormLabel>
                <Input ref={initialRef} placeholder='Enter Phone Number' value={data.PhoneNumber} name="PhoneNumber" onChange={handlechange} />
              </FormControl>  

              <FormControl mt={4}>
                <FormLabel>Address</FormLabel>
                <Input placeholder='Enter Address' value={data.Address} name="Address" onChange={handlechange} />
              </FormControl>
            
              <FormControl mt={4}>
                  <FormLabel>Company</FormLabel>
                  <Input placeholder='Enter Company' value={data.Company} name="Company" onChange={handlechange} />
              </FormControl>
            
              <FormControl mt={4}>
                  <FormLabel>Designation</FormLabel>
                  <Input placeholder='Enter Designation' value={data.Designation} name="Designation" onChange={handlechange} />
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