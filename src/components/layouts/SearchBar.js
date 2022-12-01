//import { render } from "@testing-library/react";
import React, {  Component } from "react";
import LogContext from "../../context/logs/logContext";

class SearchBar extends Component {
  //const logContext = useContext(LogContext);  This way we can do it in functional component but in class we can directly do it by contextType.
  
  //const text = useRef("");
  constructor(props){
      super(props);
      this.state={}
    this.text=React.createRef(); // as in functional we used useRef hook
}


render(){
    const { searchLogs } = this.context;
    const onChange = (e) => {
        searchLogs(this.text.current.value);
    };
    return (
    <nav style={{ marginBottom: "30px" }} className='blue'>
      <div className='nav-wrapper'>
        <form>
          <div className='input-field'>
            <input
              id='search'
              type='search'
              placeholder='Search Logs...'
              ref={this.text}
              onChange={onChange}
            />
            <label className='label-icon' htmlFor='search'>
              <i className='material-icons'>search</i>
            </label>
            <i className='material-icons'>close</i>
          </div>
        </form>
      </div>
    </nav>
  );
  }
};

SearchBar.contextType= LogContext;
export default SearchBar;