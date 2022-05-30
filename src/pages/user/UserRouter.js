import Classes from './Classes'
import UserJoin from './UserJoin'
import React,{useEffect} from 'react'
import { connect } from 'react-redux'
import VideoCall from './VideoCallApp'
import StudentProfile from './StudentProfile'
import StudentDashboard from '../StudentDashboard'
import StudentClassDetails from './StudentClassDetails'
import { useNavigate, useLocation, Routes, Route  } from 'react-router-dom'
function UserRouter(props) {
    const navigate = useNavigate()
    const location  = useLocation()
    useEffect(()=>{
        console.log(location)
        if(!props.auth.token && !(props.auth.authenticated_as ==='student')){
            navigate(`/login?next=${location.pathname+location.search}`)
        }
    },[props.auth,location,navigate])
    return (
        <Routes>
            <Route path='/dashboard' element={<StudentDashboard />} />
            <Route path='/classes' element={<Classes />} />
            <Route path='/class/join/:id' element={<UserJoin />} />
            <Route path='/profile' element={<StudentProfile />} />
            <Route path='/class-details/:id' element={<StudentClassDetails />} />
            <Route path='/live-class' element={<VideoCall />} />
        </Routes>
    )
}

const mapStateToProps = state => state
export default connect(mapStateToProps) (UserRouter)
