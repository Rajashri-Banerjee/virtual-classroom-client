import React,{useState} from 'react'
import {Box,Flex,Text,Button,Modal} from'native-base'
import {TiArrowSortedDown,TiArrowSortedUp} from 'react-icons/ti';
import {MdDelete} from 'react-icons/md';
import Ripples from 'react-ripples'
import Accordion from '@mui/material/Accordion';
import Typography from '@mui/material/Typography';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import {BsFileEarmarkPdf} from  'react-icons/bs';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LightModeIcon from '@mui/icons-material/LightMode';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import ChatBox from './ChatBox';
import AdminAssignmentList from './AdminAssignmentList';
import ViewListIcon from '@mui/icons-material/ViewList';
import { Link } from 'react-router-dom'

function List(props) {
    console.log(props.active)
    const [open,setOpen] = useState(false)
    const [assignmentList, setAssignmentList] = useState(false)
    const deleteHandler = (notification)=>{
        const notifications = props.notifications.filter((nt)=>{
            return nt!==notification
        })
        props.setNotifications(notifications)
        props.updateHandler({notification:notifications})
    }
    const notesDeleteHandler = (note)=>{
        const notes = props.notes.filter((nt)=>{
            return nt!==note
        })
        props.setNotes(notes)
        props.updateHandler({note:notes})
    }
    const assignmentsDeleteHandler =(assignment) =>{
        const assignments = props.assignments.filter((nt)=>{
            return nt!==assignment
        })
        props.setAssignments(assignments)
        props.updateHandler({assignment:assignments})
    }
    return (
        <Box width='100%'>
            {props.active ==='notifications' &&
                <div>
                    <div  className='flex sb notification-card' style={{background:'black'}} >
                        <p className='semi-bold'>Notifications</p>
                        <button
                            onClick={()=>props.setNotificationModal(true)}
                            className='add-new-btn'
                        >
                           {<AddCircleIcon  sx={{ fontSize:28, marginRight: '2px' }} />} Add New 
                        </button>
                    </div>
                    {props.notifications.length === 0 && 
                        <div className='empty-box'>
                            {/* <Center > */}
                                <p style={{textAlign:'center',color:'white'}} 
                                >You haven't shared any notifications to this class yet.</p>
                            {/* </Center> */}
                        </div>
                    }
                    {
                        props.notifications && props.notifications.map((notification,index)=>{
                            return <div  className='notification-card flex sb p20' >
                                <p className='roboto' style={{textAlign:'justify'}}> ➤ {notification.body}</p>
                                <div className='del-icon'>
                                <DeleteIcon 
                                        sx={{marginTop:1,cursor:'pointer', right:'25px'}}
                                        onClick={()=>deleteHandler(notification)}
                                    />
                                </div>
                                <span className='date-span'>   
                                    {new Date(notification.created_at).toString().split('GMT')[0]}
                                </span>
                            </div>
                        })
                    }
                </div> 

            }
            {props.active ==='assignments' &&
                <div>
                    <div  className='flex sb notification-card' style={{background:'black'}} >
                        <p className='semi-bold'>Assignments</p>
                        <button
                            // mr={'0px'}
                            onClick={()=>props.setAssignmentsModal(true)}
                            className='add-new-btn'
                            // padding={0}
                        >
                           {<AddCircleIcon  sx={{ fontSize:28, marginRight: '2px' }} />} Add New 
                        </button>
                    </div>
                    {props.assignments.length === 0 && 
                        <div className='empty-box'>
                            {/* <Center > */}
                                <p style={{textAlign:'center',color:'white'}} 
                                >You haven't shared any assignments to this class yet.</p>
                            {/* </Center> */}
                        </div>
                    }
                    {
                        props.assignments && props.assignments.map((assignment,index)=>{
                            return <div  className='notification-card flex ac sb assignment-card' >
                                <p className='roboto ass-title'> ➤ {assignment.title}</p>
                                <div className='flex ac sb' >
                                    <ViewListIcon
                                        sx={{cursor:'pointer',marginRight:2}} 
                                        onClick={()=>setAssignmentList(assignment)}  
                                    />
                                    <DownloadIcon
                                        sx={{cursor:'pointer'}} 
                                        onClick={()=>window.open(assignment.link)}  
                                    />
                                    <DeleteIcon 
                                        sx={{cursor:'pointer',marginLeft:2}}
                                        onClick={()=>assignmentsDeleteHandler(assignment)}  
                                    /> 
                                </div>
                            <div className='date'>
                                <span className='date-span date-span3'>   
                                    Shared at : {new Date(assignment.created_at).toString().split('GMT')[0]}
                                </span>
                                <span className='date-span2 date-span4'>   
                                   Deadline : {new Date(assignment.deadline).toString().split('GMT')[0]}
                                </span>
                            </div>
                        </div>
                        })
                    }
                </div> 
            }
            {props.active ==='notes' &&
                <div>
                    <div  className='notification-card flex sb' style={{background:'black'}} >
                        <p className='semi-bold'>Notes</p>
                        <button
                            // mr={'0px'}
                            className='add-new-btn'
                            onClick={()=>props.setNotesModal(true)}
                            // padding={0}
                        >
                           {<AddCircleIcon  sx={{ fontSize:28, marginRight: '2px' }} />} Add New 
                        </button>
                    </div>
                    {props.notes.length === 0 && 
                        <div className='empty-box'>
                            {/* <Center > */}
                                <p style={{textAlign:'center',color:'white'}} 
                                >You haven't shared any notes to this class yet.</p>
                            {/* </Center> */}
                        </div>
                    }
                    {
                        props.notes && props.notes.map((note,index)=>{
                            return <div  className='notification-card flex ac sb note' >
                                <p className='roboto'> ➤ {note.title}</p>
                                <div className='flex ac sb' >
                                    <DownloadIcon
                                        sx={{cursor:'pointer'}} 
                                        onClick={()=>window.open(note.link)}  
                                    />
                                    <DeleteIcon 
                                        sx={{cursor:'pointer',marginLeft:2}}
                                        onClick={()=>notesDeleteHandler(note)} 
                                        
                                    />
                                   
                                </div>
                                <div className="date">
                                    <span className='date-span'>   
                                        {new Date(note.created_at).toString().split('GMT')[0]}
                                    </span>
                                </div>
                                
                            </div>
                        })
                    }
                </div> 
            }
            {props.active ==='live-class' &&
                <div>
                    <div  className='notification-card flex sb' style={{background:'black',padding:'10px 20px'}} >
                        <p className='semi-bold'>Live Class</p>
                        
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', marginTop: '55px'}}>
                    <button style={{color: 'white', backgroundColor: 'black', width: '200px', fontSize: '20px', padding: '11px', borderRadius: '5px'}}>
                        <Link to={`/teacher/live-class?room_id=${props.room._id}`} style={{fontFamily: 'Roboto'}}>Go to Live Class</Link>
                    </button>
                    </div>
                </div> 

            }
            {props.active ==='quiz' &&
                <div>
                    <div  className='notification-card flex sb' style={{background:'black',padding:'10px 20px'}} >
                        <p className='semi-bold'>Quiz</p>
                        {/* <Button
                            // mr={'0px'}
                            leftIcon={<AddCircleIcon  
                            sx={{ fontSize:28 }} />}
                            variant='outline'
                            _text={{color:'white'}}
                            borderColor='white'
                            _hover={{background:'black',borderColor:'white'}}
                            // onPress={()=>props.setNotificationModal(true)}
                            // padding={0}
                        >
                            Add New 
                        </Button> */}
                    </div>
                    <div className='empty-box'>
                        {/* <Center > */}
                            <p style={{textAlign:'center',color:'white'}} 
                            >Upcoming Feature</p>
                        {/* </Center> */}
                    </div>
                </div> 
            }
            {props.active ==='chat' &&
                <div>
                    <div  className='notification-card flex sb' style={{background:'black',padding:'10px 20px'}} >
                        <p className='semi-bold'>Chat</p>
                        {/* <Button
                            // mr={'0px'}
                            leftIcon={<AddCircleIcon  sx={{ fontSize:28 }} />}
                            variant='outline'
                            _text={{color:'white'}}
                            borderColor='white'
                            _hover={{background:'black',borderColor:'white'}}
                            // onPress={()=>props.setNotificationModal(true)}
                            // padding={0}
                        >
                            Add New 
                        </Button> */}
                    </div>
                    <ChatBox chat={props.chat} user={props.user} room={props.room} admin />
                </div> 
            }
            <Modal isOpen = {assignmentList} onClose={()=>setAssignmentList(false)}>
                <Modal.Content style={{marginBottom:'auto',marginTop: 200}}>
                <Modal.CloseButton />
                    <Modal.Header>
                        Submitted Assignments
                    </Modal.Header>
                    <Modal.Body>
                        <AdminAssignmentList assignment={assignmentList} />
                    </Modal.Body>
                </Modal.Content>
            </Modal>
        </Box>
    )
}

export default List