import React, { Component } from "react";

class TOC extends Component {

    render() {
      console.log('TOC render');
        var lists = [];
        var data = this.props.data;
        var i = 0;
        while(i < data.length) {
            lists.push(
            <li key={data[i].id}>
              <a 
                href={"/content/"+data[i].id}
                data-id={data[i].id}    // a 태그의 props 값으로 지정해서, 상위 컴포넌트가 a태그의 props를 
                // onClick={function(e){
                //   e.preventDefault();
                //   this.props.onChangePage(e.target.dataset.id); // 그 a캐그를 target이라 하고, data-id를 dataset.id로 표현한다
                // }.bind(this)}
                // 혹은 bind에 인자를 줘서 값을 얻어올 수 있다.
                onClick={function(id, testNumber, e) {
                  e.preventDefault();
                  this.props.onChangePage(id);
                }.bind(this, data[i].id, 369)}
                >
                {data[i].title}
              </a>
            </li>);
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