import React, { useEffect, useMemo, useRef, useState } from "react";
import ParticipantDetails from './components/ParticipantDetails'
import MeetingChat from './components/MeetingChat';
import ConnectionsView from './components/ConnectionsView';
import {
  MeetingProvider,
  useMeeting,
  useParticipant,
  useConnection,
  usePubSub,
} from "@videosdk.live/react-sdk";
import Fab from '@mui/material/Fab';
import { getToken } from "./api";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { JoiningScreen } from "./components/JoiningScreen";
import ReactPlayer from "react-player";
import Control from "./components/Control";
import ParticipantsView from './components/ParticipantsView';
import CommentIcon from '@mui/icons-material/Comment';
import CommentsDisabledIcon from '@mui/icons-material/CommentsDisabled';
const primary = "transparent";
const width = 400;
const height = (width * 2) / 3;
const borderRadius = 8;

const chunk = (arr) => {
  const newArr = [];
  while (arr.length) newArr.push(arr.splice(0, 3));
  return newArr;
};
function MeetingView({ onNewMeetingIdToken, onMeetingLeave }) {
  const [participantViewVisible, setParticipantViewVisible] = useState(true);
  const [showChat,setShowChat] = useState(false)
  function onParticipantJoined(participant) {
    console.log(" onParticipantJoined", participant);
  }
  function onParticipantLeft(participant) {
    console.log(" onParticipantLeft", participant);
  }
  const onSpeakerChanged = (activeSpeakerId) => {
    console.log(" onSpeakerChanged", activeSpeakerId);
  };
  function onPresenterChanged(presenterId) {
    console.log(" onPresenterChanged", presenterId);
  }
  function onMainParticipantChanged(participant) {
    console.log(" onMainParticipantChanged", participant);
  }
  function onEntryRequested(participantId, name) {
    console.log(" onEntryRequested", participantId, name);
  }
  function onEntryResponded(participantId, name) {
    console.log(" onEntryResponded", participantId, name);
  }
  function onRecordingStarted() {
    console.log(" onRecordingStarted");
  }
  function onRecordingStopped() {
    console.log(" onRecordingStopped");
  }
  function onChatMessage(data) {
    console.log(" onChatMessage", data);
  }
  function onMeetingJoined() {
    console.log("onMeetingJoined");
  }
  function onMeetingLeft() {
    console.log("onMeetingLeft");
    onMeetingLeave();
  }
  const onLiveStreamStarted = (data) => {
    console.log("onLiveStreamStarted example", data);
  };
  const onLiveStreamStopped = (data) => {
    console.log("onLiveStreamStopped example", data);
  };

  const onVideoStateChanged = (data) => {
    console.log("onVideoStateChanged", data);
  };
  const onVideoSeeked = (data) => {
    console.log("onVideoSeeked", data);
  };

  const onWebcamRequested = (data) => {
    console.log("onWebcamRequested", data);
  };
  const onMicRequested = (data) => {
    console.log("onMicRequested", data);
  };
  const onPinStateChanged = (data) => {
    console.log("onPinStateChanged", data);
  };
  const onSwitchMeeting = (data) => {
    window.focus();
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure you want to switch meeting ?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            onNewMeetingIdToken(data);
          },
        },
        {
          label: "No",
          onClick: () => { },
        },
      ],
    });
  };

  const onConnectionOpen = (data) => {
    console.log("onConnectionOpen", data);
  };

  const {
    meetingId,
    meeting,
    localParticipant,
    mainParticipant,
    activeSpeakerId,
    participants,
    presenterId,
    localMicOn,
    localWebcamOn,
    localScreenShareOn,
    messages,
    isRecording,
    isLiveStreaming,
    pinnedParticipants,
    //
    join,
    leave,
    connectTo,
    end,
    //
    startRecording,
    stopRecording,
    //
    respondEntry,
    //
    muteMic,
    unmuteMic,
    toggleMic,
    //
    disableWebcam,
    enableWebcam,
    toggleWebcam,
    //
    disableScreenShare,
    enableScreenShare,
    toggleScreenShare,
    //
    getMics,
    getWebcams,
    changeWebcam,
    changeMic,

    startVideo,
    stopVideo,
    resumeVideo,
    pauseVideo,
    seekVideo,
    startLivestream,
    stopLivestream,
  } = useMeeting({
    onParticipantJoined,
    onParticipantLeft,
    onSpeakerChanged,
    onPresenterChanged,
    onMainParticipantChanged,
    onEntryRequested,
    onEntryResponded,
    onRecordingStarted,
    onRecordingStopped,
    onChatMessage,
    onMeetingJoined,
    onMeetingLeft,
    onLiveStreamStarted,
    onLiveStreamStopped,
    onVideoStateChanged,
    onVideoSeeked,
    onWebcamRequested,
    onMicRequested,
    onPinStateChanged,
    onSwitchMeeting,
    onConnectionOpen,
  });

  const handlestartVideo = () => {
    console.log("handlestartVideo");

    startVideo({
      link: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    });
  };
  const handlestopVideo = () => {
    stopVideo();
  };
  const handleresumeVideo = () => {
    resumeVideo();
  };
  const handlepauseVideo = () => {
    pauseVideo({ currentTime: 2 });
  };
  const handlesseekVideo = () => {
    seekVideo({ currentTime: 5 });
  };
  const handleStartLiveStream = () => {
    startLivestream([
      {
        url: "rtmp://a.rtmp.youtube.com/live2",
        streamKey: "key",
      },
    ]);
  };
  const handleStopLiveStream = () => {
    stopLivestream();
  };
  const handleStartRecording = () => {
    startRecording();
  };
  const handleStopRecording = () => {
    stopRecording();
  };

  const tollbarHeight = 90;

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection:'row',
        position:'relative',
        left:0,
        right:0,
        top:0,
        bottom:'100px',
        padding:0,
        margin:0
      }}
    >
      {/* First Div */}
      <div
        style={{
          background:'#131D25',
          flex:1,
          padding:0,
          maring:0,
          overflowY:'auto',
          height:'calc(100vh - 80px)',
          position:'relative'
        }}
      >
        {participantViewVisible ? <ParticipantsView /> : <ConnectionsView />}
      </div>
      {/* SEcond div */}
      <div
        className={`live-chat-div ${!showChat? 'hide':''}`}      >
        <MeetingChat tollbarHeight={tollbarHeight} />
        <button
          onClick={()=>setShowChat(!showChat)}
          style={{
            position:'fixed',
            right:0,
            top:10,
            zIndex:100000584257741,
            outline:'none',
            border:'none',
            background:'transparent'
          }}
        >
          {  
            showChat ? 
            <Fab
              sx={{
                  backgroundColor:'transparent !important',
                  borderRadius:'50% !important',
                  position:'relative',
                  overFlow:'hidden'
              }}
            >
              <CommentsDisabledIcon sx={{color:'white', fontSize:'30px'}} size={50} />
            </Fab>:
            <Fab
              sx={{
                  backgroundColor:'transparent !important',
                  borderRadius:'50% !important',
                  position:'relative',
                  overFlow:'hidden'
              }}
            >
              <CommentIcon sx={{color:'white', fontSize:'30px'}} size={50} />
            </Fab>
          }
        </button>
      </div>
      <div
        style={{
          height:80,
          background:'#1D242F',
          position:'fixed',
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          justifyContent: 'center',
          borderTop: '1px solid #444444'
        }}
        className=''
      >
      <p 
        className='meeting_id'
        style={{color: '#ffffff'}}
      >Meeting ID : {meetingId} 
      </p>
        <Control 
          leave={leave}
          toggleMic={toggleMic} 
          toggleWebcam={toggleWebcam}
          toggleScreenShare={toggleScreenShare}
          localMicOn={localMicOn}
          localWebcamOn={localWebcamOn}
          localScreenShareOn={localScreenShareOn}
          muteMic={muteMic}
          unmuteMic={unmuteMic}
          disableWebcam={disableWebcam}
          enableWebcam={enableWebcam}
          disableScreenShare={disableScreenShare}
          enableScreenShare={enableScreenShare}
        />
      </div>

    </div>
  )
}

const App = ({admin,user,meeting_id,setMeetingIdUser}) => {
  console.log(user)
  const [token, setToken] = useState("");
  const [meetingId, setMeetingIds] = useState("");
  const [participantName, setParticipantName] = useState(user && user.fullname || "");
  const [micOn, setMicOn] = useState(false);
  const [webcamOn, setWebcamOn] = useState(false);
  const [isMeetingStarted, setMeetingStarted] = useState(false);
  const setMeetingId = (id)=>{
    console.log(id)
    setMeetingIds(id)
    if (setMeetingIdUser){
      setMeetingIdUser(id)
    }
  }
  return isMeetingStarted ? (
    <MeetingProvider
      config={{
        meetingId,
        micEnabled: micOn,
        webcamEnabled: webcamOn,
        name: participantName ? participantName : "TestUser",
      }}
      token={token}
      reinitialiseMeetingOnConfigChange={true}
      joinWithoutUserInteraction={true}
    >
      <MeetingView
        onNewMeetingIdToken={({ meetingId, token }) => {
          console.log(meetingId)
          setMeetingId(meetingId);
          setToken(token);
        }}
        onMeetingLeave={() => {
          setToken("");
          setMeetingId("");
          setWebcamOn(false);
          setMicOn(false);
          setMeetingStarted(false);
        }}
      />
    </MeetingProvider>
  ) : (
    <JoiningScreen
      participantName={participantName}
      setParticipantName={setParticipantName}
      meetinId={meetingId}
      setMeetingId={setMeetingId}
      setToken={setToken}
      setMicOn={setMicOn}
      micOn={micOn}
      webcamOn={webcamOn}
      setWebcamOn={setWebcamOn}
      onClickStartMeeting={() => {
        console.log(meetingId)
        setMeetingStarted(true);
      }}
      startMeeting={isMeetingStarted}
      admin={admin}
      user={user}
      meeting_id={meeting_id}
    />
  )
}
export default App;