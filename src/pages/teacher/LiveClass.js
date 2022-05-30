import React,{useState,useEffect} from 'react'
import axios from 'axios'
import queryString from 'query-string'
import { useLocation } from 'react-router-dom'
import VideoCallApp from '../../videocall/VideoCallApp'
import { Button } from 'native-base'
import { connect } from 'react-redux'

function LiveClass(props) {
    console.log(props)
    const [room,setRoom] = useState(null)
    const [meeting_id,setMeetingId] = useState('')
    const location = useLocation()
    const search = queryString.parse(location.search)
    const [loading,setLoading] = useState(false)
    const [open,setOpen] = useState(false)
    const getClassRoom = async()=>{
        setLoading(true)
        if(search && search.room_id){
            const response = await axios({
                url:'/teacher/class?id='+search.room_id,
                method:'get'
            })
            console.log(response)
            if (response.data && response.data.room){
                setRoom(response.data.room)
                if(response.data.room && response.data.room.meeting_id){
                    setMeetingId(response.data.room.meeting_id)
                }
            }
        }
        setLoading(false)
    }
    const updateRoomMeeting  = async()=>{
        console.log(search)
        if (!search && !search.room_id) return
        setLoading(true)
        const response = await axios({
            url:'/teacher/update-meeting',
            method:'POST',
            data:{
                room_id: search.room_id,
                meeting_id
            }
        })
        setLoading(false)
        console.log(response.data)
    }
    useEffect(()=>{
        getClassRoom()
    },[])
    return (
        <div style={{
            position:'relative'
        }}>
            <div
                style={{
                    position:'absolute',
                    right:'0px',
                    display:'flex',
                    margin:5,
                    background:'#0000',
                    borderRadius:5,
                    overflow:'hidden',
                    alignItems: 'center',
                    padding: '10px',
                    flexDirection: 'column',
                    height: '140px',
                    justifyContent: 'space-around'
                }}
            >
                <label style={{color: 'white', fontFamily: 'Verdana'}}>New Meeting ID :</label>
                <input 
                    value={meeting_id} 
                    onChange={(e)=>setMeetingId(e.target.value)} 
                    style={{
                        outline:'none',
                        border: '1px solid white',
                        padding:'10px 5px 10px 5px',
                        textAlign: 'center',
                        marginLeft: '10px',
                        background: 'transparent',
                        color: 'white',
                        borderRadius: '5px',
                        fontSize: '15px'
                    }}
                />
                <Button 
                    isLoading={loading}
                    onPress={updateRoomMeeting}
                    variant='ghost'
                    backgroundColor = 'black'
                    _text={{
                        color: "white",
                        fontSize: "15px"
                      }}
                    width = '100px'
                    height = '40px'
                    marginLeft='6px'
                   
                >Share</Button>
            </div>
            <VideoCallApp 
                admin 
                setMeetingIdUser={setMeetingId} 
                meeting_id={meeting_id} 
                user = {props.auth && props.auth.user || {}}
            />   
        </div>
    )
}
const mapStateToProps = state =>state 
export default connect(mapStateToProps)(LiveClass) 