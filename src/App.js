import React, { Component } from 'react';
import TOC from './components/TOC';
import ReadContent from './components/ReadContent';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';
import Subject from './components/Subject';
import Control from './components/Control';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.max_content_id = 3;
    // state는 Component의 로컬 변수라고 생각한다.
    this.state = {
      mode: 'welcome',
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
  getReadContent() {
    var i = 0;
    while (i < this.state.contents.length) {
      var data = this.state.contents[i];
      if (data.id === this.state.selected_content_id) {
        return data;
      }
      i++;
    }
  }

  getContent() {
    var _title = null;
    var _desc = null;
    var _article = null;
    if (this.state.mode == 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
    } else if (this.state.mode == 'read') {
      var _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>;
    } else if (this.state.mode == "create") {
      _article = <CreateContent onSubmit={function (_title, _desc) {
        // add content to this.state.contents
        this.max_content_id++;
        var newContents = Array.from(this.state.contents);  //  Array.from() 이란 함수로, 함수를 복사해서 가져올 수 있다. 
        // 객체의 경우에는 Object.assign()으로 복사할 수 있다.
        newContents.push(   //
          { id: this.max_content_id, title: _title, desc: _desc }
        );
        this.setState(  // setState를 호출해 줘야지, 랜더링을 다시 한다.
          { contents: newContents }
        );

        console.log(_title, _desc);
      }.bind(this)}></CreateContent>;
    } else if (this.state.mode == "update") {
      var _content = this.getReadContent();
      _article = <UpdateContent
        data={_content}
        onSubmit={function (_id, _title, _desc) {
          var _contents = Array.from(this.state.contents);
          var i = 0;
          while (i < _contents.length) {
            if (_contents[i].id === _id) {
              _contents[i] = { id: _id, title: _title, desc: _desc };
              break;
            }
            i++;
          }
          this.setState(  // setState를 호출해 줘야지, 랜더링을 다시 한다.
            {
              contents: _contents,
              mode: 'read'
            }
          );

        }.bind(this)}></UpdateContent>;
    }

    return _article;
  }

  // state나 props값이 바뀌면, 해당 render()함수가 호출된다.
  render() {
    console.log('App render');

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
          if (_mode === 'delete') {
            if (window.confirm('reallY??')) {
              var _contents = Array.from(this.state.contents);
              var i = 0;
              while (i < this.state.contents.length) {
                if (_contents[i].id === this.state.selected_content_id) {
                  _contents.splice(i, 1);
                  break;
                }
                i++;
              }
            }
            this.setState({
              mode: 'welcome',
              contents: _contents
            })
          }
          else {
            this.setState({
              mode: _mode
            })
          }
        }.bind(this)}></Control>
        {this.getContent()}
      </div>
    );
  }
}

export default App;
