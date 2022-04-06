import React,{useState} from 'react'
import {Box,Input,Button,Heading,useToast,Center} from 'native-base'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import  queryString  from 'query-string'
import { Grid, Avatar } from '@mui/material'
import { AiOutlineUser } from 'react-icons/ai'
import { BiLock } from 'react-icons/bi'

function TeacherLogin(props) {
    const navigate = useNavigate()
    const location = useLocation()
    const search = queryString.parse(location.search)
    const toast = useToast()
    const [username,setUsername] = useState('')
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState('')
    const [password,setPassword] = useState('')
    const loginHandler = async() => {
        setLoading(true)
        const response = await axios({
            url : 'http://localhost:3001/teacher/login',
            method : 'POST',
            data : {id:username,password}
        })
        if(response.data.error){
            toast.show({
                title : 'ERROR!!!',
                description : response.data.error,
                status : 'error'
            })
        } else{
            // toast.show({
            //     title : 'Success!!!',
            //     description : 'Login Successful!',
            //     status : 'success'
            // })
            console.log(response.data)
            axios.defaults.headers.common['authorization'] = response.data.token;
            props.dispatch({
                type : 'ADD_USER',
                user : response.data.teacher,
                aunthenticated_as : 'teacher',
                token : response.data.token
            })
            if(search.next){
                if((search.next==='/teachers/signup') || (search.next==='/teachers/login')){
                    navigate('/teacher/dashboard')
                    return
                }
                navigate(search.next)
            }else{
                navigate('/teacher/dashboard')
            }
        }
        setLoading(false)
        console.log(response.data)
    }
    
    return (
        <div className='login-page flex sb center' >
            <div className='login-container'>
                <Grid container spacing={2} style={{position:'absolute',top:0,left:0,right:0,bottom:0}} >
                    <Grid item md={7} height='100%' >
                        <div className='login-left-container' >
                            <div className='signup-logo' >
                                <img onClick={()=>navigate('/')} className="login-logo" src="https://i.ibb.co/jwBHMRv/logo-free-file.png"/>
                            </div>
                            <div className='quote'>
                                <h2 className='h22' >"Learn Together, Succeed Better"</h2>
                            </div>
                            <div className="login-ill-container">
                                <img className='signup-ill' src="https://svgshare.com/i/d9M.svg" />
                            </div>
                        </div>
                        
                    </Grid>
                    <Grid item md={5} >
                        <div className='login-form-container' >
                            <Box pt='70px' >  
                                <Center>
                                    <Avatar 
                                        src='https://cpng.pikpng.com/pngl/s/80-805068_my-profile-icon-blank-profile-picture-circle-clipart.png' 
                                        sx={{ width: 80, height: 80,background:'transparent',marginBottom: 2 }} 
                                    >
                                        R
                                    </Avatar>
                                </Center>
                                
                                <h2 className='h22' mb = '10px' textAlign = 'center'>
                                    Teacher's Login Page
                                </h2>
                                <Box p='5' pt='0' >
                                    <Input
                                        mt= '3'
                                        placeholder = 'Username/Email ID'
                                        value = {username}
                                        // _focus={{background:'gray.800'}}
                                        // _hover={{background:'gray.800'}}
                                        // color='white'
                                        bg='white'
                                        onChangeText = {setUsername}
                                        InputLeftElement={
                                            <AiOutlineUser className='input-icon' />
                                        }
                                    />
                                    <Input
                                        mt  = '4'
                                        placeholder = 'Password'
                                        value = {password}
                                        onChangeText = {setPassword}
                                        type = 'password'
                                        // _focus={{background:'gray.800'}}
                                        // _hover={{background:'gray.800'}}
                                        // color='white'
                                        bg='white'
                                        InputLeftElement={
                                            <BiLock className='input-icon' />
                                        }
                                    />
                                    <Button 
                                        onPress = {loginHandler}
                                        isLoading = {loading}
                                        _text={{color: 'white'}}
                                        bg={'black'}
                                        _hover={{bg:'blueGray.900'}}
                                        isLoadingText = 'Logging in...'
                                        mt = '4'>
                                        Login
                                    </Button>
                                    <Center mt = '2'>
                                    <Link className='underlined-link' to ='/teachers/signup'>
                                        Create a new account
                                    </Link>
                                    </Center>
                                </Box>
                            </Box>
                        </div>
                    </Grid>
                </Grid>
            </div>
            
           
        </div>
    )
}
const mapStateToProps = state => state

export default connect(mapStateToProps) (TeacherLogin)
