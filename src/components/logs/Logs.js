import React, { Component } from "react";
import LogItem from "./LogItem";
import Preloader from "../layouts/Preloader";

import LogContext from "../../context/logs/logContext";

class Logs extends Component {
componentDidMount(){
  this.context.getLogs(); // so that it will be called only at first time 
}

  

  render(){
    const { logs, loading } = this.context;
    if (loading || logs === null) {
      return <Preloader />;
    }
  return (
    <ul className='collection with-header'>
      <li className='collection-header'>
        <h4 className='center'>System Logs</h4>
      </li>
      
      {!loading && logs.length === 0 ? (
        <p className='center'>No logs to show...</p>
      ) : (
        logs.map((log) => <LogItem log={log} key={log.id} />)
      )}
    </ul>
  );
  // In return tag its checking if length of logs is 0 i.e. no logs are presented then show No logs to show.
}
};
Logs.contextType = LogContext;
export default Logs;