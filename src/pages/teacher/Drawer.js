import React,{useState} from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import AddIcon from '@mui/icons-material/Add';
import Lists from '../../components/List'
// 
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DescriptionIcon from '@mui/icons-material/Description';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ForumIcon from '@mui/icons-material/Forum';
import VoiceChatIcon from '@mui/icons-material/VoiceChat';
import QuizIcon from '@mui/icons-material/Quiz';
import ParticipantsList from './ParticipantsList';
// const drawerWidth = 240;

const openedMixin = (theme) => ({
//   width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  position:'relative',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
    position:'relative',
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    position:'relative',
    zIndex: theme.zIndex.drawer + 1,
    // transition: theme.transitions.create(['width', 'margin'], {
    //     easing: theme.transitions.easing.sharp,
    //     duration: theme.transitions.duration.leavingScreen,
    // }),
    ...(open && {
        // marginLeft: drawerWidth,
        position:'relative',
        // width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
        }),
    }),

}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    // width: drawerWidth,
    // flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    position:'relative',
    ...(open && {
      ...openedMixin(theme),
       '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
       '& .MuiDrawer-paper': closedMixin(theme),
    }),
    position:'relative',
    backgroundColor: 'red',
  }),
);

export default function MiniDrawer({children,participantsList,users,setUsers,toast,room,notifications,setNotifications,assignments,setAssignments,notes,setNotes,setNotificationModal,setAssignmentsModal,setNotesModal,updateHandler,user}) {
    console.log(room)
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [active,setActive] = useState('notifications')

    const handleDrawerOpen = () => {
        setOpen(!open);
    };

    const handleDrawerClose = () => {
        setOpen(!open);
    };

  return (
    <Box sx={{ display: 'flex',position:'relative',justifyContent:'space-between'}} >
        <CssBaseline />
        
        <Drawer variant="permanent" 
        open={open}
        PaperProps={{
            sx: {
                backgroundColor: "#1D242F",
                color: "white",
            }
        }}
        >
            <DrawerHeader>
                <IconButton onClick={()=>setOpen(!open)}>
                    {open ? <KeyboardArrowLeftIcon sx={{color:'white'}}/> : <KeyboardArrowRightIcon sx={{color:'white'}}/>}
                </IconButton>
            </DrawerHeader>
            <Divider color='gray'/>
            <List>
                <ListItem style={{background:active==="notifications"?"black":"transparent"}} button key='Notifications' onClick={()=>setActive('notifications')}>
                    <ListItemIcon>
                        <NotificationsIcon sx={{color:'white'}}/>
                    </ListItemIcon>
                    <ListItemText primary='Notifications' />
                </ListItem>
                <ListItem style={{background:active==="assignments"?"black":"transparent"}} button key='Assignments' onClick={()=>setActive('assignments')}>
                    <ListItemIcon>
                        <AssignmentIcon sx={{color:'white'}}/>
                    </ListItemIcon>
                    <ListItemText primary='Assignments' />
                </ListItem>
                <ListItem style={{background:active==="notes"?"black":"transparent"}} button key='Notes' onClick={()=>setActive('notes')}>
                    <ListItemIcon>
                        <DescriptionIcon sx={{color:'white'}}/>
                    </ListItemIcon>
                    <ListItemText primary='Notes' />
                </ListItem>
                <ListItem style={{background:active==="live-class"?"black":"transparent"}} button key='Live-Class' onClick={()=>setActive('live-class')}>
                    <ListItemIcon>
                        <VoiceChatIcon sx={{color:'white'}}/>
                    </ListItemIcon>
                    <ListItemText primary='Live' />
                </ListItem>
                <ListItem style={{background:active==="quiz"?"black":"transparent"}} button key='Quiz' onClick={()=>setActive('quiz')}>
                    <ListItemIcon>
                        <QuizIcon sx={{color:'white'}}/>
                    </ListItemIcon>
                    <ListItemText primary='Quiz' />
                </ListItem>
                <ListItem style={{background:active==="chat"?"black":"transparent"}} button key='Questionnaires' onClick={()=>setActive('chat')}>
                    <ListItemIcon>
                        <ForumIcon sx={{color:'white'}}/>
                    </ListItemIcon>
                    <ListItemText primary='Chat' />
                </ListItem>
            </List>
        </Drawer>
      
        <div style={{
            width: `calc(100% - ${(open && open2)?400:(open || open2)?200:0}px)`
        }} >
        <Lists 
            title='Sometimes' 
            notifications={notifications} 
            setNotifications={setNotifications}
            assignments={assignments}
            setAssignments={setAssignments}
            notes ={notes}
            setNotes={setNotes}
            active={active}
            setNotificationModal={setNotificationModal}
            setNotesModal={setNotesModal}
            setAssignmentsModal={setAssignmentsModal}
            updateHandler={updateHandler}
            user={user}
            room={room}
            admin
        />
      </div>
      <Drawer 
      variant="permanent" 
      open={open2} 
        PaperProps={{
            sx: {
                backgroundColor: "#1D242F",
                color: "white",
            }
        }}
      >
            <DrawerHeader sx={{justifyContent:'space-around'}} >
                <IconButton onClick={()=>setOpen2(!open2)}>
                    {open2 ? 
                        <KeyboardArrowLeftIcon sx={{color:'white'}}/> : 
                        <KeyboardArrowRightIcon sx={{color:'white'}} />}
                </IconButton>
                {open2 && <p >Participants</p>}
                {room && open2 && <CopyToClipboard 
                                text={'http://localhost:3000/student/class/join/'+room._id}
                                onCopy={() => 
                                    toast.show({
                                        title:'Success',
                                        description:'Sharable link copied to clip-board',
                                        status:'success'
                                    })
                                }
                            >
                                <AddIcon
                                    // mt='10px' 
                                    // size={'25px'} 
                                    // style={{cursor:'pointer'}}
                                    // className='li'
                                    sx={{color:'white'}}
                                    style={{cursor:'pointer'}}
                                />
                            </CopyToClipboard>}
                
            </DrawerHeader>
            <Divider />
            <div className='' >
            </div>
            {/* <div className="participantsList">
                <User  user={{fullname:'Ravishankar'}} />
            </div> */}
            {participantsList && 
                <div>{participantsList}</div>
            }
            {/* {
                users.map((user,index)=><ParticipantsList user={user} key={index+1} />)
            } */}
            <CssBaseline />
             <Divider color="gray" />
            {users && <ParticipantsList setUsers={setUsers} users={users} open={open2} room={room} admin/>}
            
        </Drawer>
    </Box>
  );
}