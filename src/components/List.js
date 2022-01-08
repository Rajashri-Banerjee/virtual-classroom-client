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
function List(props) {
    console.log(props.active)
    const [open,setOpen] = useState(false)
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
        props.setNotifications(assignments)
    }
    return (
        <Box width='100%'>
            {props.active ==='notifications' &&
                <div>
                    <div  className='notification-card flex sb' style={{background:'black',padding:'10px 20px'}} >
                        <p className='semi-bold'>Notifications</p>
                        <Button
                            // mr={'0px'}
                            leftIcon={<AddCircleIcon  sx={{ fontSize:28 }} />}
                            variant='outline'
                            _text={{color:'white'}}
                            borderColor='white'
                            _hover={{background:'black',borderColor:'white'}}
                            onPress={()=>props.setNotificationModal(true)}
                            // padding={0}
                        >
                            Add New 
                        </Button>
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
                            return <div  className='notification-card flex ac sb' >
                                <p className='roboto'> ➤ {notification.body}</p>
                                <DeleteIcon 
                                        sx={{marginTop:-2,cursor:'pointer',marginLeft:2}}
                                        onClick={()=>deleteHandler(notification)} 
                                        
                                    />
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
                        <Button
                            // mr={'0px'}
                            leftIcon={<AddCircleIcon  sx={{ fontSize:28 }} />}
                            variant='outline'
                            _text={{color:'white'}}
                            borderColor='white'
                            _hover={{background:'black',borderColor:'white'}}
                            onPress={()=>props.setNotificationModal(true)}
                            // padding={0}
                        >
                            Add New 
                        </Button>
                    </div>
                    <div className='empty-box'>
                        {/* <Center > */}
                            <p style={{textAlign:'center',color:'white'}} 
                            >Coming Soon...</p>
                        {/* </Center> */}
                    </div>
                </div> 

            }
            {props.active ==='notes' &&
                <div>
                    <div  className='notification-card flex sb' style={{background:'black',padding:'10px 20px'}} >
                        <p className='semi-bold'>Notes</p>
                        <Button
                            // mr={'0px'}
                            leftIcon={<AddCircleIcon  sx={{ fontSize:28 }} />}
                            variant='outline'
                            _text={{color:'white'}}
                            borderColor='white'
                            _hover={{background:'black',borderColor:'white'}}
                            onPress={()=>props.setNotesModal(true)}
                            // padding={0}
                        >
                            Add New 
                        </Button>
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
                            return <div  className='notification-card flex ac sb' >
                                <p className='roboto'> ➤ {note.title}</p>
                                <div className='flex ac sb' >
                                    <DownloadIcon
                                        sx={{marginTop:-2,cursor:'pointer'}} 
                                        onClick={()=>window.open(note.link)}  
                                    />
                                    <DeleteIcon 
                                        sx={{marginTop:-2,cursor:'pointer',marginLeft:2}}
                                        onClick={()=>notesDeleteHandler(note)} 
                                        
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
                            >Coming Soon...</p>
                        {/* </Center> */}
                    </div>
                </div> 
            }
            {props.active ==='chat' &&
                <div>
                    <div  className='notification-card flex sb' style={{background:'black',padding:'10px 20px'}} >
                        <p className='semi-bold'>Questionnaires</p>
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
                    <div className='empty-box'>
                        {/* <Center > */}
                            <p style={{textAlign:'center',color:'white'}} 
                            >Coming Soon...</p>
                        {/* </Center> */}
                    </div>
                </div> 

            }

        </Box>
    )
}

export default List