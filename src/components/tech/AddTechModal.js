import React, { Component } from "react";
import M from "materialize-css/dist/js/materialize.min.js";

import TechContext from "../../context/techs/techContext";


class AddTechModal extends Component {
  constructor(props){
    super(props);
    this.state= {
      firstName : "",
      lastName : ""
    }
  }
  
   onSubmit = () => {
    // Checking for firstName and lastName
    if (this.firstName === "" || this.lastName === "") {
      M.toast({ html: "Please enter Fisrt and last Name" });
    } else {
      const newTech = {
        firstName : this.state.firstName,
        lastName : this.state.lastName,
      };

      this.context.addTech(newTech);
      M.toast({ html: "New Technicial Added" });
      
      // Clear fields
      this.setState({
        firstName: "",
        lastName:""
      })
    }
  };

  render(){
  console.log(this.state.firstName)
  //const { addTech } = this.context;
  return (
    <div id='add-tech-modal' className='modal'>
      <div className='modal-content'>
        <h4>New Technician</h4>
        <div className='row'>
          <div className='input-field'>
            <input
              type='text'
              name='firstName'
              value={this.state.firstName}
              onChange={(e) => this.setState({
                ...this.state,
                firstName : e.target.value
              })}
            />
            <label htmlFor='firstName' className='active'>
              First Name
            </label>
          </div>
        </div>
        <div className='row'>
          <div className='input-field'>
            <input
              type='text'
              name='lastName'
              value={this.state.lastName}
              onChange={(e) => this.setState({
                ...this.state,
                lastName :e.target.value
              })}
            />
            <label htmlFor='lastName' className='active'>
              Last Name
            </label>
          </div>
        </div>
      </div>
      <div className='modal-footer'>
        <a
          href='#!'
          onClick={this.onSubmit}
          className='modal-close waves-effect blue waves-light btn '
        >
          Add Technician
        </a>
      </div>
    </div>
  );
}
};
AddTechModal.contextType = TechContext;
export default AddTechModal;