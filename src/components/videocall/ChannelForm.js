import React,{ useEffect } from 'react'
function ChannelForm(props) {
    const { setInCall, setChannelName, channel } = props;
    console.log(channel)
    useEffect(() => {
        // setChannelName(channel)
        setChannelName(channel)
    }, []);
    return (
        <div>
            <form className="join">
                {/* <input type="text"
                    placeholder="Enter Channel Name"
                    onChange={(e) => setChannelName(channel)}
                /> */}
                <button onClick={(e) => {
                    e.preventDefault();
                    setInCall(true);
                }}>
                    Join
                </button>
            </form>
        </div>
    )
}

export default ChannelForm