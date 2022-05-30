import React,{useEffect} from 'react'
import { navigate, location} from 'react-router-dom'
import { connect } from 'react-redux'
import { Routes,Route } from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router-dom'
import TeacherDashboard from './TeacherDashboard'
import CreateClassForm from './CreateClassForm'
import UpdateClass from './UpdateClass'
import TeacherProfile from './TeacherProfile'
import LiveClass from './LiveClass'
function TeacherRouter(props) {
    console.log(props)
    const navigate = useNavigate()
    const location  = useLocation()
    useEffect(()=>{
        console.log(props.auth)
        if(!props.auth.token && !(props.auth.authenticated_as =='teacher')){
            navigate(`/teachers/login?next=${location.pathname+location.search}`)
        }
    },[props.auth])
    return (
        <Routes>
            <Route path='/dashboard' element={<TeacherDashboard />} />
            <Route path='/create-classes' element={<CreateClassForm />} />
            <Route path='/update-class/:id' element={<UpdateClass />} />
            <Route path='/profile' element={<TeacherProfile />} />
            <Route path='/live-class' element={<LiveClass />} />
        </Routes>
    )
}
const mapStateToProps = state => state
export default connect(mapStateToProps) (TeacherRouter)

