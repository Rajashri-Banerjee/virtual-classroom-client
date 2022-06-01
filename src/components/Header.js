import { Box, Modal } from 'native-base'
import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'



function Header({location}) {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)

    useEffect(()=>{
    },[location])
    return (
        <div className='flex wrap sb header ac' >
            <div>
                <img className='logo' src="https://i.ibb.co/jwBHMRv/logo-free-file.png" alt="logo"  />
            </div> 

            <div> 
                <ul className='flex'
                    style={{
                        
                    }}
                >
                    <li className={`${location.pathname==='/' ? 'list active-list': 'list'}`}>
                        <Button className='login-btn-home'
                            style={{
                                textTransform: 'none',
                                color: 'white',
                                fontFamily: 'Poppins',
                            }}
                        >
                         Home   
                        </Button>
                    </li>
                    {/* <li className='list'>About Us</li> */}
                    <li 
                        className='list' 
                    >
                        <Button className='login-btn-home'
                            onClick={()=>setOpen(true)}
                            style={{
                                textTransform: 'none',
                                color: 'white',
                                fontFamily: 'Poppins'
                            }}
                        >
                            Login
                        </Button>
                    </li>
                </ul>
            </div>
                <Modal isOpen={open} onClose={() => setOpen(false)}>
                    <Modal.Content maxWidth="400px"  marginTop='200' marginBottom='auto'>
                        <Modal.CloseButton colorScheme= 'coolGray' _icon={{color:'coolGray.400',size:3}}  />
                        <Modal.Header  >Login as : </Modal.Header>
                        <Modal.Body>
                            <button 
                                className='home-modal-btn' 
                                onClick={()=>navigate('/login')} 
                                data-ripple-light="true"
                            >
                                Student
                            </button>
                            <button 
                                className='home-modal-btn' 
                                onClick={()=>navigate('/teachers/login')} 
                            >
                                Teacher
                            </button>
                        </Modal.Body>
                    </Modal.Content>
                </Modal>
            
        </div>
    )
}

export default Header
