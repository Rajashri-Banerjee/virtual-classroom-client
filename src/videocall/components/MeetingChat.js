import {
  MeetingProvider,
  useMeeting,
  useParticipant,
  useConnection,
  usePubSub,
} from "@videosdk.live/react-sdk";
import { useState } from "react";
import MessageList from './MeetingList';
import SendIcon from '@mui/icons-material/Send';

const MeetingChat = ({ tollbarHeight }) => {
  const { publish, messages } = usePubSub("CHAT", {});
  const [message, setMessage] = useState("");
  return (
    <div
      style={{
        // marginLeft: borderRadius,
        // width: '350px',
        background: '#1D242F',//chat-background
        overflowY: "none",
        borderRadius:8,
        height: `calc(100vh - 80px)`,
        padding: '0px 0px', 
        // background:'white',
        position:'relative',
        display:'flex',
        flexDirection:'column',
        margin:0
      }}
    >
      <h2 style={{
        color:'white',
        marginLeft:'20px'
      }}>Chat</h2>
      <div 
        style={{
          // flex:1,
          overflowY:'auto',
          height: 'calc(100vh - 200px)',
          borderTop:'1px solid gray',
          // height: `calc(100vh - ${'100px'+ 2 * borderRadius}px)`,
        }}
      >
        <div
          style={{
            // borderTop:'1px solid gray',
            position:'relative'
          }}
        >
          <MessageList messages={messages} />
        </div>
        
      </div>
      
      <div 
        style={{ 
          display: "flex",
          alignItems:'center',
          justifyContent:'center' ,
          background:'white',
          // margin:'auto',
          // right:'0px',
          // padding:'10px',
          width:'100%',
          border:'0.5px solid black',
          borderRadius:5,
          margin: '0.5px',
          // background:'blue'
          // height:'70px',
          // height: `calc(100vh - ${'200px'+ 2 * borderRadius}px)`,
        }}
      >
          <input
            value={message}
            style={{
              flex:1,
              padding:'5px 5px 5px 10px',
              outline:'none',
              border:'none'
            }}
            placeholder='Send a message'
            onChange={(e) => {
              const v = e.target.value;
              setMessage(v);
            }}
            onKeyPress={(e)=>{
              if (e.code === 'Enter'){
                const m = message;
                if (m.length) {
                  publish(m, { persist: true });
                  setMessage("");
                }
              }
              console.log(e.code)
            }}
          />
          <button
            style={{
              display:'flex',
              alignItems:'center',
              background:'transparent',
              border:'none',
              outline:'none',
              padding:'10px 10px'
            }}
            onClick={() => {
              const m = message;
              if (m.length) {
                publish(m, { persist: true });
                setMessage("");
              }
            }}
          >
            <SendIcon style={{cursor: 'pointer'}}/>
          </button>
      </div>
      
    </div>
  );
};
export default MeetingChat