import {
  MeetingProvider,
  useMeeting,
  useParticipant,
  useConnection,
  usePubSub,
} from "@videosdk.live/react-sdk";
import ReactPlayer from "react-player";
import React, { useEffect, useMemo, useRef, useState } from "react";
import PushPinIcon from '@mui/icons-material/PushPin';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import ParticipantDetails from './ParticipantDetails'
const primary = "transparent";
const width = 400;
const height = (width * 2) / 3;
const borderRadius = 8;
const ParticipantView = ({ participantId }) => {
  const webcamRef = useRef(null);
  const micRef = useRef(null);
  const screenShareRef = useRef(null);
  const [fullScreen,setFullScreen] = useState(false)
  const onStreamEnabled = (stream) => { };
  const onStreamDisabled = (stream) => { };
  const {
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
    unpin,
  } = useParticipant(participantId, {
    onStreamEnabled,
    onStreamDisabled,
  });
  const webcamMediaStream = useMemo(() => {
    if (webcamOn) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      return mediaStream;
    }
  }, [webcamStream, webcamOn]);

  const screenShareMediaStream = useMemo(() => {
    if (screenShareOn) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(screenShareStream.track);
      return mediaStream;
    }
  }, [screenShareStream, screenShareOn]);

  useEffect(() => {
    if (micRef.current) {
      if (micOn) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);

        micRef.current.srcObject = mediaStream;
        micRef.current
          .play()
          .catch((error) =>
            console.error("mic  play() failed", error)
          );
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [micStream, micOn]);
  return (
    <div
      style={{
        // width:600,
        backgroundColor: primary,
        borderRadius: borderRadius,
        // overflow: "hidden",
        // padding: borderRadius,
        display: "flex",
        flexWrap:'wrap',
        flexDirection: "row",
        position: "relative",
        alignItems:'center',
        // maxWidth:650,
        // background:"green"
        // margin:"10px"
      }}
      className='videos-div'
    >        
      <div>
        <audio ref={micRef} autoPlay muted={isLocal} style={{display:'none'}} class='fun' />
        <div
          style={{
            position: "relative",
            borderRadius: borderRadius,
            overflow: "hidden",
            backgroundColor: "black",
            display:'flex',
            margin:'10px 30px'
          }}
          className='live-video'
        >
          <div
            style={{ 
              position: fullScreen?"fixed":'absolute', 
              top: 0, left: 0, right: 0, bottom: 0 ,zIndex:3300443, background : 'black'
            }}
          >
            <button 
            style={{
              position:'absolute',
              zIndex:3300449,
              background : 'transparent',
              cursor : 'pointer',
              marginTop : '10px',
              border: 'none'
            }}
            onClick={()=>{
              console.log('button clicked')
              setFullScreen(!fullScreen)
            }}
          >{fullScreen?<PushPinIcon style={{color: 'white'}}/>:<PushPinOutlinedIcon style={{color: 'white'}}/>}</button>
            <>
              <ReactPlayer
                ref={webcamRef}
                //
                playsinline // very very imp prop
                playIcon={<></>}
                //
                pip={false}
                light={false}
                controls={false}
                muted={true}
                playing={true}
                //
                url={webcamMediaStream}
                //
                height={"100%"}
                width={"100%"}
                onError={(err) => {
                  console.log(err, "Participant video error");
                }}
              />
            </>
            <div
              style={{
                position: "absolute",
                right: 0,
                left:'0px',
                bottom:'0px',
                color:'white'
              }}
            >
              <ParticipantDetails
                displayName={displayName}
                participant={participant}
                webcamStream={webcamStream}
                micStream={micStream}
                screenShareStream={screenShareStream}
                webcamOn={webcamOn}
                micOn={micOn}
                screenShareOn={screenShareOn}
                isLocal={isLocal}
                isActiveSpeaker={isActiveSpeaker}
                isMainParticipant={isMainParticipant}
                enableMic={enableMic}
                pinState={pinState}
                disableWebcam={disableWebcam}
                pin={pin}
                unpin={unpin}
                disableMic={disableMic}
              />
            </div>
          </div>
        </div>
      </div>
      {screenShareOn && 
      <div
        style={{
          // marginTop: borderRadius,
          position: "relative",
          borderRadius: borderRadius,
          overflow: "hidden",
          backgroundColor: "black",
        }}
        className='live-video scr'
      >
        <div
          style={{ 
            position: fullScreen?"fixed":'absolute', 
            top: 0, left: 0, right: 0, bottom: 0 ,zIndex:3300444, background : 'black'
          }}
        >
          <button 
            style={{
              position:'absolute',
              zIndex:3300449,
              background : 'transparent',
              cursor : 'pointer',
              marginTop : '10px',
              border: 'none'
            }}
            onClick={()=>{
              console.log('button clicked')
              setFullScreen(!fullScreen)
            }}
          >{fullScreen?<PushPinIcon style={{color: 'white'}}/>:<PushPinOutlinedIcon style={{color: 'white'}}/>}</button>
          <>
            <ReactPlayer
              ref={screenShareRef}
              //
              playsinline // very very imp prop
              playIcon={<></>}
              //
              pip={false}
              light={false}
              controls={false}
              muted={true}
              playing={true}
              //
              url={screenShareMediaStream}
              height={"100%"}
              width={"100%"}
              onError={(err) => {
                console.log(err, "participant video error");
              }}
            />
          </>
          <div
            style={{
              position: "absolute",
              top: borderRadius,
              right: borderRadius,
            }}
          >
            {/* <p
              style={{
                color: screenShareOn ? "green" : "red",
                fontSize: 16,
                fontWeight: "bold",
                opacity: 1,
              }}
            >
              SCREEN SHARING
            </p> */}
          </div>
        </div>
      </div>}
    </div>
  )
};

export default ParticipantView