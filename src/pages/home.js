import React from 'react'
import { useSelector } from 'react-redux'
import WorldMap from '../components/worldmap.js'
import Stories from '../components/stories.js'
import VirusInfo from '../components/virusinfo.js'

const Home = () => {
  // const state = useSelector(state => state)
  // const dispatch = useDispatch()
  // console.log(state)
  const username = useSelector((state) => state.user.username)
  const loggedIn = username ? (
    <h1>Welcome, {username}</h1>
  ) : (
    <h1>Nobody is logged in</h1>
  )

  return (
    <div>
      {loggedIn}
      <WorldMap />
      <div className='rowC'>
        <Stories />
        <VirusInfo />
      </div>
    </div>
  )
}

export default Home
