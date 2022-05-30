import React from 'react'
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
function ParticipantDetails({
    displayName,
    participant,
    webcamStream,
    micStream,
    screenShareStream,
    webcamOn,
    micOn,
    screenShareOn,
    isLocal,
    isActiveSpeaker,
    isMainParticipant,
    switchTo,
    pinState,
    setQuality,
    enableMic,
    disableMic,
    enableWebcam,
    disableWebcam,
    pin,
    unpin,}) {
    return (
        <div style={{
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            backgroundColor: '#1D242F',
            height: '50px'
        }}>
            <p className='control-icon2' >{displayName}</p>
            {
                micOn?
                <MicIcon className='control-icon3' style={{color: '#CECECE'}}/>:
                <MicOffIcon className='control-icon3' style={{color: '#CECECE'}}/>}
            {   
                webcamOn? 
                <VideocamIcon style={{color: '#CECECE'}}/>:
                <VideocamOffIcon style={{color: '#CECECE'}}/>
            }
            {/* <button onClick={()=>pin(true)}>pin</button> */}
        </div>
    )
}

export default ParticipantDetails