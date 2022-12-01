import React, {  Component } from "react";
import TechItem from "./TechItem";

import TechContext from "../../context/techs/techContext";


class TechListModal extends Component {
 
  componentDidMount(){
    this.context.getTechs();
  }
  // showing tech list in modal

  render(){
    const { techs, loading } = this.context;
    return (
    <div id='tech-list-modal' className='modal'>
      <div className='modal-content'>
        <h4>Technician List</h4>
        <ul className='collection'>
          {!loading &&
            techs !== null &&
            techs.map((tech) => <TechItem tech={tech} key={tech.id} />)}
        </ul>
      </div>
    </div>
  );
}
};
TechListModal.contextType = TechContext;
export default TechListModal;