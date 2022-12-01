import React, { Component } from "react";
import Moment from "react-moment";
import M from "materialize-css/dist/js/materialize.min.js";

import LogContext from "../../context/logs/logContext";


class LogItem extends Component {

  constructor(props){
    super(props);
    this.state= {

    }
  }
  onDelete = () => {
    this.context.deleteLogs(this.props.log.id);
    M.toast({ html: "Log Deleted" });
  };
render(){
  const { setCurrentLog } = this.context;
  return (
    <li className='collection-item'>
      <div>
        <a
          href='#edit-log-modal'
          className={`modal-trigger ${
            this.props.log.attention ? "red-text" : "blue-text"
          }`}
          onClick={() => setCurrentLog(this.props.log)}
        >
          {this.props.log.message}
        </a>
        <br />
        <span className='grey-text'>
          <span className='black-text'>ID #{this.props.log.id}</span> last updated by{" "}
          <span className='black-text'>{this.props.log.tech}</span> on{" "}
          <Moment format='MMMM Do YYYY, h:mm:ss a'>{this.props.log.date}</Moment>
        </span>
        {/*delete action*/}
        <a href='£!' onClick={this.onDelete} className='secondary-content'>
          <i className='material-icons grey-text'>delete</i>
        </a>
      </div>
    </li>
  );
}
};
LogItem.contextType = LogContext;
export default LogItem;