import React, { Component } from "react"
import TOC from "./components/TOC"
import ReadContent from "./components/ReadContent"
import Subject from "./components/Subject"
import Control from "./components/Control"
import CreateContent from "./components/CreateContent"
import UpdateContent from "./components/UpdateContent"
import "./App.css"

export default class App extends Component {
  constructor(props) {
    super(props)
    this.max_content_id = 3
    this.state = {
      mode: "welcome",
      selected_content_id: 0,
      welcome: { title: "Welcome", desc: "Hello, React!!" },
      subject: { title: "WEB", sub: "world wide web!" },
      contents: [
        { id: 1, title: "HTML", desc: "HTML is for information" },
        { id: 2, title: "CSS", desc: "CSS is for Design" },
        { id: 3, title: "JavaScript", desc: "JavaScript is for Interactive" },
      ],
    }
  }

  getReadContent = () => {
    for (var i in this.state.contents) {
      if (this.state.contents[i].id === this.state.selected_content_id) {
        return this.state.contents[i]
      }
    }
  }
  getContent = () => {
    var _content,
      _article,
      _title,
      _desc = null
    if (this.state.mode === "welcome") {
      _title = this.state.welcome.title
      _desc = this.state.welcome.desc
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if (this.state.mode === "read") {
      _content = this.getReadContent()
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
    } else if (this.state.mode === "create") {
      _article = (
        <CreateContent
          onSubmit={function (_title, _desc) {
            //Array 의 복제 객체 생성 내장함수 (깊은복사)
            var _contents = Array.from(this.state.contents)
            this.max_content_id++
            _contents.push({
              id: this.max_content_id,
              title: _title,
              desc: _desc,
            })
            this.setState({
              contents: _contents,
              mode: "read",
              selected_content_id: this.max_content_id,
            })
          }.bind(this)}
        ></CreateContent>
      )
    } else if (this.state.mode === "update") {
      console.log("TEST")
      _content = this.getReadContent()
      _article = (
        <UpdateContent
          data={_content}
          onSubmit={function (_id, _title, _desc) {
            var _contents = Array.from(this.state.contents)
            for (var i in _contents) {
              console.log(1, _contents[i].id)
              console.log(2, _id)
              if (_contents[i].id === _id) {
                _contents[i] = { id: _id, title: _title, desc: _desc }
              }
            }
            this.setState({ contents: _contents, mode: "read" })
          }.bind(this)}
        ></UpdateContent>
      )
    }
    return _article
  }

  render() {
    console.log("App render...")

    return (
      <div className="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={function (e) {
            this.setState({ mode: "welcome" })
          }.bind(this)}
        ></Subject>
        <TOC
          onChangePage={function (id) {
            this.setState({ mode: "read", selected_content_id: Number(id) })
          }.bind(this)}
          data={this.state.contents}
        ></TOC>
        <Control
          onChangeMode={function (_mode) {
            if (_mode === "delete") {
              if (window.confirm("삭제하시겠습니까?")) {
                var _contents = Array.from(this.state.contents)
                for (var i in _contents) {
                  if (_contents[i].id === this.state.selected_content_id) {
                    _contents.splice(i, 1)
                    break
                  }
                }
                this.setState({ mode: "welcome", contents: _contents })
                alert("정상적으로 삭제 되었습니다.")
              }
            } else {
              this.setState({ mode: _mode })
            }
          }.bind(this)}
        ></Control>
        {this.getContent()}
      </div>
    )
  }
}
