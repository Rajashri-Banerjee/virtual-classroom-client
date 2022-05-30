import React, { useState } from 'react'
import {
	AgoraVideoPlayer,
	createClient,
	createMicrophoneAndCameraTracks,
	createScreenVideoTrack
} from "agora-rtc-react";

const config = {
	mode: "rtc",
	codec: "vp8",
};

function Control(props) {
	const { tracks, setStart, setInCall,useClient,shareScreen,setShareScreen,shareScreenf} = props;
	const [trackState, setTrackState] = useState({ video: true, audio: true });
	const client = useClient();
	
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
		<div>
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
				{<p onClick={() => shareScreenf(!shareScreen)}>Share Screen</p>}
			</div>
		</div>
	)
}

export default Control