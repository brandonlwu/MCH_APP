import React, { Component } from 'react';
import './Break.css';
import { Redirect } from "react-router-dom";

class Break1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
          continue: false,
        }
      }

      keyFunction = (event) => {
        if(event.keyCode === 81) {
          this.setState((state, props) => ({
              continue: true
          }));
        }
      }

      componentDidMount(){
        document.addEventListener("keydown", this.keyFunction, false);
      }
      componentWillUnmount(){
        document.removeEventListener("keydown", this.keyFunction, false);
      }

      render() {

        if(this.state.continue === true){
          return <Redirect to="/Trial_TT_2" />
        }

        return (
          <div className="Break">
            <input type="hidden"/>
            <header className="Break-header">
            <div className="text-container">
              <p className="Break-text">
               Great!
                <br /><br /> Take a quick break. Three more to go!
                <br /><br /> Remember: Continue to listen carefully and do the best you can.
                <br /><br /> The task will continue to be difficult, but it is okay to guess and it is okay to be uncertain.
                <br /><br /> Press <b> "Q"/YES </b> if you <b> DO </b> hear a tone.
                <br /><br /> Press <b> "E"/NO </b> if you <b> DO NOT </b> hear a tone.
                <br /><br /> Please respond as <b> QUICKLY </b> and as <b> ACCURATELY </b> as you <b> POSSIBLY CAN </b>
                <br /><br /><br /> PRESS "Q"/YES TO CONTINUE WITH THE NEXT PART

              </p>
            </div>
            </header>
          </div>
        );
      }
    }

export default Break1;
