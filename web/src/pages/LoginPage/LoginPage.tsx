import { useState } from 'react'
import { Metadata } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import './LoginPage.scss'

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleTogglePassword = () => {
    setShowPassword(!showPassword)
  }

  const validatePassword = (password) => {
    const errors = []

    // Check minimum length
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long')
    }

    // Check for uppercase letter
    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push('Password must contain at least one uppercase letter')
    }

    // Check for lowercase letter
    if (!/(?=.*[a-z])/.test(password)) {
      errors.push('Password must contain at least one lowercase letter')
    }

    // Check for numbers
    if (!/(?=.*\d)/.test(password)) {
      errors.push('Password must contain at least one number')
    }

    // Check for special characters
    if (!/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(password)) {
      errors.push('Password must contain at least one special character')
    }

    return errors
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    setError('')

    const formData = new FormData(event.target)
    const email = formData.get('email')
    const password = formData.get('password')

    // Validation
    if (!email || !password) {
      setError('Please fill in all fields')
      setIsLoading(false)
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address')
      setIsLoading(false)
      return
    }

    // Strong password validation
    const passwordErrors = validatePassword(password)
    if (passwordErrors.length > 0) {
      setError(`Password requirements: ${passwordErrors.join(', ')}`)
      setIsLoading(false)
      return
    }

    try {
      // Simulate API call - replace with actual authentication
      await new Promise(resolve => setTimeout(resolve, 1500))

      // For demo - accept any valid credentials, in real app validate against backend
      console.log('Login attempt:', { email, password })

      // Successful login - navigate to dashboard
      navigate(routes.dashboard())

    } catch (err) {
      setError('Invalid email or password')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Metadata title="Login" description="Login page" />

      <div className="login-container">
        <div className="login-side">
          <div className="logo">
            <img src="logo.jpg" alt="Lendsqr Logo" />
          </div>
          <img
            src="image-bg.png"
            alt="Lendsqr Admin Dashboard"
            className="side-image"
          />
        </div>

        <div className="login-form-container">
          <div className="login-form">
            <h1>Welcome back!</h1>
            <p>Please enter your details to sign in</p>

            <form onSubmit={handleLogin}>
              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="password-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={handleTogglePassword}
                    disabled={isLoading}
                  >
                    {showPassword ? 'HIDE' : 'SHOW'}
                  </button>
                </div>
              </div>

              <div className="forgot-password">
                <a href="#">Forgot password?</a>
              </div>

              <button
                type="submit"
                className="login-button"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage
