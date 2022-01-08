import React,{useState} from 'react'
import axios from 'axios'
import {Box,Button,Text,Heading,Image,AspectRatio} from 'native-base'
import { BsThreeDotsVertical } from 'react-icons/bs';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import {CopyToClipboard} from 'react-copy-to-clipboard';
function StudentClassCard({room,teacher,setDel}) {
    const [open,setOpen] = useState(false)
    const navigate = useNavigate()
    const deleteHandler = async() => {
        const response = await axios({
            url:`http://localhost:3001/user/class/join`,
            method:'DELETE',
            data : {class_id:room._id}
        })
        setOpen(false)
        setDel(room._id)
    }
    return (
        <div className='classcard'>
            <div style={{position:'absolute',zIndex:'10',right:'10px',top:'10px'}}>
                {!open ?
                    <BsThreeDotsVertical 
                        size='25'
                        style={{
                            cursor:'pointer',
                            color: 'black',
                        }}
                        onClick={()=>{
                            setOpen(!open)
                        }}
                    />:
                    <AiOutlineCloseCircle 
                        size='25'
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
                <div 
                    style={{
                        position:'absolute',
                        zIndex:10,
                        right:'0px',
                        background:'white',
                        padding:'10px',
                        top:'35px',
                    }} 
                    className='chtoku'
                >
                    <li className='li' onClick={deleteHandler} >Exit Class</li>
                </div>
            }
            
            {room && <AspectRatio ratio={16 / 9}>
                <Image
                    source={{
                        uri:(room.poster && room.poster.uri) ||
                         'https://media.istockphoto.com/vectors/classroom-nobody-school-classroom-interior-with-teachers-desk-and-vector-id1130490883?k=20&m=1130490883&s=612x612&w=0&h=l_ZzLt51AARql4IhXhyjwNf_svNTxsnkRxpt6OOmerY='
                    }}
                    // alt={room.title}
                    // onClick={()=>{
                    //     navigate(`/teacher/update-class/${room._id}`)
                    // }}
                    onClick={()=>{
                        navigate(`/student/class-details/${room._id}`)
                    }}
                    cursor={'pointer'}
                />
            </AspectRatio>}
            {/* <Text 
                textAlign='center' 
                pt = '10px'
                pb='10px'
                fontWeight='700' 
                fontSize='20px'
                // onClick={()=>{
                //     navigate(`/teacher/update-class/${room._id}`)
                // }} 
                cursor={'pointer'}
            >
                {room.title}
            </Text> */}
            {room && <h2 className='h22' >
                {room.title}
            </h2>}
        </div>
    )
}

export default StudentClassCard
