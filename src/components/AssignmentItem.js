import React, { useState, useRef } from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Button, Modal, Flex, useToast } from 'native-base';
import axios from 'axios';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function AssignmentItem({assignment, user}) {
    const [open, setOpen] = useState(false)
    const toast = useToast()
    const[link,setLink] = useState('')
    const[image,setImage] = useState('')
    const [loading,setLoading] = useState(false)
    const inputFile = useRef(null) 
    const [created_at, setcreated_at] = useState(new Date())

    const submissionChecker = ()=> {
        console.log(user)
        if(assignment && assignment.submissions && user) {
            return !assignment.submissions.every((submission)=>{
                return user._id.toString() !== submission.user.toString()
            })
        }
        return false
    }
    console.log(submissionChecker())

    const documentUploader = async()=>{
        const formData = new FormData()
        formData.append("img",image)
        const response = await axios({
            url:`http://localhost:3001/user/document-upload`,
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

    const submissionHandler = async()=> {
        const formData = {doclink:link, submitted_at:created_at, _id:assignment._id}
        const response = await axios({
            url:`http://localhost:3001/user/assignment-submission`,
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
        toast.show({
            title: 'Assignment submitted successfully!',
            description: 'Refresh to see changes',
            status: 'success'
        })
        setOpen(false)
    }

  return (
    <div className='notification-card flex sb' >
        <p>
        ➤ {assignment.title}
        </p>
        <div className='flex ac sb' >
        <span className='date-span2'>   
            Deadline : {new Date(assignment.deadline).toString().split('GMT')[0]}
        </span>
            <DownloadIcon
                sx={{marginTop:-2,cursor:'pointer'}} 
                onClick={()=>window.open(assignment.link)}  
            />
            {submissionChecker()?<CheckCircleIcon
                sx={{marginTop:-2,cursor:'pointer',marginLeft:2,color:'#0BDD00'}}
                onClick={()=>setOpen(true)} 
            /> : <FileUploadIcon 
            sx={{marginTop:-2,cursor:'pointer',marginLeft:2}}
            onClick={()=>setOpen(true)} 
        /> 

            }
        </div>
            <span className='date-span'>   
               Shared at : {new Date(assignment.created_at).toString().split('GMT')[0]}
            </span>
            <Modal isOpen = {open} onClose={()=>setOpen(false)}>
                <Modal.Content style={{marginBottom:'auto',marginTop: 200}}>
                <Modal.CloseButton />
                    <Modal.Header>
                        Submit Assignment
                    </Modal.Header>
                    <Modal.Body>
                    <Flex direction='row' justify='space-between'>
                    <input 
                        type="file"
                        onChange={(e)=>setImage(e.target.files[0])}
                        ref={inputFile}
                        style={{display: 'none'}}
                        />
                     <Button
                        isDisabled ={submissionChecker()}
                        onPress={()=>inputFile.current.click()} 
                        bg={'black'}
                        _hover={{
                            backgroundColor:'#1E1A1A'
                        }} 
                        _focus={{
                            backgroundColor:'#1E1A1A'
                        }}
                    >{submissionChecker()?'Already submitted':'Choose a file'}</Button>
                    {image.name}
                    {!submissionChecker() && <Button 
                        onPress={documentUploader} 
                        bg={'black'}
                        _hover={{
                            backgroundColor:'#1E1A1A'
                        }} 
                        _focus={{
                            backgroundColor:'#1E1A1A'
                        }}
                        isDisabled={!image}
                    >Upload</Button>}
                    {link && <Button
                        onPress={submissionHandler}
                        bg={'black'}
                        _hover={{
                            backgroundColor:'#1E1A1A'
                        }} 
                        _focus={{
                            backgroundColor:'#1E1A1A'
                        }}>

                                Submit
                            </Button>}
                </Flex>
                    </Modal.Body>
                </Modal.Content>
            </Modal>
    </div>
  )
} 

export default AssignmentItem