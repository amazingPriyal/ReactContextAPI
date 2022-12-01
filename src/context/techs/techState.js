import React, { useReducer } from "react";

import TechReducer from "./techReducer";
import TechContext from "./techContext";

import {
  GET_TECHS,
  SET_LOADING,
  ADD_TECH,
  TECHS_ERROR,
  DELETE_TECH,
} from "../types";

const TechState = (props) => {
  const initialState = {
    techs: null,
    loading: false,
    error: null,
  };

  const [state, dispatch] = useReducer(TechReducer, initialState);

  const getTechs = async () => {
    try {
      setLoading();

      const res = await fetch("/techs");
      const data = await res.json();

      dispatch({
        type: GET_TECHS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: TECHS_ERROR,
        payload: error.response.statusText,
      });
    }
  };

  //Add Techs
  const addTech = async (tech) => {
    try {
      setLoading();

      const res = await fetch("/techs", {
        method: "POST",
        body: JSON.stringify(tech),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      dispatch({
        type: ADD_TECH,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: TECHS_ERROR,
        payload: error.response.statusText,
      });
    }
  };

  //delete Tech
  const deleteTechs = async (id) => {
    try {
      setLoading();

      await fetch(`/techs/${id}`, {
        method: "DELETE",
      });

      dispatch({
        type: DELETE_TECH,
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: TECHS_ERROR,
        payload: error.response.statusText,
      });
    }
  };

  //set Loading to true
  const setLoading = () => {
    dispatch({
      type: SET_LOADING,
    });
  };

  return (
    <TechContext.Provider
      value={{
        techs: state.techs,
        loading: state.loading,
        error: state.error,
        getTechs,
        addTech,
        deleteTechs,
        setLoading,
      }}
    >
      {props.children}
    </TechContext.Provider>
  );
};

export default TechState;