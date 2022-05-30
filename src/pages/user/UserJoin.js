import React,{useState, useEffect} from 'react'
import { useLocation,useParams,useNavigate } from 'react-router-dom'
import axios from 'axios'
import {Box,Flex,useToast,Image,AspectRatio,Button,Divider} from 'native-base'
import { Typography,Grid } from '@mui/material'
import {Link} from 'react-router-dom'
import Header from './Header'
import { connect } from 'react-redux'
import AddCircleIcon from '@mui/icons-material/AddCircle';

function UserJoin(props) {
    const [room,setRoom] = useState()
    const [loading,setLoading] = useState(false)
    const params = useParams()
    const toast = useToast()
    const location = useLocation()
    const navigate= useNavigate()
    const id = params.id
    const getClass = async() =>{
        if(!id){
            toast.show({
                title:"Error",
                description:'You need to pass the class id in url',
                status:'error'
            })
            return
        }
        setLoading(true)
        const response = await axios({
            url:`/student/class?id=${id}`,
            method:'GET'
        })
        setLoading(false)
        if(response.data && response.data.error){
            toast.show({
                title:'Error',
                description:response.data.error,
                status:'error'
            })
            console.log(response.data)
            return
        }
        if(response.data.room){
            setRoom(response.data.room)
        }
        console.log(response.data)
    }
    const joinHandler = async() =>{
        if(!id){
            toast.show({
                title:"Error",
                description:'You need to pass the class id in url',
                status:'error'
            })
            return
        }
        setLoading(true)
        const response = await axios({
            url:`/user/class/join`,
            method:'POST',
            data : {class_id : id}
        })
        setLoading(false)
        if(response.data && response.data.error){
            toast.show({
                title:'Error',
                description:response.data.error,
                status:'error'
            })
            console.log(response.data)
            return
        } else{
            toast.show({
                title:'Success',
                description: 'You have joined the class successfully!',
                status:'success',
                duration: 1000
            })
            setTimeout(() => {
                navigate('/student/dashboard')
            }, 2000);
        }
        console.log(response.data)
    }
    useEffect(()=>{
        getClass()
    },[])
    return (
            <div style={{position:'relative'}} className='teacher-update-class-page' >
            <div style={{position:'relative'}}>
                <Box>
                {props.auth.user && 
                    <Header 
                        user={props.auth.user} 
                        dispatch={props.dispatch} 
                        location={location}
                    />
                }
                {console.log(room)}
                <Divider/>
                {room && 
                    <Box>
                        <div style={{alignItems:'center',backgroundColor:'#1D242F',maxHeight:'200px',position:'relative',overflow:'hidden', marginTop:'20px'}}>
                            <Grid container spacing={0} style={{backgroundColor:'#1D242F'}}>
                                <Grid item md={2}>
                                    <div style={{position:'relative'}}>
                                        <img 
                                            src={
                                                (room.poster && room.poster.uri) ||
                                                'https://media.istockphoto.com/vectors/classroom-nobody-school-classroom-interior-with-teachers-desk-and-vector-id1130490883?k=20&m=1130490883&s=612x612&w=0&h=l_ZzLt51AARql4IhXhyjwNf_svNTxsnkRxpt6OOmerY='
                                            } 
                                            alt={room.title}
                                            width='100%'
                                            height='200px'
                                            style={{cursor:'pointer',position:'relative',zIndex:33}}
                                        />
                                    </div>
                                </Grid>
                                <Grid item md={10}>
                                {room.subtitle ? <div className='class-detail-container'>
                                        <h1 style={{marginTop:'10px', marginBottom:'0px'}} >{room.title}</h1>
                                        <p className='class-owner-join'> ~ By {room.owner.fullname} </p>
                                        <p className='class-subtitle-join'style={{textAlign:'center', marginTop:'10px'}}>"{room.subtitle}"</p>
                                    </div>:
                                    <div className='class-detail-container flex ac center'>
                                        <h1 style={{marginTop:'0px'}} >{room.title}</h1>
                                        <p style={{marginTop:'-10px'}}> By {room.owner.fullname} </p>
                                    </div>
                                }
                                </Grid>
                            </Grid>
                        </div> 
                    </Box>
                }
                <Divider/>
            </Box>

                
            </div>
            <div className="flex center">
                <Button
                    bg='black'
                    startIcon={<AddCircleIcon sx={{width:'30px',height:'30px'}} />}
                    _hover={{
                        bg:'blueGray.900'
                    }}
                    isLoading={loading}
                    onPress={joinHandler}
                    mt='10'
                    style={{paddingLeft:'90px',paddingRight:'90px'}}
                    _text={{fontSize:'20px'}}
                    _focus={{
                        bg:'blueGray.900'
                    }}
                    _focusVisible={{
                        bg:'blueGray.900'
                    }}
                    _pressed={{
                        bg:'black'
                    }}
                > 
                    Join Class Now
                </Button>
            </div>
            
        </div>
    )
}

const mapStateToProps = (state) => state
export default connect (mapStateToProps)  (UserJoin)
