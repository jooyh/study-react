import React, { Component } from "react"
import TOC from "./components/TOC"
import Content from "./components/Content"
import Subject from "./components/Subject"
import "./App.css"

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mode: "welcome",
      selected_content_id: 0,
      welcome: { title: "Welcome", desc: "Hello, React!!" },
      subject: { title: "WEB", sub: "world wide web!" },
      contents: [
        { id: 1, title: "HTML", desc: "HTML is for information" },
        { id: 2, title: "CSS", desc: "CSS is for Design" },
        { id: 3, title: "JavaScript", desc: "JavaScript is for information" },
      ],
    }
  }

  render() {
    var _title,
      _desc = null
    if (this.state.mode === "welcome") {
      _title = this.state.welcome.title
      _desc = this.state.welcome.desc
    } else if (this.state.mode === "read") {
      for (var i in this.state.contents) {
        if (this.state.contents[i].id === this.state.selected_content_id) {
          _title = this.state.contents[i].title
          _desc = this.state.contents[i].desc
          break
        }
      }
    }
    return (
      <div className="App">
        {/* <header>
          <h1>
            <a
              href="/"
              onClick={function (e) {
                console.log("TEST", e)
                this.setState({ mode: "welcome" })
                e.preventDefault()
              }.bind(this)}
            >
              {this.state.subject.title}
            </a>
          </h1>
          {this.state.subject.sub}
        </header> */}
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
        <Content title={_title} desc={_desc}></Content>
      </div>
    )
  }
}
