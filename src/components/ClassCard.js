import React,{useState} from 'react'
import axios from 'axios'
import {Box,Button,Text,Heading,Image,AspectRatio} from 'native-base'
import { BsThreeDotsVertical } from 'react-icons/bs';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import {CopyToClipboard} from 'react-copy-to-clipboard';

function ClassCard(props) {
    const [open,setOpen] = useState(false)
    const deleteHandler = async() => {
        const response = await axios({
            url:`http://localhost:3001/teacher/class`,
            method:'DELETE',
            data : {_id:props.room._id}
        })
        setOpen(false)
        props.setDel(props.room._id)
        console.log(response.data)
    }
    const navigate = useNavigate() 
    console.log(props)
    return (
        <div 
            mt='10px' 
            bg = 'white' 
            shadow='1' 
            width = '335px'  
            m='10px'  
            borderRadius ='3px'
            position='relative'
            zIndex={1}
            overflow={'hidden'}
            borderRadius={5}
            className='classcard'
            
        >
            <div style={{position:'absolute',zIndex:'10',right:'10px',top:'10px'}}>
                {!open ?
                    <BsThreeDotsVertical 
                        size='25'
                        color='black'
                        style={{
                            cursor:'pointer'
                        }}
                        onClick={()=>{
                            setOpen(!open)
                        }}
                    />:
                    <AiOutlineCloseCircle 
                        size='25'
                        color='black'
                        style={{
                            cursor:'pointer'
                        }}
                        onClick={()=>{
                            setOpen(!open)
                        }}
                    />
                }
            </div>
            {open && 
                <div style={{
                    position:'absolute',
                    zIndex:10,
                    right:'0px',
                    background:'white',
                    // padding:'10px',
                    top:'35px',
                
                }} 
                    className='chtoku'
                >
                    <CopyToClipboard 
                        text={'http://localhost:3000/student/class/join/'+props.room._id}
                        onCopy={() => setOpen(false)}
                    >
                    <li className='li'>Copy Class Link</li>
                    </CopyToClipboard>

                    <li className='li' onClick={()=>deleteHandler()}>Delete</li>
                </div>
            }
            <AspectRatio ratio={16 / 9}  >
                {/* <Image
                    source={{
                        uri:props.room.poster ||
                         'https://static.vecteezy.com/system/resources/previews/002/659/280/non_2x/education-online-student-girl-and-teacher-in-class-virtual-books-vector.jpg'
                    }}
                    alt={props.title}
                    onClick={()=>{
                        navigate(`/teacher/update-class/${props.room._id}`)
                    }}
                    cursor={'pointer'}
                /> */}
                <img 
                    src={
                        (props.room.poster && props.room.poster.uri) ||
                        'https://media.istockphoto.com/vectors/classroom-nobody-school-classroom-interior-with-teachers-desk-and-vector-id1130490883?k=20&m=1130490883&s=612x612&w=0&h=l_ZzLt51AARql4IhXhyjwNf_svNTxsnkRxpt6OOmerY='
                    } 
                    alt={props.room.title}
                    width='100%'
                    height='100%'
                    onClick={()=>{
                        navigate(`/teacher/update-class/${props.room._id}`)
                    }}
                    style={{cursor:'pointer',position:'relative',zIndex:33}}
                />
            </AspectRatio>
            {/* <Text 
                textAlign='center' 
                pt = '10px'
                pb='10px'
                fontWeight='700' 
                fontSize='20px'
                onClick={()=>{
                    navigate(`/teacher/update-class/${props.room._id}`)
                }} 
                cursor={'pointer'}
            >
                {props.room.title}
            </Text> */}
            <h2 className='h22' >
                {props.room.title}
            </h2>
        </div>
    )
}

export default ClassCard
