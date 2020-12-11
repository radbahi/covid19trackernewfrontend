import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import userActions from '../redux/actions'
import { Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

const Nav = () => {
  const username = useSelector((state) => state.user.username)
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(userActions.logoutUser())
  }
  return (
    <nav
      style={{
        backgroundColor: '#4A586E',
        display: 'flex',
        justifyContent: 'space-evenly',
      }}
    >
      <Link to='/'>
        <Button>Home</Button>
      </Link>
      {!username ? (
        <Link to='/signup'>
          <Button>Signup</Button>
        </Link>
      ) : (
        <Link to='/profile'>
          <Button>Profile</Button>
        </Link>
      )}
      {!username ? (
        <Link to='/login'>
          <Button>Login</Button>
        </Link>
      ) : (
        <Link to='/' onClick={handleLogout}>
          <Button>Logout</Button>
        </Link>
      )}
    </nav>
  )
}

export default Nav
