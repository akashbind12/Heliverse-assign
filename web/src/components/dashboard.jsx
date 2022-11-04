
import { Heading, Box, Button, Text,Grid, GridItem } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { signout } from '../Redux/auth/action';
// import { DelteCart, GetCart } from '../Redux/cart/action';
import { ModalComponent } from './modal';
import { User } from './user';
import { useDisclosure,Modal } from '@chakra-ui/react';
import React from "react";
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DelteUser, GetUser } from '../Redux/user/action';

export const Dashboard = () => {
   
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
  
    const [edit, setEdit] = useState(false)
    const [id, setId] = useState(null)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isAuth = useSelector((state) => state.auth.isauth)
    console.log("isAuth :", isAuth)

    const users = useSelector((state) => state.users.user)
    console.log("users :", users)

    const handleLogout = () => {
        dispatch(signout())
    }


    useEffect(() => {
        if(isAuth==false) {
            navigate("/") 
        }

        dispatch(GetUser())
    }, [isAuth])
    
   
    

    return (
        <div >
            <Box maxW='32rem' m="auto">
                <Heading mb={4}>Dashboard</Heading>
                <Text fontSize='xl'>
                    Your products are listed below
                </Text>
                <Button size='lg' colorScheme='green' mt='24px' onClick={() => {
                                onOpen()
                                setEdit(false)
                            }} >
                    Add User
                </Button>
                <Button size='lg' marginLeft="10px" colorScheme='red' mt='24px' onClick={handleLogout} >
                    Logout
                </Button>
            </Box>
            
            <Box maxW='90%' m="50px auto"  >
            <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
                fontSize={{ base: '24px', md: '40px', lg: '56px' }}  gap={6}>
                {users?.map((e,i) => {
                    return (
                        <User key={i} props={e}
                            setEdit={setEdit}
                            setId= {setId}
                            onClick={() => dispatch(DelteUser(e._id))}
                            onclick={() => {
                                onOpen()
                            }}> 
                        </User>
                    )
                })}
                
            </Grid>
            </Box>
             
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalComponent edit = {edit} id={id} onclose={onClose} ></ModalComponent>
            </Modal>
            
            <ToastContainer></ToastContainer>
        </div>
    )
}