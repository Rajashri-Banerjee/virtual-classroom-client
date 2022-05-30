import React,{useState,useEffect} from 'react'
import {Box,Input,Button,Heading,useToast,Center,Image} from 'native-base'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import {useNavigate,useLocation} from'react-router-dom'
import  queryString  from 'query-string'
import { Grid, Avatar } from '@mui/material'
import {AiOutlineUser} from 'react-icons/ai'
import {BiLock} from 'react-icons/bi'

function Login(props) {
    const navigate = useNavigate()
    const location = useLocation()
    const search = queryString.parse(location.search);
    console.log(location)
    const toast = useToast()
    const [username,setUsername] = useState('')
    const [loading,setLoading] = useState(false)
    const [password,setPassword] = useState('')
    const [error,setError] = useState('')

    console.log(search)
    const loginHandler = async({token}) => {
        var response
        setLoading(true)
        if(token){
            axios.defaults.headers.common['authorization'] = token;
            response = await axios({
                url: '/user/me',
                method: 'GET',
            })
        }else{
            response = await axios({
                url : '/login',
                method : 'POST',
                data : {id:username,password}
            })
        }
        if(response.data.error){
            toast.show({
                title : 'ERROR!!!',
                description : response.data.error,
                status : 'error'
            })
        } else{
            axios.defaults.headers.common['authorization'] = response.data.token;
            props.dispatch({
                type : 'ADD_USER',
                user : response.data.user,
                aunthenticated_as : 'student',
                token : response.data.token
            })
            const userData = {
                ...response.data.user,
                token:response.data.token,
                aunthenticated_as : 'student'
            }
            localStorage.setItem('user',JSON.stringify(userData))
            if(search.next){
                if((search.next==='/login') || (search.next==='/signup')){
                    navigate('/student/dashboard')
                    return
                }
                if(search.room_id && search.next.includes('/live-class')){
                    navigate('/student/class-details/'+search.room_id)
                }
                else{
                    navigate(search.next)
                }
            }
            else{
                navigate('/student/dashboard')
            }
        }
        setLoading(false)
        console.log(response.data)
    }
    useEffect(()=>{
        if(props.auth.user && props.auth.authenticated_as==='student'){
            navigate('/student/dashboard')
            return
        }
        const userData = JSON.parse(localStorage.getItem('user'))
        if(userData && userData.token && userData.aunthenticated_as == 'student'){
            loginHandler({token:userData.token})
        }
    },[])
    return (
        <div className='login-page flex sb center' >
            <div className='login-container'>
                <Grid container spacing={2} style={{position:'absolute',top:0,left:0,right:0,bottom:0}} >
                    <Grid item md={7} height='100%' >
                        <div className='login-left-container' >
                            <div className='flex center' >
                                <img className="login-logo" src="https://i.ibb.co/jwBHMRv/logo-free-file.png"/>
                            </div>
                            <div>
                                <h2 className='h22' >"Your One Stop Destination To Learn Together"</h2>
                            </div>
                            <div className="login-ill-container">
                                <img className='login-ill' src="https://svgshare.com/i/dAS.svg" />
                            </div>
                        </div>
                        
                    </Grid>
                    <Grid item md={5} >
                        <div className='login-form-container' >
                            <Box pt='80px' >  
                                <Center>
                                    <Avatar 
                                        src='https://cpng.pikpng.com/pngl/s/80-805068_my-profile-icon-blank-profile-picture-circle-clipart.png' 
                                        sx={{ width: 80, height: 80,background:'transparent',marginBottom: 2 }} 
                                    >
                                        R
                                    </Avatar>
                                </Center>
                                
                                <h2 className='h22' mb = '10px' textAlign = 'center'>
                                    Student's Login Page
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
                                        _hover={{
                                            bg:'blueGray.900'
                                        }}
                                        _pressed={{
                                            background: 'black', 
                                        }}
                                        _focus={{
                                            background: 'black', 
                                        }}
                                        isLoadingText = 'Logging in...'
                                        mt = '4'>
                                        Login
                                    </Button>
                                    <Center mt = '2'>
                                    <Link className='underlined-link' to ='/signup'>
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

export default connect(mapStateToProps) (Login)
