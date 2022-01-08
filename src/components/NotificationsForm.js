import React,{useState} from 'react'
import {Box,Input,Button,Heading,useToast,Center} from 'native-base'

function NotificationsForm(props) {
    const[body,setBody] = useState('')
    
    const notificationHandler = ()=>{
        props.setNotifications((prevState)=>{
            props.updateHandler({notification:prevState.concat({body})})
            return prevState.concat({body})
        })
        props.setNotificationModal(false)
    }
    return (
        <div>
            <Box>
                <Input
                    mt = '5px'
                    placeholder='Notification Details'
                    value={body}
                    onChangeText={setBody}
                />
                <Button
                    mt={'10px'}
                    onPress={()=>notificationHandler()}
                    bg={'black'}
                    _hover={{
                        backgroundColor:'#1E1A1A'
                    }}
                >
                    Add
                </Button>
            </Box>
        </div>
    )
}

export default NotificationsForm
