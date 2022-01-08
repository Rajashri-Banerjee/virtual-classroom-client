import React,{useState,useRef} from 'react'
import {Box,Input,Button,Heading,useToast,Center,Flex} from 'native-base'
import axios from 'axios'

function NotesForm(props) {
    const toast = useToast()
    const[title,setTitle] = useState('')
    const[link,setLink] = useState('')
    const[image,setImage] = useState('')
    const [loading,setLoading] = useState(false)
    const inputFile = useRef(null) 

    const notesHandler = ()=> {
        if(!link){
            console.log("Please upload a document first")
            alert('Please upload a document first')
            return
        }
        props.setNotes((prevState) => {
            props.updateHandler({note:prevState.concat({title,link})})
            return prevState.concat({title,link})
        })
        props.setNotesModal(false)
    }

    const documentUploader = async()=>{
        setLoading(true)
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
        setLoading(false)
    }
    return (
        <div>
            <Box>
                <Flex direction='row' justify='space-between' alignItems={'center'}>
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
                            placeholder='Notes Title'
                            value={title}
                            onChangeText={setTitle}
                        />
                        {/* <Input
                            mt = '5px'
                            placeholder='Notes Link'
                            value={link}
                            onChangeText={setLink}
                            isDisabled={true}
                        /> */}
                    </Box>
                }
                <Button 
                    mt={'10px'} 
                    onPress={()=>notesHandler()} 
                    isLoading={loading} 
                    isLoadingText='Uploading...' 
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

export default NotesForm
