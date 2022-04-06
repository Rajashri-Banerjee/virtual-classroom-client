import React,{useEffect} from 'react'
import './css/main.css'
import {BrowserRouter, Routes, Route, Redirect} from 'react-router-dom'
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import Signup from './pages/Signup'
import StudentDashboard from './pages/StudentDashboard'
import CreateClassForm from './pages/teacher/CreateClassForm'
import TeacherDashboard from './pages/teacher/TeacherDashboard'
import TeacherLogin from './pages/teacher/TeacherLogin'
import TeacherSignup from './pages/teacher/TeacherSignup'
import UpdateClass from './pages/teacher/UpdateClass'
import UserJoin from './pages/user/UserJoin'
import Classes from './pages/user/Classes'
import { connect } from 'react-redux'
import UserRouter from './pages/user/UserRouter'
import TeacherRouter from './pages/teacher/TeacherRouter'
import VideoCall from './pages/user/VideoCall'

function App(props) {

    return (
        <BrowserRouter>
            <Routes>
                
                <Route path = '/' element = {<Homepage />} exact />
                <Route path = '/login' element = {<Login/>} />
                <Route path = '/signup' element = {<Signup/>} />
                <Route path = '/teachers/signup' element = {<TeacherSignup/>} />
                <Route path = '/teachers/login' element = {<TeacherLogin/>} />
                <Route path = '/teacher/*' element={<TeacherRouter />} />
                {/* <Route path = '/student/dashboard' element = {<StudentDashboard/>} /> */}
                {/* <Route path = '/teacher/createclass' element = {<CreateClassForm/>} />
                <Route path = '/teacher/class' element = {<UpdateClass/>}   /> */}
                <Route path='/student/*' element={<UserRouter />} />
                <Route path='/videocall' element={<VideoCall/>} />
            </Routes>
        </BrowserRouter>
    )
}

const mapStateToProps = state => state

export default connect(mapStateToProps) (App)
