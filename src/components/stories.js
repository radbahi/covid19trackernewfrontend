import React, { useState, useEffect } from 'react'
import { Button, Card } from 'react-bootstrap'

const Stories = () => {
  const [stories, setStories] = useState([])
  useEffect(() => {
    fetch('https://sheltered-crag-77668.herokuapp.com/stories').then(
      (response) => {
        if (response.status !== 200) {
          console.log(`There was a problem: ${response.status}`)
          return
        }
        response.json().then((storyData) => {
          setStories(storyData)
        })
      }
    )
  }, [])

  const divStyle = {
    height: '800px',
    textAlign: 'center',
    overflow: 'scroll',
    display: 'flex',
    flexDirection: 'column',
    // overflow: "scroll",
    // textAlign: 'right',
    // flexGrow: 2,
    // flexShrink: 2,
    // justifyContent: 'center',
    // alignItems: 'center',
    // flexBasis: "20em",
    // margin: '3vh',
    // padding: '50vh',
    // marginTop: '-em',
    // marginRight: '55vw',
    // marginLeft: '1vw',
    // marginBottom: '10vw',
    // padding: '20vh',
    // marginLeft: 'auto',
    // flexWrap: 'wrap',
    // position: 'fixed',
    // height: '100%'
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>International News about COVID-19</h1>
      <div style={divStyle}>
        {stories.map((stories) => {
          return (
            <Card key={stories.id}>
              <Card.Img
                variant='top'
                alt={stories.title}
                src={stories.urlToImage}
              />
              <Card.Body>
                <Card.Title>{stories.title}</Card.Title>
                <Card.Subtitle>{stories.publishedAt}.</Card.Subtitle>
                <Card.Text>{stories.description}</Card.Text>
                <Button variant='primary' target='_blank' href={stories.url}>
                  Go to story
                </Button>
              </Card.Body>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

// useEffect(() => {
//     fetch("http://localhost:3000/provinces")
//         .then(response => {
//         if (response.status !== 200) {
//             console.log(`There was a problem: ${response.status}`)
//             return
//         }
//             response.json().then(infectedData => {
//                 // console.log(infectedData)
//                 setInfected(infectedData)
//             })
//         })
// }, [])

export default Stories
