import React,{useState} from 'react'
import {Box,Input,Button,Heading,useToast,Center} from 'native-base'
import {Grid, Avatar} from '@mui/material'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router-dom'
import  queryString  from 'query-string'
import { connect } from 'react-redux'
import PersonIcon from '@mui/icons-material/Person';
import KeyIcon from '@mui/icons-material/Key';
import EmailIcon from '@mui/icons-material/Email';

function TeacherSignup(props) {
    const toast = useToast()
    const navigate = useNavigate()
    const location = useLocation()
    const search = queryString.parse(location.search)
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [fullname,setFullname] = useState('')
    const [email,setEmail] = useState('')
    const [loading,setLoading] = useState(false)
    
    const signupHandler = async() => {
        if(username.length < 4){
            toast.show({
                title : 'Validation Error!',
                description : "Username length must be at least 4 chars.",
                status : 'error'
            })
            return
        }
        function validateEmail(email) {
            var re = /\S+@\S+\.\S+/;
            return re.test(email);
        }
        if(!validateEmail(email)){
            toast.show({
                title : 'Validation Error!',
                description : "Invalid Email",
                status : 'error'
            })
            return
        }
        if(password.length< 8){
            toast.show({
                title : 'Validation Error!',
                description : "Password length must be at least 8 chars.",
                status : 'error'
            })
            return
        }

        setLoading(true)
        const response = await axios({
            url : '/teacher/signup',
            method : 'POST',
            data : {username,password,fullname,email}
        })
        if(response.data.error){
            toast.show({
                title : 'ERROR!!!',
                description : response.data.error,
                status : 'error'
            })
        } else{
            toast.show({
                title : 'Success!!!',
                description : 'Account created successfully!',
                status : 'success',
                duration : '1000'
            })
            console.log(response.data)
            axios.defaults.headers.common['authorization'] = response.data.token;
            props.dispatch({
                type : 'ADD_USER',
                user : response.data.teacher,
                aunthenticated_as : 'teacher',
                token : response.data.token
            })
            setTimeout(() => {
                if(search.next){
                if((search.next='/teachers/signup') || (search.next='/teachers/login')){
                    navigate('/teacher/dashboard')
                }
                    return
                    navigate(search.next)
                }else{
                    navigate('/teacher/dashboard')
                }
            }, 2000);
             
        }
        setLoading(false)
    }
    return (
        <div className='login-page flex sb center'>
            <div className='signup-container'>
                <Grid container spacing={2} style={{position:'absolute',top:0,left:0,right:0,bottom:0}} >
                    <Grid item md={7} height='100%' >
                        <div className='login-left-container' >
                            <div className='signup-logo' >
                                <img onClick={()=>navigate('/')} className="login-logo" src="https://i.ibb.co/jwBHMRv/logo-free-file.png"/>
                            </div>
                            <div className='quote'>
                                <h2 className='h22' >"Your One Stop Destination To Learn Together"</h2>
                            </div>
                            <div className="login-ill-container">
                                <img className='signup-ill' src="https://svgshare.com/i/d9M.svg" />
                            </div>
                        </div>
                    </Grid>

                    <Grid item md={5} >
                        <div className='login-form-container'  >
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
                                    Teacher's Registration Page
                                </h2>
                                <Box p='5' pt='0'>
                                    <Input
                                        mt= '3'
                                        placeholder = 'Username'
                                        value = {username}
                                        bg = 'white'
                                        onChangeText = {setUsername}
                                        InputLeftElement={
                                            <PersonIcon className='input-icon' />
                                        }
                                    />
                                    
                                    <Input
                                        mt ='4'
                                        placeholder = 'Fullname'
                                        value = {fullname}
                                        bg = 'white'
                                        onChangeText = {setFullname}
                                        InputLeftElement={
                                            <PersonIcon className='input-icon' />
                                        }
                                    />

                                    <Input
                                        mt ='4'
                                        placeholder = 'Password'
                                        bg = 'white'
                                        value = {password}
                                        type= 'password'
                                        onChangeText = {setPassword}
                                        InputLeftElement={
                                            <KeyIcon className='input-icon' />
                                        }
                                    />
                                    
                                    <Input
                                        mt ='4'
                                        placeholder = 'Email'
                                        bg = 'white'
                                        value = {email}
                                        onChangeText = {setEmail}
                                        InputLeftElement={
                                            <EmailIcon className='input-icon' />
                                        }
                                    />
                                    <Button 
                                        onPress = {signupHandler}
                                        isLoading = {loading}
                                        isLoadingText = 'Creating account...'
                                        bg={'black'}
                                        mt = '4'
                                        _hover={{
                                            bg: 'blueGray.900',  
                                        }}
                                        _pressed={{
                                            background: 'black', 
                                        }}
                                        _focus={{
                                            background: 'black', 
                                        }}
                                    >
                                        Signup 
                                    </Button>
                                    <Center mt = '2'>
                                    <Link className='underlined-link' to ='/teachers/login'>
                                        Already have an account? Click here!
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

export default connect(mapStateToProps) (TeacherSignup)
