import {
  START_LOADING,
  END_LOADING,
  FETCH_CONTACTMESSAGE,
  CREATE_CONTACTMESSAGE,
  DELETE_CONTACTMESSAGE,
} from "../constants/actionTypes";

export default (state = { isLoading: true, contact: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case DELETE_CONTACTMESSAGE:
      return {
        ...state,
        contact: state.contact.filter((cont) => cont._id !== action.payload),
      };
    case FETCH_CONTACTMESSAGE:
      return {
        ...state,
        contact: action.payload,
      };
    case CREATE_CONTACTMESSAGE:
      return { ...state, contact: [...state.contact, action.contact] };
    default:
      return state;
  }
};
