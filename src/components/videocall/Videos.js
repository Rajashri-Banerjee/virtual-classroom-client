import React from 'react'
import {
    AgoraVideoPlayer,
    createClient,
    createMicrophoneAndCameraTracks,
} from "agora-rtc-react";
function Video(props) {
     const { users, tracks } = props;
     console.log(props)
    return (
        <div>
            <div id="videos">
                <AgoraVideoPlayer className='vid' videoTrack={tracks[1]} />
                {users.length > 0 &&
                    users.map((user,index) => {
                        console.log(user)
                        if (user.videoTrack) {
                            return (
                                <div>
                                    <AgoraVideoPlayer 
                                        className='vid' 
                                        videoTrack={user.videoTrack} 
                                        key = {index}
                                    />  

                                </div>
                                
                                
                            );
                        } else return null;
                    })
                }
            </div>
        </div>
    )
}
export default Video