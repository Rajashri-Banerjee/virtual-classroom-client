import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {Text,Flex,Button,Center} from 'native-base'
import StudentClassCard from '../../components/StudentClassCard'
import {FiRefreshCcw} from 'react-icons/fi'

function Classes() {
    const [classes,setClasses] = useState([])
    const [del,setDel] = useState('')
    const [loading,setLoading] = useState(false)

    const fetchclasshandler = async()=> {
        setLoading(true)
        const response = await axios({
            url : 'http://localhost:3001/user/classes',
            method : 'GET'
        })
        console.log(response.data)
        if(response.data.error){
            
        }
        else {
            if(response.data.user && response.data.user.classes) {
                setClasses(response.data.user.classes)
            }
        }
        setLoading(false)
    }
    useEffect(()=>{
        fetchclasshandler()
    },[del])
    return (
        <div>
            
            <div className="header-block flex sb ac">
                <h2 style={{paddingLeft:'20px'}} >My Classes</h2>
                <div className="small-button-container">
                    <Button
                        mr={'20px'}
                        leftIcon={<FiRefreshCcw size='30px' />}
                        variant='outline'
                        _text={{color:'white'}}
                        borderColor='white'
                        _hover={{background:'black',borderColor:'white'}}
                        onPress={fetchclasshandler}
                        isLoading={loading}
                        isLoadingText='Refreshing...'
                    >Refresh </Button>
                </div>
                
            </div>

            {classes.length === 0 && 
                <div className='empty-box'>
                    <Center >
                         <p  >You haven't joined any classes yet.</p>
                    </Center>
                </div> }
                
            <Flex direction='row' flexWrap={'wrap'} justify={'center'}>
                {
                    classes.map((room)=>{
                        return <StudentClassCard 
                            room={room.class} 
                            teacher={room.teacher} 
                            setDel={setDel} 
                            
                        />
                    })
                }    
            </Flex>
        </div>
    )
}

export default Classes
