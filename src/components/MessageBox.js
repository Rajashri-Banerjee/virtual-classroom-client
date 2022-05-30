import React from 'react'
import {Button} from 'native-base'
import DeleteIcon from '@mui/icons-material/Delete';
function MessageBox({message,user,messageDeleteHandler,loading,admin,dloading}) {
    console.log(message,user)
    return (
        <div className='message-box'>
           {message.user && message.user.fullname &&  <p className='message-username' >{message.user.fullname}</p>}
           {message.admin && message.admin.fullname &&  <p className='message-username' >{message.admin.fullname}(ADMIN)</p>}
           {message.created_at &&  <p className='message-date' >{new Date(message.created_at).toString().split('GMT')[0]}</p>}
            <p className='message-body'>{message.body}</p>
            {
                user && user._id && message && message.user && message.user._id && message.user._id === user._id && 
                <Button
                    style={{cursor:'pointer', position:'absolute', bottom: 12, right: 10}}
                    onPress={()=>messageDeleteHandler(message)} 
                    variant='ghost'
                    isLoading = {message._id.toString()===dloading.toString()}
                    leftIcon={
                    <DeleteIcon 
                        style={{color : 'white', fontSize : '20px'}}
                    />
                    }
                >
                </Button>

            }
            {
                user && user._id && message && message.admin && message.admin._id && message.admin._id === user._id && 
                <Button
                    style={{cursor:'pointer', position:'absolute', bottom: 12, right: 10}}
                    onPress={()=>messageDeleteHandler(message)} 
                    variant='ghost'
                    isLoading = {message._id.toString()===dloading.toString()}
                    leftIcon={
                    <DeleteIcon 
                        style={{color : 'white', fontSize : '20px'}}
                    />
                    }
                >
                </Button>
            }
        </div>
    )
}

export default MessageBox