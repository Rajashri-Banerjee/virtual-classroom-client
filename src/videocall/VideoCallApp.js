import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";


function VideoCallApp({admin,user,meeting_id,setMeetingIdUser}) {
  
  return (
    <>
      <App admin={admin} user={user} meeting_id={meeting_id} setMeetingIdUser={setMeetingIdUser} />
    </>
  )
}
export default VideoCallApp