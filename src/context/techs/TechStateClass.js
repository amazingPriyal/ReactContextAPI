import React, { Component } from 'react'
import TechContext from "./techContext";


class TechStateClass extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            techs: null,
            loading: false,
            error: null,
        }
    }
               
    getTechs = async () => {
        try {
          this.setLoading();
    
          const res = await fetch("/techs");
          const data = await res.json();
    
          this.setState({
            ...this.state,
            techs: data,
            loading: false,
          })
        } catch (error) {

          this.setState({
            ...this.state,
            error: error.response.statusText,
            loading: false,
          })
        }
      };
    
      //Add Techs
    addTech = async (tech) => {
        try {
          this.setLoading();
    
          const res = await fetch("/techs", {
            method: "POST",
            body: JSON.stringify(tech),
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await res.json();
    
          this.setState({
            ...this.state,
            techs: [...this.state.techs, data],
            loading: false,
          })
        } catch (error) {
            this.setState({
                ...this.state,
                error: error.response.statusText,
                loading: false,
              })
        }
      };
    
      //delete Tech
     deleteTechs = async (id) => {
        try {
          this.setLoading();
    
          await fetch(`/techs/${id}`, {
            method: "DELETE",
          });
    
          this.setState({
            ...this.state,
            techs: this.state.techs.filter((tech) => tech.id !== id),
            loading: false,
          })
        } catch (error) {
            this.setState({
                ...this.state,
                error: error.response.statusText,
                loading: false,
              })
        }
      };
    
      //set Loading to true
    setLoading = () => {
        this.setState({
            ...this.state,
            loading: true
        })
      };
    
      render(){

        const { getTechs, addTech, deleteTechs, setLoading } = this

          return (
              <TechContext.Provider
              value={{
                  techs: this.state.techs,
            loading: this.state.loading,
            error: this.state.error,
            getTechs,
            addTech,
            deleteTechs,
            setLoading,
          }}
        >
          {this.props.children}
        </TechContext.Provider>
      );
    }
    };
    
export default TechStateClass;