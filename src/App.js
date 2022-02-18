import React, {Component} from 'react';
import TOC from './components/TOC';
import Content from './components/Content';
import Subject from './components/Subject';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    // state는 Component의 로컬 변수라고 생각한다.
    this.state = {
      mode: 'welcome',
      subject: { title:'WEB', sub:'World Wide Web'},
      welcome: { title:'Welcome', desc:'Hello React!!'},
      contents: [
        {id:1, title:'HTML', desc:'HTML is Hyper Text ...'},
        {id:2, title:'CSS', desc:'CSS is for design ...'},
        {id:3, title:'JavaScript', desc:'JavaScript is for interactive ...'}
      ]
    }
  }

  // state나 props값이 바뀌면, 해당 render()함수가 호출된다.
  render() {
    console.log('App render');
    var _title = null;
    var _desc = null;
    if(this.state.mode == 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
    } else if( this.state.mode == 'read') {
      _title = this.state.contents[0].title;
      _desc = this.state.contents[0].desc;
    }
    return (
      <div className="App">
        {/* <Subject title={this.state.subject.title} sub={this.state.subject.sub}></Subject> */}
        <header>
          {/* React에는 attribute를 props라고 부른다. */}
          <h1><a href="/" onClick={function(e) {  // 이벤트 객체 e를 받는다.
            console.log(e);
            e.preventDefault(); // 이게 있으면 기본적으로 refresh하는 동작을 막아버린다.
            // this.state.mode = 'welcome'; //  이 방법으로는 React가 state가 바뀐지 알아채지 못한다.
            this.setState( {    // React의 state를 바꾸고싶으면 setState()함수를 사용해야 한다.
              mode: 'read'
            })  // onClick()의 리스너에서 this는 자기만의 로컬 바운더리를 가진다.
            //  그렇기 때문에 부모 객체의 로컬 변수를 가지기 위해서는 bind()함수로 가져와야 한다.
          }.bind(this)}>{this.state.subject.title}</a></h1>

          {this.props.sub}
        </header>
        <TOC data={this.state.contents}></TOC>
        <Content title={_title} desc={_desc}></Content>
      </div>
    );
  }
}

export default App;
