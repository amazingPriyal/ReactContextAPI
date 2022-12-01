import React, { Component } from "react";
import M from "materialize-css/dist/js/materialize.min.js";

import LogContext from "../../context/logs/logContext";

class AddLogModal extends Component {
  
    constructor(props){
        super(props);
        this.state={
            message: "",
            attention: false,
            tech : ""
        }
    }
  
  onSubmit = () => {
    // Checking if message is not empty
    if (this.state.message === "") {
      M.toast({ html: "Please enter a message and tech" });
    } else {

      const newLog = {
       message : this.state.message,
        attention : this.state.attention,
        tech : this.state.tech,
        date: new Date(),  // It will show date and time 
      };

      // Adding log
      this.context.addNewLog(newLog);
      M.toast({ html: `Log added` });
      
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

      <div id='add-log-modal' className='modal' style={modalStyle}>
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
                <label htmlFor='message' className='active'>
                Log Message
                </label>
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
                    ...this.state,
                    attention: !this.state.attention
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
AddLogModal.contextType= LogContext;
export default AddLogModal;