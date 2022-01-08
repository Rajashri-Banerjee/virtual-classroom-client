import React,{useEffect} from 'react'
import { Routes,Route } from 'react-router-dom'
import StudentDashboard from '../StudentDashboard'
import { useNavigate, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import Classes from './Classes'
import UserJoin from './UserJoin'
import StudentProfile from './StudentProfile'
import StudentClassDetails from './StudentClassDetails'

function UserRouter(props) {
    const navigate = useNavigate()
    const location  = useLocation()
    useEffect(()=>{
        console.log(location)
        if(!props.auth.token && !(props.auth.authenticated_as ==='student')){
            navigate(`/login?next=${location.pathname}`)
        }
    },[props.auth,location,navigate])
    return (
        <Routes>
            <Route path='/dashboard' element={<StudentDashboard />} />
            <Route path='/classes' element={<Classes />} />
            <Route path='/class/join/:id' element={<UserJoin />} />
            <Route path='/profile' element={<StudentProfile />} />
            <Route path='/class-details/:id' element={<StudentClassDetails />} />
        </Routes>
    )
}
const mapStateToProps = state => state
export default connect(mapStateToProps) (UserRouter)
