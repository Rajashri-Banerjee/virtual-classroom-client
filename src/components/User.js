import React from 'react'
import {Box,Flex} from 'native-base'
import { Typography, Avatar} from '@mui/material'

function User({user,open}) {
    return (
        <div 
            className='participants-card'
            style={{background:open?'black':'inherit'}}
        >
            <div style={{marginRight:'10px'}}>
                <Avatar>{user && user.fullname[0].toUpperCase()}</Avatar>
            </div>
            <div>
                <p  >{user && user.fullname}</p>
            </div> 
            
        </div>
    )
}

export default User

