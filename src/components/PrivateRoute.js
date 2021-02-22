import React, {useEffect} from 'react'
import { Route} from 'react-router-dom'
import { auth } from '../firebase'
import { useHistory } from 'react-router-dom'

export default function PrivateRoute({component: Component, ...rest}) {

    const history = useHistory() 
    
    useEffect(()=>{
       auth.onAuthStateChanged(user=>{            
            if(user) history.push('/')
            else history.push('/signup')  
         })                
      }, [])      
 
        
    return (
        <Route
            {...rest}
            render={props => auth.currentUser && <Component {...props}/>}
        />           
    )
}
