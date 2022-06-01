import {Box,Text,Button,Flex,useToast,Modal,Center,Divider,Icon,Spinner} from 'native-base'
import React,{useState,useEffect} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import axios, { Axios } from 'axios'
import ClassCard from '../../components/ClassCard'
import Header from './Header'
import CreateClassForm from './CreateClassForm'
import { useLocation } from 'react-router-dom'
import {IoIosAddCircle} from 'react-icons/io'

function TeacherDashboard(props) {
    console.log(props)
    const location = useLocation()
    const [rooms,setRooms] = useState([])
    const toast = useToast()
    const [createModal,setCreateModal] = useState(false)
    const [del,setDel] = useState('')
    const [loading,setLoading] = useState(false)
    const fetchclasshandler = async() => {
        setLoading(true)
        const response = await axios ({
            url : "/teacher/classes",
            method : "GET",
            //headers : {
               // authorization : props.auth.token
            //}
        })
        if(response.data.error){
            // toast.show({
            //     title : 'ERROR!!!',
            //     description : response.data.error,
            //     status : 'error'
            // })
        } else{
            // toast.show({
            //     title : 'Success!!!',
            //     description : 'Class Fetched!',
            //     status : 'success',
            //     placement:'bottom-right'
            // })
        }
        if(response.data.classes){
            setRooms(response.data.classes)
        }
        setLoading(false)
    }
    useEffect(() => {
        fetchclasshandler()
        return 
    }, [createModal,del]);
    return (
        <Box >

            {props.auth.user && 
                <Header 
                    user={props.auth.user} 
                    setCreateModal={setCreateModal} 
                    createModal={createModal} 
                    dispatch={props.dispatch} 
                    location={location}
                />
            }
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
            <Divider />
            <div className="header-block flex sb ac">
                <h2 style={{paddingLeft:'20px', fontSize: '18px'}} >My Classes</h2>
                <div className="small-button-container">
                    <Button
                        mr={'10px'}
                        leftIcon={<IoIosAddCircle size='15px' />}
                        variant='outline'
                        _text={{color:'white'}}
                        borderColor='white'
                        _hover={{background:'black',borderColor:'white'}}
                        onPress={()=>setCreateModal(true)}
                    >Add New </Button>
                </div>
                
            </div>
            <div  className='classes-container' >
                <Flex direction = 'row' justify = 'center' flexWrap = 'wrap'>
                    {
                        rooms.map((room)=>{
                            return <ClassCard 
                                room = {room} 
                                key={room._id} 
                                setCreateModal={setCreateModal} 
                                setDel={setDel}
                            />
                        })
                    }
                </Flex>    
            </div>
            
            {/*  */}
            {!loading &&rooms.length === 0 && 
                <div className='empty-box'>
                    <Center >
                         <p  >You haven't created any classes yet.</p>
                    </Center>
                </div>
            }
            <Modal isOpen={createModal} onClose={()=>setCreateModal(false)} minHeight='1000vh'>
                <Modal.Content marginTop={200} marginBottom={'auto'} >
                <Modal.CloseButton />
                    <Modal.Header>
                        Class Details
                    </Modal.Header>
                    <Modal.Body>
                        <CreateClassForm token ={props.auth.token} setCreateModal={setCreateModal} />
                    </Modal.Body>
                </Modal.Content>

            </Modal>

        </Box>
    )
}
const mapStateToProps = state => state

export default connect(mapStateToProps) (TeacherDashboard)
