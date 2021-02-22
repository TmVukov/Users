import React, { useState, useRef } from 'react'
import './Signup.css'
import { auth } from '../../firebase'
import { Link, useHistory } from 'react-router-dom'

export default function SignUp() {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const email = useRef()
    const password = useRef()
    const passwordConfirm = useRef()
    const history = useHistory()  
       
    
    const handleSubmit =  e =>{
        e.preventDefault()

        if(password.current.value !== passwordConfirm.current.value){
            return setError('Passwords do not match')
        }        

        auth.createUserWithEmailAndPassword(email.current.value, password.current.value)
        .then(user=>{
            if(user && !loading) history.push('/') 
            setLoading(false)           
        })
        .catch(()=>{
            setError('Password should be at least 6 characters')            
        })
            
    }

    return (
        <div>
            <h2>Sign Up</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit} className='signup__form'>
                <input ref={email} type='email' placeholder='Enter email' required/>                
                <input ref={password} type='password' placeholder='Enter password' required/>                
                <input ref={passwordConfirm} type='password' placeholder='Confirm password' required/>                
                <button>Submit</button>
            </form>

            <p>Already have an account? <Link to='/login'>Log In</Link></p>
        </div>
    )
}
