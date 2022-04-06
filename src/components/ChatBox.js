import React, { useState,useEffect } from 'react'
import axios from 'axios'
import MessageBox from './MessageBox';


function ChatBox({chat,user,room,admin}) {
    const [messages,setMessages] = useState([])
    const [message,setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const url = admin?'http://localhost:3001/teacher/message?room_id=':'http://localhost:3001/user/message?room_id='

    const getChatDetails = async(room_id) => {
        if(room && !room._id){
            return
        }
        setLoading(true);
        const data = {body:message,room_id:room._id}
        const response = await axios({
            url : url+room._id,
            method:'get',
            data
        })
        console.log(response.data)
        if(response.data && response.data.chatRoom){
            setMessages(response.data.chatRoom.messages)
            setMessage('')
        }
    setLoading(false);
    console.log(response.data)
    }
    const messageSendHandler = async() =>{
        if(room && !room._id){
            return
        }
    setLoading(true);
        const data = {body:message,room_id:room._id}
        const response = await axios({
            url : url,
            method:'post',
            data
        })
        if(response.data && response.data.chatRoom){
            setMessages(response.data.chatRoom.messages)
            setMessage('')
        }
    setLoading(false);
        console.log(response.data)
    }
    const messageDeleteHandler = async(data) => {
        if(!data){
            return;
        }
    setLoading(true);
        const response = await axios({
            url : url,
            method: 'delete',
            data
        })
        console.log(response.data)
        if(response.data && response.data.chatRoom){
            setMessages(response.data.chatRoom.messages)
        }
    setLoading(false);
    }
    useEffect(()=> {
        getChatDetails()
    },[])

    return (
        <div>
            {
                messages.map((message,index)=>{
                    return <MessageBox loading={loading} message={message} key={index} user={user} admin messageDeleteHandler={messageDeleteHandler}/>
                })
            }
            {
                console.log(messages)
            }
            <div className='input-container'>
                <input type="text" value={message} onChange={(e)=>setMessage(e.target.value)} className = 'message-text' />
                <input type='button' onClick={messageSendHandler} value='Send' className = 'message-send'/>
            </div>
        </div>
    )
}

export default ChatBox