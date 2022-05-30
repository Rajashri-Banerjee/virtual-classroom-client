import React,{ useState, useEffect } from 'react'
import { useClient, useMicAndCamTrack, config } from './../config'
import { AgoraVideoPlayer } from 'agora-rtc-react'
function Main() {
    const client = useClient()
    const { ready, tracks }  = useMicAndCamTrack()
    const [isReady,setIsReady] = useState(false)
    const [users,setUsers] = useState()
    useEffect(() => {
        const init = async(name)=>{
            client.on('user-published',async(user,mediaType)=>{
                await client.subscribe(user,mediaType)
                if(mediaType==='video'){
                    setUsers([...users, user])
                }
                if(mediaType==='audio'){
                    user.audioTrack.play()
                }
            })
            client.on('user-unpublished',async(user,mediaType)=>{
                if(mediaType==='audio'){
                    if(user.audioTrack) user.audioTrack.stop() 
                }
                if(mediaType==='video'){
                    setUsers(prevState =>{
                        return prevState.filter((User)=>User.uid !== user.uid)
                    })
                }
            })
            client.on('user-left',(user)=>{
                setUsers(prevState => {
                    return prevState.filter((User) => User.uid !== user.uid)
                })
            })
            try {
                await client.join('5bb916585a72434cac89bb7d3b4f5466','room',null,null)
            } catch (error) {
                console.log(error)
            }
            if(tracks){
                await client.publish([tracks[0],tracks[1]])
            }
            setIsReady(true)
        }
        if(ready && tracks){
            try {
                init()
            } catch (error) {
                console.log(error)
            }
        }
        return () => {
            
        };
    }, [ready,tracks,client]);
    
    return (
        <div>
            {console.log()}
        </div>
    )
}

export default Main