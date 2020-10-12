import React from "react";
import "./App.css";
import Clock from "./components/clock.component";
import Timings from "./components/timings.component";

function App() {
  return (
    <div className="App" >
      <div className="jumbotron bg-dark" style={{color:"white"}}>
        <Clock />
      </div>
      <h1>Prayer times</h1>
      <Timings />
    </div>
  );
}

export default App;
