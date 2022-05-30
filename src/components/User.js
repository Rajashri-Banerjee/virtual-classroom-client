import React,{useState} from 'react'
import axios from 'axios'
import {Box,Flex,Button,useToast} from 'native-base'
import { Typography, Avatar} from '@mui/material'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

function User({user,open,room,admin,setUsers}) {
    const [loading,setLoading] = useState(false)
    const toast = useToast()
    const deleteHandler = async()=>{
        setLoading(true)
        const response = await axios ({
            url: '/teacher/remove-participant',
            method: 'DELETE',
            data: {
                room_id: room._id,
                user_id: user._id
            } 
        })  
        setLoading(false)
        if (response.data && response.data.users){
            setUsers(response.data.users)
        }
        toast.show({
            title : 'Success!!!',
            description : 'Participant removed successfully!',
            status : 'success',
            duration : 1500
        })
        console.log(response.data)
    }
    return (
        <div 
            className='participants-card'
            style={{background:open?'black':'inherit'}}
        >
            <div style={{marginRight:'10px'}}>
                {
                   ( user && user.profile && user.profile.avatar) ?
                   <Avatar src={user.profile.avatar}></Avatar>:
                   <Avatar>{user && user.fullname[0].toUpperCase()}</Avatar>
                }
                
            </div>
            <div>
                <p 
                    onClick={()=>window.open("/profile?_id="+user._id)} 
                    style={{cursor:'pointer'}}
                >
                    {user && user.fullname}
                </p>
            </div> 
            {admin && 
                <RemoveCircleOutlineIcon
                    sx={{cursor:'pointer',marginLeft:'10px'}} 
                    onClick={deleteHandler}  
                />
            }
        </div>
    )
}

export default User

