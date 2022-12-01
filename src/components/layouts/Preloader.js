import React, {Component} from "react";

class Preloader extends Component {
    render(){
         return (
            <div className='progress blue lighten-4'>
                  <div className='indeterminate-blue'></div>
            </div>
         );
}
};
export default Preloader;