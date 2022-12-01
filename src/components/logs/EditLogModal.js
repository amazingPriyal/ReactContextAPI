import React, { Component } from "react";
import M from "materialize-css/dist/js/materialize.min.js";

import LogContext from "../../context/logs/logContext";

class EditLogModal extends Component {
  constructor(props){
    super(props);
    this.state={
      message : "",
      attention : false,
      tech : ""
    }
  }
// As in functional based component we rerender based on some specific value change. Eg. if current is change then only we have to
// rerender and that will be handle in useEffect but in class based we are checking current's prev state and current state.
  componentDidUpdate(prevProps,prevState){
    if(prevState.current !== this.state.current){
        this.setState(
          {
            message :this.current.message,
            tech : this.current.tech,
            attention : this.current.attention
          }
        )
    }
  }


   onSubmit = () => {
    if (this.state.message === "") {
      M.toast({ html: "Please enter a message and tech" });
    } else {
      const editLog = {
        id: this.context.current.id,
        message : this.state.message,
        attention : this.state.attention,
        tech : this.state.tech,
      };

      //updating log
      this.context.updateLog(editLog);
      M.toast({ html: `Log updated` });

      // Clear fields
      this.setState({
        message: "",
        tech:"",
        attention: false
      })
    }
  };

  render(){
  return (
    <div id='edit-log-modal' className='modal' style={modalStyle}>
      <div className='modal-content'>
        <h4>Enter System Log</h4>
        <div className='row'>
          <div className='input-field'>
            <input
              type='text'
              name='message'
              value={this.state.message}
              onChange={(e) => this.setState({
                ...this.setState,
                message : e.target.value
              })}
            />
          </div>
        </div>
        
        <div className='row'>
          <div className='input-field'>
            <p>
              <label>
                <input
                  type='checkbox'
                  className='filled-in'
                  checked={this.state.attention}
                  value={this.state.attention}
                  onChange={(e) => this.setState({
                    ...this.setState,
                    attention : !this.attention // check box for edit log
                  })}
                ></input>
                <span>Needs Attention</span>
              </label>
            </p>
          </div>
        </div>
      </div>
      <div className='modal-footer'>
        <a
          href='#!'
          onClick={this.onSubmit}
          className='modal-close waves-effect blue waves-light btn '
        >
          Enter
        </a>
      </div>
    </div>
  );
  }
};

const modalStyle = {
  width: "75%",
  height: "75%",
};
EditLogModal.contextType= LogContext;
export default EditLogModal;