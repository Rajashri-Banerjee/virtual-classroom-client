import React,{useState,useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'
import axios from 'axios'
import { Button,Spinner } from 'native-base'
import PublicProfileDetails from '../components/PublicProfileDetails'
function PublicProfile() {
    const location = useLocation()
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(false)
    const getProfileDetails = async()=>{
        const parsedId = queryString.parse(location.search)
        if (!parsedId) return 
        if (!parsedId._id) return 
        setLoading(true)
        const response = await axios({
            url:'/profile/'+parsedId._id,
            method:'get'
        })
        console.log(response.data)
        if (response.data && response.data.user){
            setUser(response.data.user)
        }
        setLoading(false)
    }
    useEffect(()=>{
        console.log(location)
        getProfileDetails()
    },[])
    return (
        <div>
            {user && <PublicProfileDetails user={user} />}
            {loading &&
                <div
                    style={{
                        width:'100vw',
                        height:'100vh',
                        display:'flex',
                        justifyContent:'center',
                        alignItems:'center'
                    }}
                >
                    <Spinner accessibilityLabel="Loading posts" />
                </div> 
                
            
            }
            {!user && !loading && 
                <div
                    style={{
                        width:'100vw',
                        height:'100vh',
                        display:'flex',
                        justifyContent:'center',
                        alignItems:'center'
                    }}
                >
                    <p>Could Not Found the User</p>
                </div>

            }
        </div>
    )
}
export default PublicProfile