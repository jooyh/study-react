import React, { Component } from "react"
import TOC from "./components/TOC"
import ReadContent from "./components/ReadContent"
import Subject from "./components/Subject"
import Control from "./components/Control"
import CreateContent from "./components/CreateContent"
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

  render() {
    console.log("App render...")
    var _article,
      _title,
      _desc = null
    if (this.state.mode === "welcome") {
      _title = this.state.welcome.title
      _desc = this.state.welcome.desc
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if (this.state.mode === "read") {
      for (var i in this.state.contents) {
        if (this.state.contents[i].id === this.state.selected_content_id) {
          _title = this.state.contents[i].title
          _desc = this.state.contents[i].desc
          break
        }
      }
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if (this.state.mode === "create") {
      _article = (
        <CreateContent
          onSubmit={function (_title, _desc) {
            //Array 의 복제 객체 생성 내장함수 (깊은복사)
            var _contents = Array.from(this.state.contents)
            console.log("TEST", _contents === this.state.contents)
            _contents.push({
              id: this.max_content_id + 1,
              title: _title,
              desc: _desc,
            })
            this.setState({ contents: _contents })
          }.bind(this)}
        ></CreateContent>
      )
    }
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
            this.setState({ mode: _mode })
          }.bind(this)}
        ></Control>
        {_article}
      </div>
    )
  }
}
