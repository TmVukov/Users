import React, { useState, useEffect } from 'react'
import './Homepage.css'
import { auth } from '../../firebase'
import { useHistory } from 'react-router-dom'
import database from '../../firebase'


export default function Homepage() {
    const [users, setUsers] = useState([])
    const [states, setStates] = useState([])
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [oib, setOib] = useState('')
    const [state, setState] = useState('')
    const [selectedValue, setSelectedValue] = useState('')    
    const [id, setId] = useState()
    const history = useHistory()      
    

    const handleLogout =  () => auth.signOut().then(()=>history.push('/login'))


    useEffect(()=>{        
        database.collection('users').onSnapshot(user=>
            setUsers(user.docs.map(e=>({...e.data(), id: e.id})))
        )   
        database.collection('states').onSnapshot(user=>
            setStates(user.docs.map(e=>e.data()))
        )   
        
    }, [setUsers, setStates])


       

    const handleGridData = () =>{       
        const clonedUsers = [...users]

        const props = clonedUsers.map(obj=>{
                const {name, surname, username, state} = obj
                return [name, surname, username, state[1]]
        })                    
        return props.flat()             
    }


    const extractObjectData = value =>{
        const clonedUsers = [...users]      

        const extractedObj = clonedUsers.filter(obj=>Object.keys(obj).some(key=>obj[key] === value))

        const props = extractedObj.map(obj=>{
            const {name, surname, username, password, oib, state, id} = obj
            return [name, surname, username, password, oib, state, id]
        }) 
        
        const userData = props.flat()        
        return userData
    } 
    
      
    const handleUserData = value =>{
       const props = extractObjectData(value)       
             
        setName(props[0])
        setSurname(props[1])      
        setUsername(props[2])      
        setPassword(props[3])
        setOib(props[4])
        setState(props[5])
        setId(props[6])

        handleDropdownValue(value)       
    }
    
    
    const handleDropdownValue = value =>{
        const props = extractObjectData(value) 

        const clonedStates = [...states]
        const extractedState = clonedStates.filter(obj=>Object.keys(obj).some(key=>obj[key] === props[5][1])) 
        const stateCode = extractedState[0].code        
        const stateName = extractedState[0].name     

        setSelectedValue(`${stateCode}-${stateName}`)
    }    

   

    const saveData = (e) =>{
        e.preventDefault() 

        const data = [name, surname, username, password, oib]
        const clonedUsers = [...users]        
        
        const objData = clonedUsers.map(obj=>Object.values(obj))
        const extractedValues = objData.flat()
        const isNewUser = data.every(e=>!extractedValues.includes(e))        
        
        if(isNewUser){
            database.collection('users').add({
                name: name,
                surname: surname,
                username: username,            
                password: password,
                oib: oib,
                state: selectedValue.split('-')
            })
        }
        else{
            database.collection('users').doc(id).update({
                name: name,
                surname: surname,
                username: username,            
                password: password,
                oib: oib,
                state: selectedValue.split('-')
            })
        }
        

        setName('')
        setSurname('')
        setUsername('')
        setPassword('')
        setOib('')
    }
    
    const deleteUser = () =>{
        database.collection('users').doc(id).delete()

        setName('')
        setSurname('')
        setUsername('')
        setPassword('')
        setOib('')
    }
    

    return (
        <div className='home__container'>
            <div className='home__top'>
                <p>User: {auth.currentUser.email}</p> 
                <button onClick={handleLogout}>Log Out</button>
            </div>          

           <form className='home__form' onSubmit={saveData}>              
                <input 
                    type='text' 
                    placeholder='name' 
                    required
                    value={name} 
                    onChange={e=>setName(e.target.value)}
                /> 

               <input 
                    type='text' 
                    placeholder='surname' 
                    required
                    value={surname}
                    onChange={e=>setSurname(e.target.value)}
               />

               <input 
                    type='text' 
                    placeholder='username' 
                    required
                    value={username} 
                    onChange={e=>setUsername(e.target.value)}
               />

               <input 
                    type='password' 
                    placeholder='password' 
                    required
                    value={password}
                    onChange={e=>setPassword(e.target.value)}
               />

               <input 
                    type='tel' 
                    placeholder='OIB' 
                    pattern='[0-9]{11}'
                    maxLength='11' 
                    required
                    value={oib}
                    onChange={e=>setOib(e.target.value)}
               />

               <select                
                    value={selectedValue}
                    onChange={e=>setSelectedValue(e.target.value)}
               >
                {                  
                    states.map((state,i)=><option key={i}>{`${state.code}-${state.name}`}</option>)                   
                }                                                      
               </select>

               <div>
                    <button>Save</button>
                    <button onClick={deleteUser}>Delete</button>
               </div>
           </form>
         

           <section className='home__grid'>
                <div><strong>Name</strong></div>
                <div><strong>Surname</strong></div>
                <div><strong>Username</strong></div>
                <div><strong>State</strong></div>
                {                  
                   handleGridData()                    
                    .map((user,i)=><div key={i} onClick={()=>handleUserData(user)}>{user}</div>)
                }
           </section>
        </div>
    )
}


