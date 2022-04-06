import React, { useEffect, useState } from 'react'
import {
    ClientConfig,
    IAgoraRTCRemoteUser,
    ICameraVideoTrack,
    IMicrophoneAudioTrack,
  } from "agora-rtc-sdk-ng";
  import {
    AgoraVideoPlayer,
    createClient,
    createMicrophoneAndCameraTracks,
  } from "agora-rtc-react";
  
const config = { 
    mode: "rtc", codec: "vp8",
  };

  
  const appId  = "ab9f49312ba24715b21f60b087856cb9"; //ENTER APP ID HERE
  const token = "006ab9f49312ba24715b21f60b087856cb9IAD5PIFrbullGkx+0lmUAgbe0XDp4qKgGyHL5M9qko5S4BKp9F8AAAAAEABgTjz6uOkqYgEAAQC+6Spi";


function VideoCall() {
const [inCall, setInCall] = useState(false);
const [channelName, setChannelName] = useState("");
  return (
    <div>
    <h1 className="heading">Agora RTC NG SDK React Wrapper</h1>
    {inCall ? (
      <VC setInCall={setInCall} channelName={channelName} />
    ) : (
      <ChannelForm setInCall={setInCall} setChannelName={setChannelName} />
    )}
  </div>
);
}

export default VideoCall

function VC(props) {
  const { setInCall, channelName } = props;
  const [users, setUsers] = useState([]);
  const [start, setStart] = useState(false);
  const useClient = createClient(config);
  const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();
  useEffect(() => {
    // function to initialise the SDK
    let init = async (name) => {
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        console.log("subscribe success");
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            return [...prevUsers, user];
          });
        }
        if (mediaType === "audio") {
          user.audioTrack?.play();
        }
      });

      client.on("user-unpublished", (user, type) => {
        console.log("unpublished", user, type);
        if (type === "audio") {
          user.audioTrack?.stop();
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

      await client.join(appId, name, token, null);
      if (tracks) await client.publish([tracks[0], tracks[1]]);
      setStart(true);

    };

    if (ready && tracks) {
      console.log("init ready");
      init(channelName);
    }

  }, [channelName, client, ready, tracks]);
  return (
    <div className="App">
      {ready && tracks && (
        <Controls tracks={tracks} setStart={setStart} setInCall={setInCall} />
      )}
      {start && tracks && <Videos users={users} tracks={tracks} />}
    </div>
  );
};

function ChannelForm(props) {
    const { setInCall, setChannelName } = props;

    return (
      <form className="join">
        {appId === '' && <p style={{color: 'red'}}>Please enter your Agora App ID in App.tsx and refresh the page</p>}
        <input type="text"
          placeholder="Enter Channel Name"
          onChange={(e) => setChannelName(e.target.value)}
        />
        <button onClick={(e) => {
          e.preventDefault();
          setInCall(true);
        }}>
          Join
        </button>
      </form>
    );
  };

function Controls(props) {
  const useClient = createClient(config);
  const client = useClient();
  const { tracks, setStart, setInCall } = props;
  const [trackState, setTrackState] = useState({ video: true, audio: true });
  
  const mute = async (type) => {
    if (type === "audio") {
      await tracks[0].setEnabled(!trackState.audio);
      setTrackState((ps) => {
        return { ...ps, audio: !ps.audio };
      });
    } else if (type === "video") {
      await tracks[1].setEnabled(!trackState.video);
      setTrackState((ps) => {
        return { ...ps, video: !ps.video };
      });
    }
  };
  
  const leaveChannel = async () => {
    await client.leave();
    client.removeAllListeners();
    tracks[0].close();
    tracks[1].close();
    setStart(false);
    setInCall(false);
  };

  return (
    <div className="controls">
      <p className={trackState.audio ? "on" : ""}
        onClick={() => mute("audio")}>
        {trackState.audio ? "MuteAudio" : "UnmuteAudio"}
      </p>
      <p className={trackState.video ? "on" : ""}
        onClick={() => mute("video")}>
        {trackState.video ? "MuteVideo" : "UnmuteVideo"}
      </p>
      {<p onClick={() => leaveChannel()}>Leave</p>}
    </div>
  );
};

function Videos(props) {
  const { users, tracks } = props;
  console.log(props);
  return (
    <div>
      <div id="videos">
        <AgoraVideoPlayer className='vid' videoTrack={tracks[1]} />
        {users.length > 0 &&
          users.map((user) => {
            if (user.videoTrack) {
              return (
                <AgoraVideoPlayer className='vid' videoTrack={user.videoTrack} key={user.uid} />
              );
            } else return null;
          })}
      </div>
    </div>
  );
};

