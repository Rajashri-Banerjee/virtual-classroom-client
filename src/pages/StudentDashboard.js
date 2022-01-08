import {Box,Text,Button,Flex,Divider,Center} from 'native-base'
import React,{useState} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import Classes from './user/Classes'
import Header from './user/Header'
import { useLocation } from 'react-router-dom'

function StudentDashboard(props) {
    console.log(props)
    const [rooms,setRooms] = useState([])
    const location = useLocation()
    return (
        <div>
            {props.auth.user && 
                <Header user={props.auth.user} dispatch={props.dispatch} location={location} />
            }
            <Divider />
            <Box>
                <Classes />
            </Box>
        </div>
    )
}
const mapStateToProps = state => state

export default connect(mapStateToProps) (StudentDashboard)