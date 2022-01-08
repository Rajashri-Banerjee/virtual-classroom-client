import React,{useEffect} from 'react'

function Header({location}) {
    useEffect(()=>{

    },[location])
    return (
        <div className='flex wrap sb header ac' >
            <div>
                <img className='logo' src="https://i.ibb.co/jwBHMRv/logo-free-file.png" alt="logo"  />
            </div> 

            <div> 
                <ul className='flex' >
                    <li className={`${location.pathname==='/' ? 'list active-list': 'list'}`}>Home</li>
                    <li className='list'>About Us</li>
                    <li className='list'>Login</li>
                </ul>
            </div>
        </div>
    )
}

export default Header
