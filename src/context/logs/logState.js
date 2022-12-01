import React, { useReducer } from "react";

import LogContext from "./logContext";
import LogReducer from "./logReducer";

import {
  GET_LOGS,
  SET_LOADING,
  LOGS_ERROR,
  ADD_LOG,
  DELETE_LOG,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_LOG,
  SEARCH_LOGS,
} from "../types";

const LogState = (props) => {
  const initialState = {
    logs: null,
    current: null,
    loading: false,
    error: null,
  };

  const [state, dispatch] = useReducer(LogReducer, initialState);

  const getLogs = async () => {
    try {
      setLoading();

      const res = await fetch("/logs");
      const data = await res.json();

      dispatch({
        type: GET_LOGS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: LOGS_ERROR,
        payload: error.response.statusText,
      });
    }
  };

  const addNewLog = async (log) => {
    try {
      setLoading();

      const res = await fetch("/logs", {
        method: "POST",
        body: JSON.stringify(log),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      dispatch({
        type: ADD_LOG,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: LOGS_ERROR,
        payload: error.response.statusText,
      });
    }
  };

  const deleteLogs = async (id) => {
    try {
      setLoading();

      await fetch(`/logs/${id}`, {
        method: "DELETE",
      });

      dispatch({
        type: DELETE_LOG,
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: LOGS_ERROR,
        payload: error.response.statusText,
      });
    }
  };

  const updateLog = async (log) => {
    try {
      setLoading();

      const res = await fetch(`/logs/${log.id}`, {
        method: "PUT",
        body: JSON.stringify(log),
        headers: {
          "Content-Type": "application/json",
        },
      });

      //get updated log object
      const data = await res.json();

      dispatch({
        type: UPDATE_LOG,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: LOGS_ERROR,
        payload: error.response.statusText,
      });
    }
  };

  const searchLogs = async (text) => {
    try {
      setLoading();

      const res = await fetch(`/logs?q=${text}`);
      const data = await res.json();

      dispatch({
        type: SEARCH_LOGS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: LOGS_ERROR,
        payload: error.response.statusText,
      });
    }
  };

  const setCurrentLog = (log) => {
    dispatch({
      type: SET_CURRENT,
      payload: log,
    });
  };

  const clearCurrentLog = () => {
    dispatch({
      type: CLEAR_CURRENT,
    });
  };

  // set loading to true
  const setLoading = () => {
    dispatch({
      type: SET_LOADING,
    });
  };

  return (
    <LogContext.Provider
      value={{
        logs: state.logs,
        current: state.current,
        loading: state.loading,
        error: state.error,
        getLogs,
        addNewLog,
        updateLog,
        deleteLogs,
        setCurrentLog,
        setLoading,
        clearCurrentLog,
        searchLogs,
      }}
    >
      {props.children}
    </LogContext.Provider>
  );
};

export default LogState;