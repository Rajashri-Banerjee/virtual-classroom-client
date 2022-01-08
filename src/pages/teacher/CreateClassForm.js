import React,{useState} from 'react'
import {Box,Input,Button,Heading,useToast,Center} from 'native-base'
import axios from 'axios'
// import {useNavigate} from'react-router-dom'
import { MdPostAdd } from 'react-icons/md';
function CreateClassForm(props) {
    // const navigate = useNavigate()
    const toast = useToast()
    const [title,setTitle] = useState('')
    const [poster,setPoster] = useState('')
    const [subtitle,setSubtitle] = useState('')
    const [loading,setLoading] = useState(false)
    
    const createClassHandler = async() => {
        setLoading(true)
        const response = await axios({
            url : "http://localhost:3001/teacher/class",
            method : "POST",
            data : {title,subtitle,poster},
            headers : {
                authorization : props.token
            }
        })
        setLoading(false)
        if(response.data.error){
            toast.show({
                title : 'ERROR!!!',
                description : response.data.error,
                status : 'error'
            })
            alert(response.data.error)
        } else{
            toast.show({
                title : 'Success!!!',
                description : 'Class Created Successfully!',
                status : 'success'
            })
            props.setCreateModal(false)
            // navigate('/teacher/dashboard')
        }
    }
    return (
        <div>
            <Box>
                {/* <Heading>
                    Create Class
                </Heading> */}
                <Box>
                    <Input
                        mt = '5'
                        placeholder = 'Class Name'
                        value = {title}
                        onChangeText = {setTitle}
                    />
                    <Input
                        mt = '5'
                        placeholder = 'Class Description'
                        vlaue = {subtitle}
                        onChangeText = {setSubtitle}
                    />
                    {/* <Input
                        mt = '10px'
                        placeholder = 'Class Poster'
                        value = {poster}
                        onChangeText = {setPoster}
                        mb='10px'
                    /> */}
                    <Button
                        onPress = {createClassHandler}
                        isLoading={loading}
                        isLoadingText='Creating.....'
                        mt='5'
                        style={{background:'black'}}
                    >
                        Create Class
                    </Button>

                </Box>
            </Box>

        </div>
    )
}


export default  CreateClassForm
