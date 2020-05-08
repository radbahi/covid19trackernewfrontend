import { combineReducers } from "redux";

// USER
const UserReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case "SET_USER":
      return payload;
    case "CLEAR_USER":
      return {};
    default:
      return state;
  }
};

// LOCATIONS do i even need this?
const LocationReducer = (state = [], { type, payload }) => {
  switch (type) {
    case "FETCH_INFECTED":
      return payload
    default:
      return state
  }
}

const x = {
  user: UserReducer,
};

export default combineReducers(x);
