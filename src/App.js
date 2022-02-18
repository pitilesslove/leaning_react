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
        <Subject 
          title={this.state.subject.title} 
          sub={this.state.subject.sub}
          onChangePage={function(){
            this.setState({
              mode:'read'
            });
          }.bind(this)}
        >
        </Subject>
        <TOC data={this.state.contents}></TOC>
        <Content title={_title} desc={_desc}></Content>
      </div>
    );
  }
}

export default App;
