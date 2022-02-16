import React, { Component } from "react";

class TOC extends Component {

    render() {
        var lists = [];
        var data = this.props.data;
        var i = 0;
        while(i < data.length) {
            lists.push(<li><a href={"/content/"+data[i].id}>{data[i].title}</a></li>)
            i++;
        }
      return (
        <nav>
          <ul>
            {lists}
          </ul>
        </nav>
      );
    }
}

// TOC를 다른 파일에서 가져다 쓸 수 있게 export 해준다.
export default TOC;