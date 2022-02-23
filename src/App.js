import React, { Component } from 'react';
import TOC from './components/TOC';
import ReadContent from './components/ReadContent';
import CreateContent from './components/CreateContent';
import Subject from './components/Subject';
import Control from './components/Control';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.max_content_id = 3;
    // state는 Component의 로컬 변수라고 생각한다.
    this.state = {
      mode: 'read',
      selected_content_id: 2,
      subject: { title: 'WEB', sub: 'World Wide Web' },
      welcome: { title: 'Welcome', desc: 'Hello React!!' },
      contents: [
        { id: 1, title: 'HTML', desc: 'HTML is Hyper Text ...' },
        { id: 2, title: 'CSS', desc: 'CSS is for design ...' },
        { id: 3, title: 'JavaScript', desc: 'JavaScript is for interactive ...' }
      ]
    }
  }

  // state나 props값이 바뀌면, 해당 render()함수가 호출된다.
  render() {
    console.log('App render');
    var _title = null;
    var _desc = null;
    var _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
    if (this.state.mode == 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
    } else if (this.state.mode == 'read') {
      var i = 0;
      while (i < this.state.contents.length) {
        var data = this.state.contents[i];
        if (data.id === this.state.selected_content_id) {
          _title = data.title;
          _desc = data.desc;
          break;
        }
        i++;
      }
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
    } else if (this.state.mode == "create") {
      _article = <CreateContent onSubmit={function (_title, _desc) {
        // add content to this.state.contents
        this.max_content_id++;
        var _contents = this.state.contents.concat( // conat은 원본을 바꾸지 않기 때문에, 새로운 변수로 담아야 한다.
          { id: this.max_content_id, title: _title, desc: _desc }
        );
        this.setState(  // setState를 호출해 줘야지, 랜더링을 다시 한다.
          { contents: _contents }
        );

        console.log(_title, _desc);
      }.bind(this)}></CreateContent>;
    }
    return (
      <div className="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={function () {
            this.setState({
              mode: 'welcome'
            });
          }.bind(this)}
        >
        </Subject>
        <TOC onChangePage={function (id) {
          //debugger;
          this.setState({
            mode: 'read',
            selected_content_id: Number(id)
          });
        }.bind(this)}
          data={this.state.contents}></TOC>
        <Control onChangeMode={function (_mode) {
          this.setState({
            mode: _mode
          })
        }.bind(this)}></Control>
        {_article}
      </div>
    );
  }
}

export default App;
