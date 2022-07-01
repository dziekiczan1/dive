import {
  START_LOADING,
  END_LOADING,
  FETCH_CONTACTMESSAGE,
  CREATE_CONTACTMESSAGE,
  DELETE_CONTACTMESSAGE,
} from "../constants/actionTypes";
import * as api from "../api";

//Action Creators

export const getContactMessage = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.getContactMessage();
    dispatch({ type: FETCH_CONTACTMESSAGE, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const createContactMessage = (cont) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createContactMessage(cont);

    dispatch({ type: CREATE_CONTACTMESSAGE, payload: data });

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const deleteContactMessage = (id) => async (dispatch) => {
  try {
    await api.deleteContactMessage(id);
    dispatch({ type: DELETE_CONTACTMESSAGE, payload: id });
  } catch (error) {
    console.log(error);
  }
};
