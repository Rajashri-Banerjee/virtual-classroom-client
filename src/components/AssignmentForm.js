import React,{useState, useRef} from 'react'
import {Box,Input,Button,Heading,useToast,Center,Flex} from 'native-base'
import axios from 'axios'

function AssignmentForm(props) {
    const toast = useToast()
    const[title,setTitle] = useState('')
    const[link,setLink] = useState('')
    const[image,setImage] = useState('')
    const [loading,setLoading] = useState(false)
    const [deadline,setDeadline] = useState('')
    const inputFile = useRef(null) 
    const [created_at, setcreated_at] = useState(new Date())
    
     const assignmentHandler = ()=> {
         if(!link){
            console.log("Please upload a document first")
            alert('Please upload a document first')
            return
        }
        props.setAssignments((prevState) => {
            props.updateHandler({assignment:prevState.concat({title,link,deadline,created_at})})
            return prevState.concat({title,link,deadline,created_at})
        })
        props.setAssignmentsModal(false)
    }
    const documentUploader = async()=>{
        const formData = new FormData()
        formData.append("img",image)
        const response = await axios({
            url:`http://localhost:3001/teacher/document-upload`,
            method:'POST',
            data:formData
        })
        console.log(response.data)
        if(response.data && response.data.error){
            alert(response.data.error)
            toast.show({
                title:'Error',
                description:response.data.error,
                status:'error'
            })
            return
        }
        if(response.data.uri){
            setLink(response.data.uri)
        }
    }
    return (
        <div>
            <Box>
                <Flex direction='row' justify='space-between'>
                    <input 
                        type="file"
                        onChange={(e)=>setImage(e.target.files[0])}
                        ref={inputFile}
                        style={{display: 'none'}}
                        />
                     <Button 
                        onPress={()=>inputFile.current.click()} 
                        bg={'black'}
                        _hover={{
                            backgroundColor:'#1E1A1A'
                        }} 
                        _focus={{
                            backgroundColor:'#1E1A1A'
                        }}
                    >Choose a File</Button>
                    {image.name}
                   { console.log(image.name)}
                    <Button 
                        onPress={documentUploader} 
                        bg={'black'}
                        _hover={{
                            backgroundColor:'#1E1A1A'
                        }} 
                        _focus={{
                            backgroundColor:'#1E1A1A'
                        }}
                        isDisabled={!image}
                    >Upload</Button>
                </Flex>
                {link &&  
                    <Box>
                        <Input
                            mt = '5px'
                            placeholder='Assignment Title'
                            value={title}
                            onChangeText={setTitle}
                        />
                        {/* <Input
                        mt = '5px'
                        placeholder='Assignment Link'
                        value={link}
                        onChangeText={setLink}
                        /> */}
                        <input
                            mt = '5px'
                            placeholder='Assignment Deadline'
                            value={deadline}
                            onChangeText={setDeadline}
                            type = 'datetime-local'
                            onChange = {(e)=> {setDeadline(e.target.value)}}
                        />
                    </Box>
                }
                    <Button 
                    mt={'10px'} 
                    onPress={()=>assignmentHandler()} 
                    isLoading={loading} 
                    isLoadingText='Uploading...' 
                    bg={'black'}
                    _hover={{
                        backgroundColor:'#1E1A1A'
                    }}
                    isDisabled={!title || !deadline}
                >
                    Add
                </Button>
            </Box>
        </div>
    )
}

export default AssignmentForm