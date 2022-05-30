import React,{useEffect} from 'react'
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import LogoutIcon from '@mui/icons-material/Logout';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
function Control({ 
    leave, 
    localMicOn,
    localWebcamOn,      
    localScreenShareOn,
    muteMic,
    unmuteMic,
    disableWebcam,
    enableWebcam,
    disableScreenShare,
    enableScreenShare,}) {
    // console.log()
    useEffect(()=>{
        return ()=>{
            leave()
        }
    },[])
    return (
        <Box 
            sx={{
                // background:'white',
                width:'300px',
                display:'flex',
                justifyContent:'space-around',
                position:'relative',
                alignItems:'center'
            }}
            
        >
            {   
                localMicOn ?
                <Fab 
                    sx={{
                        backgroundColor:'white !important',
                        borderRadius:'50% !important',
                        position:'relative',
                        overFlow:'hidden'
                    }}
                >
                    <MicIcon onClick={muteMic} />
                </Fab> :
                <Fab 
                    onClick={unmuteMic}
                    sx={{
                        backgroundColor:'white !important',
                        borderRadius:'50% !important',
                        position:'relative',
                        overFlow:'hidden'
                    }}
                >
                    <MicOffIcon className='control-icon'/>
                </Fab> 
            }
            {
                localWebcamOn ? 
                <Fab 
                    sx={{
                        backgroundColor:'white !important',
                        borderRadius:'50% !important',
                        position:'relative',
                        overFlow:'hidden'
                    }}
                    onClick={disableWebcam}
                >
                    <VideocamIcon className='control-icon'/>
                </Fab> :
                <Fab 
                    onClick={enableWebcam}
                    sx={{
                        backgroundColor:'white !important',
                        borderRadius:'50% !important',
                        position:'relative',
                        overFlow:'hidden'
                    }}
                >
                    <VideocamOffIcon className='control-icon'/>
                </Fab> 
                
            }
            {
                localScreenShareOn ? 
                <Fab 
                    onClick={disableScreenShare}    
                    sx={{
                        backgroundColor:'white !important',
                        borderRadius:'50% !important',
                        position:'relative',
                        overFlow:'hidden'
                    }}
                >
                    <CancelPresentationIcon className='control-icon'/>
                </Fab> :
                <Fab 
                    onClick={enableScreenShare}
                    sx={{
                        backgroundColor:'white !important',
                        borderRadius:'50% !important',
                        position:'relative',
                        overFlow:'hidden'
                    }}
                >
                    <ScreenShareIcon className='control-icon'/>
                </Fab> 
            }
            <Fab 
                sx={{
                    backgroundColor:'white !important',
                    borderRadius:'50% !important',
                    position:'relative',
                    overFlow:'hidden'
                }}
                >
                    <LogoutIcon onClick={leave}className='control-icon'/>
                </Fab> 
        </Box>
    )
}

export default Control