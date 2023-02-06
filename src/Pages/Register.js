import {useState} from 'react'
import './forms.css'
import {auth} from '../firebase'
import {useNavigate, Link} from 'react-router-dom'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../store/action';

function Register() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch();



  const validatePassword = () => {
    let isValid = true

    if (password.length < 8 ) {
        isValid = false
        setError('Password must be more than 8 character')
    }  

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)){
        isValid = false
        setError('Invalid email format') 
    }

    if (password !== '' && confirmPassword !== ''){
      if (password !== confirmPassword) {
        isValid = false
        setError('Passwords does not match')
      }
    }
    return isValid
  }

  const register = e => {
    e.preventDefault()
    setError('')
    if(validatePassword()) {
      // Create a new user with email and password using firebase
        createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            dispatch(setCurrentUser(auth.currentUser));
            navigate('/')
        })
        .catch(err => setError(err.message))
    }
    setEmail('')
    setPassword('')
    setConfirmPassword('')
  }

  return (
    <div className='container d-flex justify-content-center'>
      <div className='auth'>
        <h1>Register</h1>
        {error && <div className='auth__error'>{error}</div>}
        <form onSubmit={register} name='registration_form'>
          <input 
            type='email' 
            value={email}
            placeholder="Enter your email"
            required
            onChange={e => setEmail(e.target.value)}/>

          <input 
            type='password'
            value={password} 
            required
            placeholder='Enter your password'
            onChange={e => setPassword(e.target.value)}/>

            <input 
            type='password'
            value={confirmPassword} 
            required
            placeholder='Confirm password'
            onChange={e => setConfirmPassword(e.target.value)}/>

          <button className="btn btn-primary" type='submit'>Register</button>
        </form>
        <span>
          Already have an account?  <Link to='/login'>Log in</Link>
        </span>
      </div>
    </div>
  )
}

export default Register