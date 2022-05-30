import React, { useEffect, useState } from 'react'
import Controls from './Controls';
import Videos from './Videos';
import ScreenShare from './ScreenShare'
import { connect } from 'react-redux'
import {
    AgoraVideoPlayer,
    createClient,
    createMicrophoneAndCameraTracks,
} from "agora-rtc-react";
import {
    ClientConfig,
    IAgoraRTCRemoteUser,
    ICameraVideoTrack,
    IMicrophoneAudioTrack,
    AgoraRTCClient,
    createScreenVideoTrack
    
} from "agora-rtc-sdk-ng";
const config = {
    mode: "rtc",
    codec: "vp8",
};

const appId = "5ea52b755b674db9ab9eaefd1af8eb23"; //ENTER APP ID <HE></HE>E></HE>RE
const token = "0065ea52b755b674db9ab9eaefd1af8eb23IADCe9fTkTPILXnUGOdB1X/txUmEx+4UWGbVOUEcO6BG7j4vjswAAAAAEAC0lltguhKRYgEAAQC9EpFi";
function VideoCall(props) {
    console.log(props)
    const { setInCall, channelName, user } = props;
    const [users, setUsers] = useState([]);
    const [start, setStart] = useState(false);
    const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
    const { ready, tracks } = useMicrophoneAndCameraTracks();
    const [shareScreen,setShareScreen]  = useState(false)
    const useClient = createClient(config);
    const client = useClient();
    const shareScreenf = async(trackss)=>{
        
        try {
            const x = await createScreenVideoTrack()
            await client.join(appId, channelName, token, null);
            await client.publish([x]);
            console.log(x)
        } catch (error) {   
            console.log(error)
        }
    }
    client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        console.log("subscribe success");
        if (mediaType === "video") {
            setUsers((prevUsers) => {
                return [...prevUsers, user];
            });
        }
        if (mediaType === "audio") {
            user.audioTrack?.play()
        }
    });

    client.on("user-unpublished", (user, type) => {
        console.log("unpublished", user, type);
        if (type === "audio") {
            user.audioTrack?.stop()
        }
        if (type === "video") {
            setUsers((prevUsers) => {
                return prevUsers.filter((User) => User.uid !== user.uid);
            });
        }
    });

    client.on("user-left", (user) => {
        console.log("leaving", user);
        setUsers((prevUsers) => {
            return prevUsers.filter((User) => User.uid !== user.uid);
        }); 
    });
    let init = async (name) => {
        await client.join(appId, name, token, null);
        console.log(tracks)
        if (tracks) await client.publish([tracks[0], tracks[1]]);
        setStart(true);
    };
    useEffect(()=>{
        // if (ready && tracks) {
        //     console.log("init ready");
        //     init(channelName);
        // }
    },[ready])
    // useEffect(() => {
    //     // function to initialise the SDK
    // }, [channelName, client, ready, tracks]);
    return (
        <div>
            {ready && tracks && 
                <Controls 
                    tracks={tracks} 
                    setStart={setStart} 
                    setInCall={setInCall} 
                    useClient={useClient} 
                    shareScreen={shareScreen}
                    setShareScreen={setShareScreen}
                    shareScreenf={shareScreenf}
                />
            }
            {start && tracks && <Videos users={users} tracks={tracks}  />}
            <button onClick={()=>init(channelName)}>Join Now</button>

        </div>
    )
}
const mapStateToProps = state =>state
export default VideoCall