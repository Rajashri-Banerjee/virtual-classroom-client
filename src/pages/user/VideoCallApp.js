import React, { useState, useEffect } from 'react'
import {Grid,Box,Typography} from '@mui/material'
import { useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import VideoCall from  '../../videocall/VideoCallApp'

function VideoCallApp(props) {
	console.log(props)
	const [inCall, setInCall] = useState(false);
	const [channelName, setChannelName] = useState("")
	const [meeting_id,setMeetingId] = useState("")
	const location = useLocation()
	const queryString = require('query-string');
	const search = queryString.parse(location.search);
	const [user,setUser] = useState(props.auth && props.auth.user || {})
	console.log(search)
	useEffect(()=>{
		if (search && search.meeting_id){
			setMeetingId(search.meeting_id)
		}
		
	},[search])
	return (
		<Box
			sx={{
				color: 'text.primary',
			}}
		>
			<VideoCall user = {user} meeting_id={meeting_id}/>
		</Box>
	)
}
const mapStateToProps = state =>state
export default connect(mapStateToProps)(VideoCallApp)//aur kuchh bakki hai//let me check