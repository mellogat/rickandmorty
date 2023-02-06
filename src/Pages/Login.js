import {useState} from 'react'
import { Link } from 'react-router-dom'
import './forms.css'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {auth, writeUserData} from '../firebase'
import {useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../store/action';



const Login = () =>{

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('') 
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch();


  const login = e => {
    e.preventDefault()
    
    signInWithEmailAndPassword(auth, email, password)
    .then(() => {
       writeUserData(auth.currentUser.uid,auth.currentUser.email)
       dispatch(setCurrentUser(auth.currentUser));
       navigate('/')
    })
    .catch(err => setError(err.message))
  }

  return(
    <div className='container d-flex justify-content-center'>
      <div className='auth'>
        <h1>Log in</h1>
        {error && <div className='auth__error'>{error}</div>}
        <form onSubmit={login} name='login_form'>
          <input 
            type='email' 
            value={email}
            required
            placeholder="Enter your email"
            onChange={e => setEmail(e.target.value)}/>

          <input 
            type='password'
            value={password}
            required
            placeholder='Enter your password'
            onChange={e => setPassword(e.target.value)}/>

          <button className="btn btn-primary" type='submit'>Login</button>
        </form>
        <p>
          Don't have an account? <Link to='/register'>Create one here</Link>
        </p>
      </div>
    </div>
  )
}



export default Login;
