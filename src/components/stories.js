import React, { useState, useEffect } from "react";
import _ from "lodash";
import { Button, Card } from "react-bootstrap";

const Stories = () => {
  const [stories, setStories] = useState([]);
  useEffect(() => {
    fetch("https://sheltered-crag-77668.herokuapp.com/stories").then((response) => {
      if (response.status !== 200) {
        console.log(`There was a problem: ${response.status}`);
        return;
      }
      response.json().then((storyData) => {
        console.log(storyData);
        setStories(storyData);
      });
    });
  }, []);

  const divStyle = {
    margin: "40px",
    border: "5px solid pink",
    position: "absolute",
    left: "120px",
    top: "520px",
    width: "570px",
    height: "500px",
    textAlign: "center",
    overflow: "scroll",
  };

  // const columns = _.times(1, (i) => (
  //     <Grid.Column key={i}>
  //       <Image src='https://upload.wikimedia.org/wikipedia/commons/6/6a/Ubuntu_19.10_Eoan_Ermine.png' />
  //       Text
  //     </Grid.Column>
  //   ))

  return (
    <div style={divStyle}>
      {stories.map((stories) => {
        return (
          <Card style={{ width: "39.3rem" }}>
            <Card.Img
              variant="top"
              alt={stories.title}
              src={stories.urlToImage}
            />
            <Card.Body>
              <Card.Title>{stories.title}</Card.Title>
              <Card.Subtitle>{stories.publishedAt}.</Card.Subtitle>
              <Card.Text>{stories.description}</Card.Text>
              <Button variant="primary" target="_blank" href={stories.url}>
                Go to story
              </Button>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
};

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

export default Stories;
