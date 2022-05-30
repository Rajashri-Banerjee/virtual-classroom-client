// import React,{useState, useEffect} from 'react'
// import axios from 'axios'
// import { Typography, Avatar,Grid,Item,Accordion,AccordionSummary,AccordionDetails,IconButton } from '@mui/material'
// import { Flex,Box,Text,Button,Input,useToast,Heading,Image,AspectRatio,Modal,Center,Divider} from 'native-base'
// import { useLocation,useNavigate,useParams } from 'react-router-dom'
// import User from '../../components/User'
// import { Document, Page } from 'react-pdf'
// import { MdDownload } from 'react-icons/md';
import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { Box, Flex,Avatar,Text,Button,Input,useToast,Heading,Image,AspectRatio,Modal,Center,Divider, Spinner} from 'native-base'
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
function StudentClassDetails(props) {

    // console.log(props)
    const location = useLocation()
    const navigate= useNavigate()
    const params = useParams()
    const id = params.id
    const toast = useToast()

    const [loading,setLoading] = useState(false)
    const [room,setRoom] = useState(null)
    const [notes,setNotes] = useState([])
    const [notifications,setNotifications] = useState([])
    const [assignments,setAssignments] = useState([])
    const [notesModal,setNotesModal] = useState(false)
    const [notificationModal,setNotificationModal] = useState(false)
    const [title,setTitle] = useState('')
    const [subtitle,setSubtitle] = useState('')
    const [editModal,seteditModal] = useState(false)
    const [users,setUsers] = useState([])
    const [teacher,setTeacher] = useState()
    const [open,setOpen]  = useState('')

    const [currentNotification,setCurrentNotification] = useState({})
    const [currentNote,setCurrentNote] = useState({})
    const [currentAssignment,setCurrentAssignment] = useState({})

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [chat,setChat] = useState({})

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    const getClass = async() =>{
        console.log("Loading Again")
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
            url:`/user/class?id=${id}`,
            method:'GET'
        })
         console.log(response.data)
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
            setRoom(response.data.room)
            setNotes(response.data.room.notes)
            setAssignments(response.data.room.assignments)
            setNotifications(response.data.room.notifications)
            setTitle(response.data.room.title)
            setSubtitle(response.data.room.subtitle)
            setUsers(response.data.users)
            setTeacher(response.data.teacher)
            if(response.data.chat){
                setChat(response.data.chat)
            }
        }
    }
    useEffect(()=>{
        console.log(room)
        console.log('You are in Studnet Calss Details')
        getClass()
        return ()=>{
            setRoom(null)
        }
    },[])
    return (
        <Box style={{backgroundColor:'#131D25'}} minHeight={'100vh'} >
            {loading &&
                <Box 
                    style={{
                        position:'fixed',
                        left:0,
                        right:0,
                        top:0,
                        bottom:0,
                        display:'flex',
                        alignItems:'center',
                        justifyContent:'center'
                    }}
                >
                    <Spinner />
                </Box>
            }
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
                                            style={{cursor:'pointer',position:'relative',zIndex:33}}
                                        />
                                    </div>
                                </Grid>
                                <Grid item md={10}>
                                {room.subtitle ? <div className='class-detail-container'>
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
                <div>
                    {room && <Drawer 
                        toast={toast} 
                        room={room}
                        users = {users}
                        notifications={notifications}
                        assignments={assignments}
                        notes={notes}
                        teachers={room.owner}
                        chat={chat}
                        user={props.auth.user}
                        teacher={props.auth.teacher}
                    />}
                </div>
        </Box>
    )
}
const mapStateToProps = state => state

export default connect(mapStateToProps) (StudentClassDetails)
