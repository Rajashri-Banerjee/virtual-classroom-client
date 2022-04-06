import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { Box, Flex,Avatar,Text,Button,Input,useToast,Heading,Image,AspectRatio,Modal,Center,Divider} from 'native-base'
import { useLocation,useNavigate,useParams } from 'react-router-dom'
import List from '../../components/List'
import NotificationsForm from '../../components/NotificationsForm'
import { FiEdit } from 'react-icons/fi';
import User from '../../components/User'
import { Typography,Grid } from '@mui/material'
import NotesForm from '../../components/NotesForm'
import AssignmentForm from '../../components/AssignmentForm'
import {HiOutlineUserAdd} from 'react-icons/hi';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Header from './Header'
import { connect } from 'react-redux'
import Drawer from './Drawer'
import ParticipantsList from './ParticipantsList'

function UpdateClass(props) {
    const location = useLocation()
    const navigate= useNavigate()
    const params = useParams()
    const id = params.id
    const toast = useToast()
    
    const [loading,setLoading] = useState(false)
    const [room,setRoom] = useState()
    const [notes,setNotes] = useState([])
    const [notifications,setNotifications] = useState([])
    const [assignments,setAssignments] = useState([])
    const [notesModal,setNotesModal] = useState(false)
    const [notificationModal,setNotificationModal] = useState(false)
    const [assignmentsModal,setAssignmentsModal] = useState(false)
    const [title,setTitle] = useState('')
    const [subtitle,setSubtitle] = useState('')
    const [editModal,seteditModal] = useState(false)
    const [users,setUsers] = useState([])
    const [poster,setPoster] = useState('')
    const [image,setImage] = useState('')

    const [posterModal,setPosterModal] = useState(false)

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
            url:`http://localhost:3001/teacher/class?id=${id}`,
            method:'GET'
        })
        setLoading(false)
        if(response.data && response.data.error){
            toast.show({
                title:'Error',
                description:response.data.error,
                status:'error'
            })
            return
        }
        if(response.data.room){
            console.log(response.data.room)
            setRoom(response.data.room)
            setNotes(response.data.room.notes)
            setAssignments(response.data.room.assignments)
            setNotifications(response.data.room.notifications)
            setTitle(response.data.room.title)
            setSubtitle(response.data.room.subtitle)
            setUsers(response.data.users)
        }
    }
    const updateHandler=async({note,assignment,notification})=>{
        setLoading(true)
        seteditModal(false)
        
        const abc = await axios({
            url:'http://localhost:3001/teacher/class',
            method:'PATCH',
            data:{
                ...room,
                notifications:notification?notification:notifications,
                notes:note?note:notes,
                assignments:assignment?assignment:assignments,
                title,
                subtitle,
            }
        })
        console.log(abc)
        getClass()
        setLoading(false)
    }
    const posterUpdater = async()=>{
        const formData = new FormData()
        formData.append("img",image)
        const response = await axios({
            url:`http://localhost:3001/teacher/class-poster?id=${id}`,
            method:'POST',
            data:formData
        })
        if(response.data && response.data.error){
            toast.show({
                title:'Error',
                description:response.data.error,
                status:'error'
            })
            return
        }
        getClass()
        setPosterModal(false)

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
                                                onClick={()=>setPosterModal(true)}
                                                style={{cursor:'pointer',position:'relative',zIndex:33}}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item md={10}>
                                    {room.subtitle || room.title ? <div className='class-detail-container'>
                                        <div style={{position:'absolute',zIndex:100, right:10,top:10}} >
                                                <FiEdit 
                                                    mt='10px' 
                                                    size={'25px'} 
                                                    style={{cursor:'pointer',color:'white'}} 
                                                    onClick={()=>seteditModal(true)}
                                                />
                                            </div>
                                            <h1 style={{marginTop:'10px', marginBottom:'0px'}} >{room.title}</h1>
                                            <p style={{textAlign:'center', marginTop:'10px'}}>{room.subtitle}</p>
                                        </div>:
                                        <div className='class-detail-container flex ac center'>
                                            <h1 style={{marginTop:'0px'}} >{room.title}</h1>
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
            <div>
                <Drawer 
                    toast={toast} 
                    room={room}
                    children={<h1>Hello</h1>} 
                    users = {users}
                    notifications={notifications}
                    assignments={assignments}
                    notes={notes}
                    setNotificationModal={setNotificationModal}
                    setAssignmentsModal={setAssignmentsModal}
                    setNotesModal={setNotesModal}
                    setNotifications={setNotifications}
                    setAssignments={setAssignments}
                    setNotes={setNotes}
                    updateHandler={updateHandler}
                    user={props.auth.user}
                />
            </div>
            <Box mt='10px' p='5' width='600px' >
                <Box>
                   <List  
                        title='Sometimes' 
                        notifications={notifications} 
                        setNotifications={setNotifications}
                        assignments={assignments}
                        setAssignments={setAssignments}
                        notes ={notes}
                        setNotes={setNotes}
                        setAssignmentsModal={setAssignmentsModal}
                        setNotesModal={setNotesModal}
                    />
                    <Button mt='20px'isLoading={loading} isLoadingText='Updating...' variant='ghost'>
                        
                    </Button>
                </Box>
            </Box>
            <Modal isOpen = {notificationModal} onClose={()=>setNotificationModal(false)}>
                <Modal.Content style={{marginBottom:'auto',marginTop: 200}}>
                <Modal.CloseButton />
                    <Modal.Header>
                        Notification Form
                    </Modal.Header>
                    <Modal.Body>
                        <NotificationsForm 
                            setNotifications = {setNotifications} 
                            setNotificationModal={setNotificationModal}
                            updateHandler = {updateHandler}
                        />
                    </Modal.Body>
                </Modal.Content>
            </Modal>
            <Modal isOpen = {notesModal} onClose={()=>setNotesModal(false)}>
                <Modal.Content style={{marginBottom:'auto',marginTop: 200}}>
                <Modal.CloseButton />
                    <Modal.Header>
                        Notes Form
                    </Modal.Header>
                    <Modal.Body>
                        <NotesForm 
                            setNotes = {setNotes}
                            setNotesModal={setNotesModal}
                            updateHandler = {updateHandler}
                        />
                    </Modal.Body>
                </Modal.Content>
            </Modal>
            <Modal isOpen = {assignmentsModal} onClose={()=>setAssignmentsModal(false)}>
                <Modal.Content style={{marginBottom:'auto',marginTop: 200}}>
                <Modal.CloseButton />
                    <Modal.Header>
                        Assignment Form
                    </Modal.Header>
                    <Modal.Body>
                        <AssignmentForm 
                            setAssignments = {setAssignments} 
                            setAssignmentsModal={setAssignmentsModal}
                            updateHandler = {updateHandler}
                        />
                    </Modal.Body>
                </Modal.Content>
            </Modal>

            <Modal isOpen = {editModal} onClose={()=>seteditModal(false)}>
                <Modal.Content style={{marginBottom:'auto',marginTop: 200}} >
                    <Modal.CloseButton/>
                    <Modal.Header>
                        Edit Form
                    </Modal.Header>
                    <Modal.Body>
                        {room && 
                        <Box>
                            <Input 
                                onChangeText={setTitle}
                                placeholder = 'Title'
                                value = {title}
                                mt='10px'
                            />
                            <Input 
                                onChangeText={setSubtitle}
                                placeholder = 'Class Description'
                                value={subtitle}
                                mt='10px'
                            />
                            
                            <Button 
                                onPress={()=>updateHandler({})} 
                                bg={'black'}
                                mt='10px'
                                _hover={{
                                    backgroundColor:'#1E1A1A'
                                }}
                            >
                                Update
                            </Button>
                        </Box>
                        }
                    </Modal.Body>
                </Modal.Content>
            </Modal>
            <Modal isOpen = {posterModal} onClose={()=>setPosterModal(false)}>
                <Modal.Content>
                    <Modal.CloseButton/>
                    <Modal.Header>
                        Poster Update
                    </Modal.Header>
                    <Modal.Body>
                        {room && 
                            <Box>
                                <Flex direction='row'>
                                    <input 
                                    // onChangeText={setSubtitle}
                                        placeholder = 'Class Poster'
                                        type='file'
                                        onChange={(e)=>setImage(e.target.files[0])}
                                        // value={subtitle}
                                    />
                                    <button onClick={posterUpdater}>Upload</button>
                                </Flex>
                            </Box>
                        }
                    </Modal.Body>
                </Modal.Content>
            </Modal>
        </div>
    )
}

const mapStateToProps = state => state

export default connect(mapStateToProps) (UpdateClass)
