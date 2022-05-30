import { useMeeting } from "@videosdk.live/react-sdk";
import ParticipantDetails from "./ParticipantDetails";

import ParticipantView from './ParticipantView'
const chunk = (arr) => {
  const newArr = [];
  while (arr.length) newArr.push(arr.splice(0, 5));
  return newArr;
};

const ParticipantsView = () => {
  const { participants } = useMeeting();
  return (
    <div
      style={{
        // display: "flex",  
        // flexWrap: "wrap",
        // flexDirection: "row",
        // padding: borderRadius,
        // justifyContent:'center',
        // alignItems:'center',
        // background:'blue',
        position:'absolute',
        top:0,
        left:0,
        right:0,
        bottom:0
        
      }}
    >
      {chunk([...participants.keys()]).map((k) => (
        <div 
          style={{ 
            display: "flex",
            flexWrap:'wrap',
            justifyContent:'center', 
            // backgroundColor: 'red' ,
            flexDirection:'row',
            alignItems:'center',

          }}
        >
          {k.map((l,index) => (
            <ParticipantView key={l} participantId={l} index={index} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default ParticipantsView