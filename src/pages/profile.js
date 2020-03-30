import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dropdown } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import userActions from "../redux/actions";
// Use prettier to format your code and keep it neat
// Hit command shift p and hit enter or select it
const Profile = props => {
  // const state = useSelector(state => state)
  // const dispatch = useDispatch()
  // console.log(state)
  const dispatch = useDispatch();


  const [countries, setCountries] = useState([]);
  const [provinces, setProvinces] = useState([]);

  // These are being refactored into hooks
  // const countryList = [];
  // const provinceList = [];

  const getCountryProvinces = (event, { value }) => {
    fetch(
      `http://localhost:3000/countries/${value}/provinces`
    ).then(response => {
      // console.log(response.json())
      if (response.status !== 200) {
        console.log(`There was a problem: ${response.status}`);
        return;
      }
      response.json().then(provinceData => {
        setProvinces(
          provinceData.map(province => {
            return {
              key: province.id,
              value: province.id,
              text: province.title
            };
          })
        );
      });
    });
    //setSelectedCountry({ id: value });
    // console.log(value);
    // debugger
  };


  const getProvince = (event, { value }) => {
    console.log(value);
    dispatch(userActions.updateUserFromDB(id, value));
    // countryTitle = provinces.find(province => province.value === location).text
    debugger
  };

  // const getProvinces = () => {
  //   fetch(
  //     `http://localhost:3000/countries/${selectedCountry.id}/provinces`
  //   ).then(response => {
  //     // console.log(response.json())
  //     if (response.status !== 200) {
  //       console.log(`There was a problem: ${response.status}`);
  //       return;
  //     }
  //     response.json().then(provinceData => {
  //       setProvinces(
  //         provinceData.map(province => {
  //           return {
  //             key: province.id,
  //             value: province.id,
  //             text: province.title
  //           };
  //         })
  //       );
  //     });
  //   });
  // };

  useEffect(() => {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch
    try {
      fetch("http://localhost:3000/countries").then(response => {
        if (response.status !== 200) {
          console.log(`There was a problem: ${response.status}`);
          return;
        }
        response.json().then(countryData => {
          console.log(countryData);
          // { key: 'bj', value: 'bj', flag: 'bj', text: 'Benin' }
          setCountries(
            countryData.map(country => {
              return {
                key: country.id,
                value: country.id,
                text: country.title
              };
            })
          );
          // countryList.push(countryData)
          // go to chrome
          // Instead of creating the object here, why not send a response from your backend
          // That has the data sanitized in the fashion you have on lines 53-55.
        });
      });
    } catch (error) {
      console.log(error);
    }}, []);
  // Instead of using this useEffect, let's create an api endpoint that searches province per country id.
  // Example: We fetch a country ID for Iceland, we only get provinces for iceland.
  // First let's create that api endpoint
  // useEffect(() => {
  //   if (selectedCountry) {
  //     fetch(
  //       `http://localhost:3000/countries/${selectedCountry.id}/provinces`
  //     ).then(response => {
  //       // console.log(response.json())
  //       if (response.status !== 200) {
  //         console.log(`There was a problem: ${response.status}`);
  //         return;
  //       }
  //       response.json().then(provinceData => {
  //         setProvinces(
  //           provinceData.map(province => {
  //             return {
  //               key: province.id,
  //               value: province.id,
  //               text: province.title
  //             };
  //           })
  //         );
  //       });
  //     });
  //   }
  // }, [selectedCountry]);

  const location = useSelector(state => state.user.location);
  const id = useSelector(state => state.user.id);

  
  const displayLocation = e => {
    provinces.map((province) => {
      if (province.id === location) {
        return province.title
      }
      // FIX THIS UP FOR LATER USE
    })
  };
  
  let countryTitle = null

  const loggedIn = location ? (
    <h3>Your set location is {location}.</h3>
    ) : (
    <h3>You don't have a set location.</h3>
  );
  
  const handleDelete = e => {
    e.preventDefault();
    dispatch(userActions.deleteUserFromDB(id));
    props.history.push("/");
  };

  return (
    <div>
      Select your location below
      <Dropdown
        placeholder="Country"
        fluid
        search
        selection
        options={countries}
        onChange={getCountryProvinces}
        />
      <Dropdown
        placeholder="Province"
        fluid
        search
        selection
        options={provinces}
        onChange={getProvince}
        />
      {loggedIn}
      <button onClick={handleDelete}>Delete your profile</button>
    </div>
  );
};

export default Profile;
