import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Dropdown, Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import userActions from '../redux/actions'
const Profile = (props) => {
  const dispatch = useDispatch()

  const [locations, setLocations] = useState([])

  const getProvince = (event, { value }) => {
    console.log(value)
    dispatch(userActions.updateUserFromDB(id, value))
  }

  const setWorld = (event) => {
    dispatch(userActions.updateUserFromDB(id, null))
  }

  useEffect(() => {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch
    try {
      fetch('https://sheltered-crag-77668.herokuapp.com/locations').then(
        (response) => {
          if (response.status !== 200) {
            console.log(`There was a problem: ${response.status}`)
            return
          }
          response.json().then((countryData) => {
            console.log(countryData)
            setLocations(
              countryData.map((location) => {
                return {
                  key: location.id,
                  value: location.id,
                  text: `${location.country}`,
                }
              })
            )
            // Instead of creating the object here, why not send a response from your backend
            // That has the data sanitized in the fashion you have on lines 53-55.
          })
        }
      )
    } catch (error) {
      console.log(error)
    }
  }, [])

  const location = useSelector((state) => state.user.locations_id)
  const id = useSelector((state) => state.user.id)

  const loggedIn = location ? (
    <h3>Your set location is {location}.</h3>
  ) : (
    <h3>Your set location is the whole world.</h3>
  )

  const handleDelete = (e) => {
    e.preventDefault()
    dispatch(userActions.deleteUserFromDB(id))
    props.history.push('/')
  }

  return (
    <div>
      Select your location below
      {/* <Dropdown
        placeholder="Country"
        fluid
        search
        selection
        options={countries}
        onChange={getCountryProvinces}
      /> */}
      <Button onClick={setWorld}>Set to world</Button>
      <Dropdown
        placeholder='Location'
        fluid
        search
        selection
        options={locations}
        onChange={getProvince}
      />
      {loggedIn}
      <button onClick={handleDelete}>Delete your profile</button>
    </div>
  )
}

export default Profile
