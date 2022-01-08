import React,{ useState } from 'react'
import {Link} from'react-router-dom'
import {Box,Button,Heading,Divider, Modal} from 'native-base'
import { useNavigate,useLocation } from'react-router-dom'
import { Grid } from '@mui/material'
import Header from '../components/Header'
import { BsFacebook,BsTwitter,BsLinkedin } from 'react-icons/bs'

function Homepage() {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [open, setOpen] = useState(false)
    const location = useLocation()
    console.log(location)
    return (
        <Box  >
            <Header location = {location} />
            <Divider />
            <div className='landing-section'>
                <Grid container spacing={2} >
                    <Grid item md={6} >
                        <h1 className='webtext'> Welcome To Our Virtual Classroom! </h1>
                        <p className='active'> This virtual classroom has integrated benefits of a physical classroom with the convenience of a ‘no-physical-bar’ 
                            virtual learning environment, minus the commuting hazards and expenses. This virtual classroom shall make it possible for the students to access all learning 
                            materials from home, interact with the teachers through video conferencing calls to clarify their doubts and much more.
                        </p>
                        <button className='p-btn' onClick={()=>setOpen(true)} >Get Started</button>
                    </Grid>
                    <Grid item md={6} >
                        <img className='landing-illustrator' src="https://svgshare.com/i/dAR.svg" width='100%' height='100%'/>
                    </Grid>
                </Grid>
            </div>
            <div>
                <h2 className='h2'> Features </h2>
                    <div className="feature-boxes flex wrap sa">
                        <div className='feature-box'>
                            <div className='feature-image-container flex center' >
                                <img className='note-feature' 
                                    src="https://i.ibb.co/vc5m7LT/notes-removebg-preview.png" 
                                    alt="notes-removebg-preview" width='50px' height='50px'
                                />
                            </div>
                            
                            <h3 className='h3' > Notes Sharing </h3>
                            <Divider />
                            <p className='feature-details' >
                                The teachers shall be able to upload notes or lecture materials in each and every class he/she has created.
                                The students on the other hand, will be able to successfully download them in their respective devices.
                                The teachers will also be able to delete the uploaded notes whenever he/she wants to.
                            </p>
                        </div>
                        <div className='feature-box'>
                            <div className='feature-image-container flex center' >
                                <img className='note-feature' 
                                    src="https://cdn-icons-png.flaticon.com/512/1048/1048966.png" 
                                    alt="notes-removebg-preview" width='50px' height='50px'
                                />
                            </div>
                            
                            <h3 className='h3' > Assignments Sharing </h3>
                            <Divider />
                            <p className='feature-details' >
                                The teachers will be able to upload the assignment questions and provide a deadline to submission of the answers.
                                The students shall be able to upload the answers only within the deadline.
                                The teachers shall be able to download the answers which were uploaded by the students of the respective classes and provide grades.
                            </p>
                        </div>
                        <div className='feature-box'>
                            <div className='feature-image-container flex center' >
                                <img className='note-feature' 
                                    src="https://cdn3.iconfinder.com/data/icons/complete-set-icons/512/video512x512.png" 
                                    alt="notes-removebg-preview" width='50px' height='50px'
                                />
                            </div>
                            
                            <h3 className='h3' > Live Class </h3>
                            <Divider />
                            <p className='feature-details' >
                               In each and every class that the teacher has created, we have a functionality of video conferencing call.
                               Teacher and students will be able to interact live through that functionality.
                               We are planning to include quite a many features like screen-sharing, live chat, recording etc. there.
                            </p>
                        </div>
                        <div className='feature-box'>
                            <div className='feature-image-container flex center' >
                                <img className='note-feature' 
                                    src="https://www.pikpng.com/pngl/b/382-3825084_after-youre-done-watching-the-series-test-your.png" 
                                    alt="notes-removebg-preview" width='50px' height='50px'
                                />
                            </div>
                            
                            <h3 className='h3' > Live Quiz </h3>
                            <Divider />
                            <p className='feature-details' >
                                The teachers shall be able to create quiz questions and provide options among which one of them will be correct.
                                He/she will also be able to provide a timing to the quiz. The students will be able to attempt the quiz at the provided time
                                and will get grades based on their performance in the quiz.
                            </p>
                        </div>
                    
                        <div className='feature-box'>
                            <div className='feature-image-container flex center' >
                                <img className='note-feature' 
                                    src="https://cdn-icons-png.flaticon.com/512/1157/1157000.png" 
                                    alt="notes-removebg-preview" width='50px' height='50px'
                                />
                            </div>
                            
                            <h3 className='h3' > Notifications Sharing </h3>
                            <Divider />
                            <p className='feature-details' >
                                The teachers shall be able to share important notifications with the students of respective classes.
                                He/she can delete them later if he/she wants to. The students will simply be able to view them along with the date and time at which
                                the notification was shared by the teacher.
                            </p>
                        </div>

                        <div className='feature-box'>
                            <div className='feature-image-container flex center' >
                                <img className='note-feature' 
                                    src="https://cdn4.iconfinder.com/data/icons/buno-support/32/__questions_answers_chat-512.png" 
                                    alt="notes-removebg-preview" width='50px' height='50px'
                                />
                            </div>
                            
                            <h3 className='h3' > Questionnaires </h3>
                            <Divider />
                            <p className='feature-details' >
                                The students and the teacher of a particular class will be able to interact with each other asynchronously via this feature.
                                The students can ask questions about any concept he/she has doubt in and the teacher can reply back to the student as per the teacher's
                                convenience.
                            </p>
                        </div>
                    
                    </div>
                    
               
            </div>
            <div className="footer">
                <div className="social-icon-container flex wrap center">
                    <BsFacebook className="footer-icon"/>
                    <BsTwitter className="footer-icon"/>
                    <BsLinkedin className="footer-icon"/>
                </div>
        
            </div>




            

        
            <Box>
                <Modal isOpen={open} onClose={() => setOpen(false)}>
                    <Modal.Content maxWidth="400px"  marginTop='200' marginBottom='auto'>
                        <Modal.CloseButton colorScheme= 'coolGray' _icon={{color:'coolGray.400',size:3}}  />
                        <Modal.Header  >Continue as : </Modal.Header>
                        <Modal.Body>
                            <button className='home-modal-btn' onClick={()=>navigate('/signup')} >Student</button>
                            <button className='home-modal-btn' onClick={()=>navigate('/teachers/signup')} >Teacher</button>
                        </Modal.Body>
                    </Modal.Content>
                </Modal>
            </Box>
            
        </Box>
    )
}

export default Homepage
