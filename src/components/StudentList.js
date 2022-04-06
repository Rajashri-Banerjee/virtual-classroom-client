import React,{useState} from 'react'
import {Box,Flex,Text,Button} from'native-base'
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
import AssignmentList from './AssignmentList';

function StudentList(props) {
    const [open,setOpen] = useState(false)

    return (
        <Box width='100%'>
            {props.active ==='notifications' &&
                <div>
                    <div  className='notification-card flex sb' style={{background:'black',padding:'10px 20px'}} >
                        <p className='semi-bold'>Notifications</p>
                        
                    </div>
                    {props.notifications.length === 0 && 
                        <div className='empty-box'>
                                <p style={{textAlign:'center',color:'white'}} >
                                    No notifications have been shared to this class yet.
                                </p>
                        </div>
                    }
                    {
                        props.notifications && props.notifications.map((notification,index)=>{
                            return <div  className='notification-card flex ac sb' >
                                <p className='roboto'> ➤ {notification.body}</p>
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
                    <div  className='notification-card flex sb' style={{background:'black',padding:'10px 20px'}} >
                        <p className='semi-bold'>Assignments</p>
                    </div>
                    <AssignmentList assignments={props.assignments} user={props.user} />
                    {console.log(props)}
                </div> 
            }
            {props.active ==='notes' &&
                <div>
                    <div  className='notification-card flex sb' style={{background:'black',padding:'10px 20px'}} >
                        <p className='semi-bold'>Notes</p>
                        
                    </div>
                    {props.notes.length === 0 && 
                        <div className='empty-box'>
                            {/* <Center > */}
                                <p style={{textAlign:'center',color:'white'}} 
                                >No notes have been shared to this class yet.</p>
                            {/* </Center> */}
                        </div>
                    }
                    {
                        props.notes && props.notes.map((note,index)=>{
                            return <div  className='notification-card flex ac sb' >
                                <p className='roboto'> ➤ {note.title}</p>
                                <div className='flex ac sb' >
                                    <DownloadIcon
                                        sx={{marginTop:-2,cursor:'pointer'}} 
                                        onClick={()=>window.open(note.link)}  
                                    />
                                </div>
                                
                                <span className='date-span'>   
                                    {new Date(note.created_at).toString().split('GMT')[0]}
                                </span>
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
                    <div className='empty-box'>
                        {/* <Center > */}
                            <p style={{textAlign:'center',color:'white'}} 
                            >Coming Soon...</p>
                        {/* </Center> */}
                    </div>
                </div> 

            }
            {props.active ==='quiz' &&
                <div>
                    <div  className='notification-card flex sb' style={{background:'black',padding:'10px 20px'}} >
                        <p className='semi-bold'>Quiz</p>
                    </div>
                    <div className='empty-box'>
                        {/* <Center > */}
                            <p style={{textAlign:'center',color:'white'}} 
                            >Coming Soon...</p>
                        {/* </Center> */}
                    </div>
                </div> 
            }
            {props.active ==='chat' &&
                <div>
                    <div  className='notification-card flex sb' style={{background:'black',padding:'10px 20px'}} >
                        <p className='semi-bold'>Chat</p>
                    </div>
                    <ChatBox chat={props.chat} user={props.user} room={props.room} />
                </div> 
            }
        </Box>
    )
}

export default StudentList
