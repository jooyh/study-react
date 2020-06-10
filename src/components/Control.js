import React, { Component } from "react"

export default class Control extends Component {
  render() {
    return (
      <ul>
        <li>
          <a
            href="/create"
            onClick={function (e) {
              this.props.onChangeMode("create")
              e.preventDefault()
            }.bind(this)}
          >
            CREATE
          </a>
        </li>
        <li>
          <a
            href="/update"
            onClick={function (e) {
              this.props.onChangeMode("update")
              e.preventDefault()
            }.bind(this)}
          >
            UPDATE
          </a>
        </li>
        <li>
          <input
            type="button"
            value="DELETE"
            onClick={function (e) {
              this.props.onChangeMode("delete")
              e.preventDefault()
            }.bind(this)}
          ></input>
        </li>
      </ul>
    )
  }
}
