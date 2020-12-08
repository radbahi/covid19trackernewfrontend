import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import userActions from '../redux/actions'
// Use prettier to format your code and keep it neat
// Hit command shift p and hit enter or select it
const Profile = (props) => {
  // const state = useSelector(state => state)
  // const dispatch = useDispatch()
  // console.log(state)
  const dispatch = useDispatch()

  const [locations, setLocations] = useState([])

  const getProvince = (event, { value }) => {
    console.log(value)
    dispatch(userActions.updateUserFromDB(id, value))
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
            // { key: 'bj', value: 'bj', flag: 'bj', text: 'Benin' }
            setLocations(
              countryData.map((location) => {
                return {
                  key: location.id,
                  value: location.id,
                  text: `${location.country}`,
                }
              })
            )
            // countryList.push(countryData)
            // go to chrome
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
    <h3>You don't have a set location.</h3>
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
