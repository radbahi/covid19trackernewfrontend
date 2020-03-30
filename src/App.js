import React, {useEffect} from 'react';
import { BrowserRouter as Router, } from 'react-router-dom';
import Routes from './routes';
import {useDispatch} from 'react-redux'
import './App.css';
import Nav from './components/nav.js'
import Action from './redux/actions.js'
import 'bootstrap/dist/css/bootstrap.min.css';

// USESTATE IS LIKE THIS
//const [loading, setLoading] = useState(false)
//       ^ THIS IS TO CALL, SETLOADING IS TO DEFINE THE LOADING'S "STATE". EACH VARIABLE HAS IT'S OWN "STATE".
// TO GET THE VALUES OF THAT THING'S STATE, JUST CALL LOADING. OR WHATEVER U NAMED THE FIRST THING.

// // state = {
// //   user { 
//    name:'',
//    password: '', 
// // location: ''
// // }}

// userReducers
  // Actions: create, 
// destinationReducers


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }


function App() {
  // const username = useSelector(state => state.username);
  const dispatch = useDispatch()
  // const handleClick = () => {
  //   const payload = {
  //     username: 'John',
  //   }
  //   dispatch({type: "SET_USER", payload: payload})
  // }

  useEffect(() => {
    dispatch(Action.persistUser())
      // persist is already done in actions.js file
  }, [])



  return (
    <div className="App">
    <Router>
      <Nav/>
      <Routes />
    </Router>
    </div>
  );
}

export default App


