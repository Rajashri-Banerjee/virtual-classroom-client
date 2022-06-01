import { Box, Button, Chip, IconButton, InputAdornment, useTheme } from "@material-ui/core";
import { ArrowBack, Keyboard } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
// import useResponsiveSize from "../utils/useResponsiveSize";
import {useLocation, useNavigate} from 'react-router-dom';
import queryString from 'query-string';
import TextField from '@mui/material/TextField';

export function MeetingDetailsScreen({
  onClickJoin,
  onClickCreateMeeting,
  admin,
  user,
  meeting_id
}){
  const [meetingId, setMeetingId] = useState("");
  const [meetingIdError, setMeetingIdError] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate()
  const location =  useLocation()
  console.log(location)
  const search = queryString.parse(location.search)
  useEffect(()=>{
    if (meeting_id){
      setMeetingId(meeting_id)
    }
    
  },[meeting_id])
  console.log(meeting_id)
  return (
        <Box
          m={6}
          style={{
            display: "flex",
            flex: 1,
            width: "100%",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            // padding: padding,
          }}>
            <Box
            position="absolute"
            style={{
              top: theme.spacing(2),
              right: 0,
              left: theme.spacing(2),
            }}>
            <IconButton
              onClick={()=>{navigate(admin ? `/teacher/update-class/${search.room_id} `: `/student/class-details/${search.room_id}`)}}
            >
              <ArrowBack style={{color:'white'}}/>
            </IconButton>
          </Box>

          {admin && <Button
            style={{
                marginBottom:"1rem",
                backgroundColor:"black",
                color:"white"
            }}
            color="primary"
            variant="contained"
            onClick={(e) => {
              onClickCreateMeeting();
            }}>
            Create Meeting
          </Button>}

          {admin && <Chip label = "OR"/>}
          
          <p style={{color:'#CECECE', marginBottom: '10px', fontFamily :'Georgia'}}>Enter the meeting ID here :</p>
          {<TextField
            fullwidth
            style={{
              marginTop: "0.5rem",
              width: "100%",
              maxWidth: '400px'
            }}
            sx={{ input: { color: '#CECECE',outlineColor:'white', paddingLeft: '5px' } }}
            required
            id="outlined"
            onChange={(e) => {
              setMeetingId(e.target.value);
            }}
          
            error={meetingIdError}
            variant="outlined"
            // value={meeting_id}
            value={meetingId}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Keyboard style={{color: 'black'}}/>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    disabled={!meetingId.match("\\w{4}\\-\\w{4}\\-\\w{4}")}
                    style={{
                      backgroundColor : 'black',
                      color : "white"
                    }}
                    variant="contained"
                    onClick={(e) => {
                      if (meetingId.match("\\w{4}\\-\\w{4}\\-\\w{4}"))
                        onClickJoin(meetingId);
                      else setMeetingIdError(true);
                    }}
                    id={"btnJoin"}
                    >
                    Join
                  </Button>
                </InputAdornment>
              ),
            }}
          />}   
        </Box>
  );
}
