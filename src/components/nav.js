import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import userActions from '../redux/actions';
import { Button } from 'semantic-ui-react'

const Nav = () => {
    const username = useSelector(state => state.user.username);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(userActions.logoutUser());
  };
  return (
    <nav style={{ backgroundColor: '#4A586E',display: 'flex', justifyContent: 'space-evenly' }}>
      <Link to="/"><Button>Home</Button></Link>
      {!username ? (<Link to="/signup"><Button>Signup</Button></Link>) : 
        (<Link to="/profile"><Button>Profile</Button></Link>) }
      {!username ? (<Link to="/login"><Button>Login</Button></Link>) : 
        (<Link to="/" onClick={handleLogout}>
        <Button>Logout</Button>
      </Link>)}
    </nav>
  );
};


export default Nav;

// import { useSelector } from 'react-redux';
// import WorldMap from '../components/worldmap.js'
// import TestMap from '../components/testmap.js'

// const Home = () => {
//   const username = useSelector(state => state.username);
//   const text = username ? (
//     <h1>{username} is currently logged in</h1>
//   ) : (
//     <h1>Nobody is logged in</h1>
//   );