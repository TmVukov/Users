import React, { useState, useRef } from 'react'
import './Login.css'
import { auth } from '../../firebase'
import { Link, useHistory } from 'react-router-dom'

export default function LogIn() {
    const [error, setError] = useState('')

    const email = useRef()
    const password = useRef()
    const history = useHistory()    
    
    
    const handleSubmit =  e =>{
        e.preventDefault()        
        
        auth.signInWithEmailAndPassword(email.current.value, password.current.value)
        .then(user=>{
            if(user) history.push('/')
        })
        .catch(()=>{
            setError('Failed to log in!')
        }) 
            
    }

    return (
        <div >
            <h2>Log In</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit} className='login__form'>
                <input ref={email} type='email' placeholder='Enter email' required/>
                <input ref={password} type='password' placeholder='Enter password' required/>                
                <button>Submit</button>
            </form>

            <p>Need an account? <Link to='/signup'>Sign Up</Link></p>
        </div>
    )
}
