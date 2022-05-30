import React from 'react'
import { Box, Flex,Text,Button } from 'native-base'
import Ripples from 'react-ripples'
import { useNavigate, Link } from'react-router-dom'
import { MdPostAdd } from 'react-icons/md';
import { ImExit } from 'react-icons/im';
import { Typography, Avatar } from '@mui/material'
function Header({user,setCreateModal,createModal,dispatch, location}) {
    const navigate = useNavigate()
    const navigateHandler = () =>{
        localStorage.removeItem('teacher')
        dispatch({
            type : 'ADD_USER',
            user : null,
            aunthenticated_as : '',
            token : null
        })
        navigate('/')
    }
    return (
        <Box p='2' shadow={1}>
            <Flex direction='row' justify='space-between' >
                <Box>
                    {/* <Button
                        onPress={()=>setCreateModal(!createModal)}
                        textAlign={'center'}
                        pl='50px' pr='50px'
                    >
                        <Flex direction='row' justify={'center'} alignItems={'center'} >
                           
                            <Text color='white' fontSize='15px'fontWeight='bold' >Create A New Class </Text>
                            <MdPostAdd size={'30px'} color='white' />
                        </Flex>
                    </Button> */}
                    <div className="">
                        <img className='logo' src="https://i.ibb.co/jwBHMRv/logo-free-file.png" alt="logo"  onClick={()=>navigate('/')}  />
                    </div>
                
                </Box>
                <Flex direction='row' placeItems='center' alignItems='center'  >
                    <ul className='flex' >
                        <li className={`${location.pathname==='/' ? 'list active-list': 'list'}`}><Link to='/'>Home</Link></li>
                        <li className={`${location.pathname==='/teacher/dashboard' ? 'list active-list': 'list'}`}><Link to='/teacher/dashboard'>Dashboard</Link></li>
                        <li className='list' onClick={navigateHandler}>Logout</li>
                    </ul>
                    {/* <Box pr='10px' >
                         <p>{user.fullname}</p>  
                    </Box> */}
                    {(user.profile && user.profile.avatar )?
                        <Avatar 
                            sx={{ width: 50, height: 50,maring:'auto',cursor:'pointer' }}
                            src={user.profile.avatar}
                            onClick={()=>navigate('/teacher/profile')}
                        >
                        </Avatar> :
                        <Avatar 
                            sx={{ width: 50, height: 50,maring:'auto',cursor:'pointer' }}
                            onClick={()=>navigate('/teacher/profile')}
                        >
                            {user.username[0].toUpperCase()}
                        </Avatar>
                    }
                </Flex>
            </Flex>
        </Box>
    )
}

export default Header