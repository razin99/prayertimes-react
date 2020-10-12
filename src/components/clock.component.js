import React, { Component } from "react";
import { Badge } from "react-bootstrap";

export default class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({ date: new Date() });
  }

  render() {
    return(
      <div>
        <h1>{this.state.date.toLocaleTimeString()}</h1>
        <Badge pill variant="light">{this.state.date.toLocaleDateString().split('/').join(' - ')}</Badge>
      </div>
    )
  }
}
