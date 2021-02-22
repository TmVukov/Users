import './App.css';
import Login from './components/login/Login'
import Signup from './components/signup/Signup'
import Homepage from './components/homepage/Homepage'
import PrivateRoute from './components/PrivateRoute'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>        
        <Switch>
          <PrivateRoute exact path='/' component={Homepage}/>          
          <Route path='/login' component={Login}/> 
          <Route path='/signup' component={Signup}/>                 
        </Switch>        
      </Router>
    </div>
  );
}

export default App;
