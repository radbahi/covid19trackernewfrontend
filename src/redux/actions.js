const BASE_URL = "http://localhost:3000";
const USERS_URL = BASE_URL + "/users";
const PERSIST_URL = BASE_URL + "/persist";
const LOGIN_URL = BASE_URL + "/login";
const SPECIFIC_USER_URL = (id) => USERS_URL + "/" + id;

// Redux Actions

const setUserAction = (userObj) => ({
  type: "SET_USER",
  payload: userObj,
});

const clearUserAction = () => ({
  type: "CLEAR_USER",
});

// Fetch

const newUserToDB = (userObj) => (dispatch) => {
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userObj),
  };
  fetch(USERS_URL, config)
    .then((r) => r.json())
    .then((data) => {
      if (data.user) {
        console.log(data);
        dispatch(setUserAction(data.user));
        localStorage.setItem("token", data.token);
      } else {
        alert(data.errors); // HAS KEY OF ERRORS ANYWAY DESPITE SUCCESSFUL CREATION
      }
    });
};

const deleteUserFromDB = (userId) => (dispatch) => {
  const config = {
    method: "DELETE",
  };
  fetch(SPECIFIC_USER_URL(userId), config).then((r) => {
    dispatch(clearUserAction());
    localStorage.clear();
  });
};

const updateUserFromDB = (userId, provinceObj) => (dispatch) => {
  const config = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ locations_id: provinceObj }),
  };
  fetch(SPECIFIC_USER_URL(userId), config)
    .then((r) => r.json())
    .then((data) => {
      dispatch(setUserAction(data));
    });
};

const loginUserToDB = (userCredentials) => (dispatch) => {
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userCredentials),
  };
  fetch(LOGIN_URL, config)
    .then((r) => r.json())
    .then((data) => {
      console.log(data)
      if (data.user) {
        dispatch(setUserAction(data.user));
        localStorage.setItem("token", data.token);
      } else {
        alert("User and/or password is incorrect."); // LOADS SLOWLY
      }
    });
};

const persistUser = () => (dispatch) => { // NEED TO GET THIS TO WORK WITH EXPRESS. NEED AUTH STUFF.
  const config = { // persistUser IS CALLED IN APP.JS
    method: "GET",
    headers: {
      Authorization: `bearer ` + localStorage.token,
    },
  };
  fetch(PERSIST_URL, config)
    .then((r) => r.json())
    .then((userInstance) => {
      dispatch(setUserAction(userInstance));
    });
};

const logoutUser = () => (dispatch) => {
  dispatch(clearUserAction());
  localStorage.clear();
};

export default {
  newUserToDB,
  deleteUserFromDB,
  loginUserToDB,
  persistUser,
  logoutUser,
  updateUserFromDB,
};
