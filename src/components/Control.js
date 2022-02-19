import React, { Component } from "react";

class Control extends Component {
    render() {
      console.log('Control render');
      return (
        <div>
        <ul>
          <li><a href="/create" onClick={function(e){
            e.preventDefault();
            this.props.onChangeMode('create');
          }.bind(this)}>create</a></li>
          <li><a href="/update" onClick={function(e){
            e.preventDefault();
            this.props.onChangeMode('update');
          }.bind(this)}>update</a></li>
          <li><input type="button" value="delete"></input></li>
        </ul>
      </div>
      );
    }
  }

  export default Control;