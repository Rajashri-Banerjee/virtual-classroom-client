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
            alert('Please upload a document first')
            return
        }
        if (Date.parse(deadline) < Date.now()){
            alert(`Deadline can't be before current time. Please try again!`)
            return
        }
        props.setAssignments((prevState) => {
            props.updateHandler({assignment:prevState.concat({title,link,deadline,created_at:new Date()})})
            return prevState.concat({title,link,deadline,created_at: new Date()})
        })
        props.setAssignmentsModal(false)
    }
    const documentUploader = async()=>{
        const formData = new FormData()
        formData.append("img",image)
        const response = await axios({
            url:`/teacher/document-upload`,
            method:'POST',
            data:formData
        })
        // console.log(response.data)
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
                <Flex direction='row' justify='space-between' flexWrap={'wrap'}>
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
                    {image.name}
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
                        <p style={{marginBottom: '5px', fontFamily: 'Roboto'}}>Deadline</p>
                        <input
                            mt = '5px'
                            placeholder='Assignment Deadline'
                            value={deadline}
                            onChangeText={setDeadline}
                            type = 'datetime-local'
                            min = {new Date().toISOString().slice(0, -8)}
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
                    _pressed={{
                        backgroundColor:'#1E1A1A'
                    }}
                    _focus={{
                        backgroundColor:'#1E1A1A'
                    }}
                    _focusVisible={{
                        backgroundColor:'#1E1A1A'
                    }}
                    _
                    isDisabled={!title || !deadline}
                >
                    Add
                </Button>
            </Box>
        </div>
    )
}

export default AssignmentForm