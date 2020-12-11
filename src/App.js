import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './routes'
import './App.css'
import Nav from './components/nav.js'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  // const username = useSelector(state => state.username);
  // const handleClick = () => {
  //   const payload = {
  //     username: 'John',
  //   }
  //   dispatch({type: "SET_USER", payload: payload})
  // }

  // useEffect(() => {
  //   dispatch(Action.persistUser());
  //   // persist is already done in actions.js file
  // }, []);

  return (
    <div className='App'>
      <Router>
        <Nav />
        <Routes />
      </Router>
    </div>
  )
}

export default App
