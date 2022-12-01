import React, { Component } from "react";

import TechContext from "../../context/techs/techContext";

class TechItem extends Component {

  constructor(props){
    super(props);
    this.setState={}
  }
  
  render(){
    const { deleteTechs } = this.context;
  return (
    <li className='collection-item'>
      <div>
        {this.props.tech.firstName} {this.props.tech.lastName}
        <a
          href='#!'
          className='secondary-content'
          onClick={() => deleteTechs(this.props.tech.id)}
        >
          <i className='material-icons grey-text'>delete</i>
        </a>
      </div>
    </li>
  );
}
};
TechItem.contextType = TechContext;
export default TechItem;