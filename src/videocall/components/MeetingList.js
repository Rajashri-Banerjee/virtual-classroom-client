import formatAMPM from '../utils/formatAMPM';
const MessageList = ({ messages }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column-reverse',
        
        // padding: '10px 0px'
      }}
    >
      {messages?.map((message, i) => {
        const { senderName, message: text, timestamp } = message;

        return (
          <div
            style={{
              // marginTop: '10px',
              // margin: 2,
              borderRadius: 8,
              overflow: "hidden",
              padding: 12,
              color: "#fff",
            }}
            key={i}
          >
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <p style={{ margin: 0, padding: 0, fontWeight: '500', color: '#9B9B9B', fontFamily: 'Roboto', fontSize: '17px' }}>
              {senderName}
            </p>
            <p
              style={{
                margin: 0,
                padding: 0,
                color: '#9B9B9B',
                marginTop: 1,
                fontSize: '15px',
                fontFamily: 'Roboto'
              }}
            >
              {formatAMPM(new Date(timestamp))}
            </p>
            </div>
            <p style={{ margin: 0, padding: 0, marginTop: 4, fontStyle: 'normal', fontFamily: 'Helvetica', fontSize: '15px', letterSpacing: '0.5px', marginTop: '6px' }}>{text}</p>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList