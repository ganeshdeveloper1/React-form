import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.scss'
import graph from './image.webp'

function App() {
  const values = {
    email: '',
    password: '',
    confirmPass: '',
    name: '',
    phone: '',
  }
  const router = useNavigate()
  const [formValues, setFormValues] = useState(values)
  const [errors, setErrors] = useState({})
  const [isError, setIsError] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors(formValidate(formValues))

    if (isError) {
      router('/success')
    }
  }

  const formValidate = (value) => {
    const errorMsg = {}
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/

    if (!value.email) {
      errorMsg.email = 'Email is required!'
    } else if (!emailRegex.test(value.email)) {
      errorMsg.email = 'This is not a valid email!'
    }

    if (!value.password) {
      errorMsg.password = 'Password is required!'
    } else if (value.password.length < 6) {
      errorMsg.password = 'Password must be greater than 6 character'
    } else if (value.password.length > 20) {
      errorMsg.password = 'Password must be less than 20 character'
    }

    if (value.password !== value.confirmPass) {
      errorMsg.confirmPass = 'password does not match'
    }

    if (!value.name) {
      errorMsg.name = 'Enter the name'
    }

    if (!value.phone) {
      errorMsg.phone = 'Enter the phone No.'
    } else if (!phoneRegex.test(value.phone)) {
      errorMsg.phone = 'Enter the valid phoneNo.'
    }
    if (!value.email || !value.password || !value.name || !value.phone) {
      setIsError(false)
    } else {
      setIsError(true)
    }
    return errorMsg
  }

  return (
    <div className='App'>
      <div className='form-bg'>
        <div className='graph min-height'>
          <img src={graph} alt='img' />
          <div className='content'>
            <p>Choose a date range</p>
            <span>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            </span>
          </div>
        </div>

        <div className='container min-height'>
          <form onSubmit={handleSubmit}>
            <h4>Create an account</h4>
            <div id='form-inputs'>
              <label>Your Email Address</label>
              <input
                type='email'
                name='email'
                value={formValues.email}
                onChange={handleChange}
              ></input>
              <span>{errors.email}</span>

              <label>Your password</label>
              <input
                type='password'
                name='password'
                value={formValues.password}
                onChange={handleChange}
              ></input>
              <span>{errors.password}</span>

              <label>Confirm your password</label>
              <input
                type='password'
                name='confirmPass'
                value={formValues.confirmPass}
                onChange={handleChange}
              ></input>
              <span>{errors.confirmPass}</span>

              <label>Your full name</label>
              <input
                type='text'
                name='name'
                value={formValues.name}
                onChange={handleChange}
              ></input>
              <span>{errors.name}</span>

              <label>Your phone number</label>
              <input
                id='phoneNo'
                type='text'
                name='phone'
                value={formValues.phone}
                onChange={handleChange}
              ></input>
              <span>{errors.phone}</span>
            </div>
            <div className='checkbox'>
              <label>
                <input type='checkbox' />I read and agree Terms and Conditions.
              </label>
            </div>
            <button type='submit' className='btn'>
              Create account
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App
