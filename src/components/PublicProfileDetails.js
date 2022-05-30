import React from 'react'
import { Box, Text} from 'native-base'
import { Avatar } from '@mui/material'
function PublicProfileDetails({user}) {
    return (
        <Box>
            <Box
                style={{
                    marginTop: '100px',
                    backgroundColor: 'black',
                    width: '500px',
                    margin: 'auto',
                    borderRadius:5,
                    backgroundColor: '#1D242F',
                    boxShadow:'0px 0px 1px 0px rgba(255,255,255,0.85)'
                }}
            >
                {
                    ( user && user.profile && user.profile.avatar) ?
                    <Avatar 
                        src={user.profile.avatar}
                        sx={{
                            width:'200px',
                            height:'200px',
                            margin:'auto',
                            marginTop:5
                        }}
                    >
                    </Avatar>:
                    <Avatar
                    sx={{
                        width:'200px',
                        height:'200px',
                        margin:'auto',
                        marginTop:5,
                        fontSize: 70,
                        color: 'black',
                        fontWeight: 500
                    }}
                    >
                        {user && user.fullname && user.fullname[0].toUpperCase()}
                    </Avatar>
                }
                <div style={{
                    textAlign:'center',
                    marginBottom: '30px'
                }}>
                    <h2>{user.fullname && user.fullname.toUpperCase()}</h2>
                    <h4>@{user.username}</h4>
                    <p>{user.email}</p>
                    <p>{user.contact}</p>
                </div>   
            </Box>    
        </Box>
    )
}

export default PublicProfileDetails