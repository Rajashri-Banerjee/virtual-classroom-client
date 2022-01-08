import React,{useState} from 'react'
import { Box, Flex,Center,Button,Input,useToast,Modal } from 'native-base'
import { connect } from 'react-redux'
import { Typography, Avatar } from '@mui/material'
import axios from 'axios'

function StudentProfile(props) {
    const toast = useToast()
    const [open,setOpen] = useState(false)
    const [user,setUser]  = useState(props.auth.user)
    const [loading,setLoading] = useState(false)
    const [username,setUsername] = useState((props.auth.user && props.auth.user.username)|| '')
    const [fullname,setFullname] = useState((props.auth.user && props.auth.user.fullname)|| '')
    const [email,setEmail] = useState((props.auth.user && props.auth.user.email)|| '')
    const [contact,setContact] = useState((props.auth.user && props.auth.user.contact)|| '')
    const [image,setImage] = useState('')
    const [imageUrl,setImageUrl] = useState('')
    
    const updateHandler = async() =>{
        setLoading(true)
        try {
            const response = await axios({
                url:'http://localhost:3001/user/profile',
                method:'PATCH',
                data:{
                    _id: props.auth.user._id,
                    fullname,
                    email,
                    contact,
                }
            })
            if(response.data && response.data.error){
                toast.show({
                    title:'Error',
                    description: response.data.error,
                    status:'error',
                    duration:1000,
                    placement:'top-right'
                })
            }else{
                console.log(response.data)
                props.dispatch({
                    type : 'ADD_USER',
                    user : response.data.user,
                    aunthenticated_as : 'student',
                    token : response.data.token
                })
                toast.show({
                    title:'Success',
                    description: 'Profile Updated Successfully.',
                    status:'success',
                    duration:1000,
                    // placement:'bottom-right'
                })
                setOpen(false)
            }
        } catch (error) {
            toast.show({
                title:'Error',
                description: error.message,
                status:'error',
                duration:1000,
                placement:'bottom-right'
            })
        }
        setLoading(false)
        
    }
    const profilePicUpdateHandler = async() =>{
        setLoading(true)
        const formData = new FormData();
        formData.append(
            "img",
            image,
        );
        const response = await axios({
            url:'http://localhost:3001/user/profile-img',
            method:'POST',
            data: formData,
        })
        if(response.data && response.data.error){
            toast.show({
                title:'Error',
                description: response.data.error,
                status:'error',
                duration:1000,
                placement:'bottom-right'
            })
        }
        if(response.data && response.data.user){
            props.dispatch({
                type : 'ADD_USER',
                user : response.data.user,
                aunthenticated_as : 'teacher',
                token : props.auth.token
            })
        }
        console.log(response.data)
        setLoading(false)
    }
    const onFileChange = event => {
        setImage(event.target.files[0])
        const formData = new FormData();
        setImageUrl(URL.createObjectURL(event.target.files[0]))
    };

    
    return (
        <Box _light={{bg:'gray.200'}} minH={'100vh'}  >
            {props.auth && props.auth.user && 
                <Box margin='auto' w='95%' maxWidth={'500px'} mt='5' >
                    <Box
                        _light={{bg:'white'}}
                        shadow='1'
                        width='100%'
                        borderRadius='3'
                        p='5'
                        mt='5'
                    >   
                        <Center>
                            {props.auth.user.profile ?
                                <Avatar 
                                    sx={{ width: 100, height: 100,maring:'auto',marginTop:'10px',cursor:'pointer' }}
                                    src={props.auth.user.profile.avatar}
                                >
                                </Avatar>:
                                <Avatar 
                                    sx={{ width: 100, height: 100,maring:'auto',marginTop:'10px',cursor:'pointer' }}
                                >
                                    {props.auth.user.username[0].toUpperCase()}
                                </Avatar>
                            }
                        </Center>
                        
                        <Typography 
                            textAlign='center' 
                            fontWeight={'bold'} 
                            variant='h5' 
                        >
                            {props.auth.user.fullname}
                        </Typography>
                        <Typography 
                            textAlign='center' 
                            variant='caption'
                        >
                            @{props.auth.user.username}
                        </Typography>
                        <input type='file' onChange={onFileChange} />
                        <button onClick={profilePicUpdateHandler} >
                            updae
                        </button>
                        
                        <img src={imageUrl} alt="" width='100px' height={'100px'} />
                    </Box>
                    
                    <Box
                        _light={{bg:'white'}}
                        shadow='1'
                        width='100%'
                        borderRadius='3'
                        p='5'
                        mt='5'
                    >
                        <Typography 
                            fontWeight={'bold'} 
                            >
                                Full Name
                        </Typography>
                        <Typography 
                            border={'1px solid #C0BFC1'} 
                            mt={1}
                            padding={1}>
                                {props.auth.user.fullname}
                        </Typography>
                        <Typography 
                            fontWeight={'bold'}
                            mt={1} 
                        >
                            Username
                        </Typography>
                        <Typography 
                            border={'1px solid #C0BFC1'} 
                            padding={1}
                        >
                            {props.auth.user.username}
                        </Typography>
                        <Typography 
                            fontWeight={'bold'}
                            mt={1} 
                        >
                            Email
                        </Typography>
                        <Typography 
                            border={'1px solid #C0BFC1'} 
                            padding={1}
                        >
                            {props.auth.user.email}
                        </Typography>
                        <Typography 
                            fontWeight={'bold'}
                            mt={1} 
                        >
                            Contact
                        </Typography>
                        <Typography 
                            border={'1px solid #C0BFC1'} 
                            padding={1}
                        >
                            +91 {props.auth.user.contact}
                        </Typography>
                        <Center mt='5'>
                            <Button
                                onPress={()=>setOpen(true)}
                            >
                                Edit
                            </Button>
                        </Center>
                    </Box>
                    
                </Box>
            }
            <Modal isOpen = {open} onClose={()=>setOpen(false)}>
                <Modal.Content>
                    <Modal.CloseButton/>
                    <Modal.Header>
                        Update Profile
                    </Modal.Header>
                    <Modal.Body>
                        {user && 
                            <Box>
                                
                                
                                <Input 
                                    onChangeText={setFullname}
                                    placeholder = 'Fullname'
                                    value={fullname}
                                    mt='2'
                                />
                                <Input 
                                    onChangeText={setEmail}
                                    placeholder = 'Email'
                                    value={email}
                                    mt='2'
                                />
                                <Input 
                                    onChangeText={setContact}
                                    placeholder = 'Contact No.'
                                    value = {contact}
                                    mt='2'
                                />
                                <Button
                                    mt='2'
                                    isLoading={loading}
                                    isLoadingText='Updating....'
                                    onPress ={updateHandler}
                                >
                                    Update
                                </Button>

                            </Box>
                        }
                    </Modal.Body>
                </Modal.Content>
            </Modal>
        </Box>
    )
}
const mapStateToProps = state => state
export default connect(mapStateToProps) (StudentProfile)
