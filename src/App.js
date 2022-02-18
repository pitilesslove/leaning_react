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
            debugger;         // 개발자 도구를 켜놓았으면, break point가 된다.
          }}>{this.state.subject.title}</a></h1> 
          {this.props.sub}
        </header>
        <TOC data={this.state.contents}></TOC>
        <Content title="HTML" desc="HTML is HyperText Markup Language"></Content>
      </div>
    );
  }
}

export default App;
