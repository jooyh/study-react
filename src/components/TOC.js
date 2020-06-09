import React, { Component } from "react"

export default class TOC extends Component {
  render() {
    var list = []
    var data = this.props.data
    for (var i in data) {
      list.push(
        <li key={data[i].id}>
          <a href={"/content/" + data[i].id}>{data[i].title}</a>
        </li>
      )
    }
    return (
      <nav>
        <ul>{list}</ul>
      </nav>
    )
  }
}
