import React from 'react'
import {
    AgoraVideoPlayer,
    createClient,
    createMicrophoneAndCameraTracks,
    createScreenVideoTrack
} from "agora-rtc-react";
function ScreenShare() {
    const screenTrack = createScreenVideoTrack()
    screenTrack()
    // useEffect(()=>{
        
    // },[])
    return (
        <h2>Killme</h2>
    )
}

export default ScreenShare