import axios from "axios";
import React, { Component } from "react";
import { Badge } from "react-bootstrap";

// gist.github.com/varmais/74586ec1854fe288d393
var getPosition = function (options) {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};

export default class Timings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fajr: "",
      dhuhr: "",
      asr: "",
      maghrib: "",
      isha: "",
    };
  }

  componentDidMount() {
    getPosition()
      .then((pos) => {
        console.log(pos.coords.latitude);
        console.log(pos.coords.longitude);
        this.setState({
          longitude: pos.coords.latitude,
          latitude: pos.coords.longitude,
        });
        return pos;
      })
      .then((pos) => {
        axios
          .get("http://api.aladhan.com/v1/timings", {
            params: {
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
            },
          })
          .then((response) => {
            let body = response.data.data;
            this.setState({
              fajr: body.timings.Fajr,
              dhuhr: body.timings.Dhuhr,
              asr: body.timings.Asr,
              maghrib: body.timings.Maghrib,
              isha: body.timings.Isha,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        {["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"].map((timing) => (
          <>
            <h1>
              <Badge variant="dark">{timing}</Badge>{" "}
              <Badge variant="primary">
                {this.state[timing.toLocaleLowerCase()]}
              </Badge>
            </h1>
          </>
        ))}
        <div className="fixed-bottom mb-4" >
          <h3><Badge variant="secondary">{this.state.latitude}</Badge>{" "}<Badge variant="secondary">{this.state.longitude}</Badge></h3>
        </div>
      </div>
    );
  }
}
