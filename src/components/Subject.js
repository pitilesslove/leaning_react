import React, { Component } from "react";

class Subject extends Component {
    render() {
      return (
        <header>
          {/* React에는 attribute를 props라고 부른다. */}
          <h1>{this.props.title}</h1> 
          {this.props.sub}
        </header>
      );
    }
  }

  export default Subject;