import React from 'react'
import User from '../../components/User'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
function ParticipantsList({users,open}) {
    return (
        <div style={{marginTop:'10px'}} >
            {(users && users.length) > 0 ?
                users.map((user,index)=>{
                    return <User user = {user} open={open} />
                }):
                <div style={{display:'flex',justifyContent:'center'}} >
                    {!open && <PeopleAltIcon sx={{color:'white'}} />}
                    {open && <p>No Participants To Show</p>}
                </div>
            }
        </div>
    )
}

export default ParticipantsList
