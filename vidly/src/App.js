import "./App.css";
import React, { Component } from "react";
import Movies from "./components/movies"; //import Movies component

class App extends Component {
  state = {};
  render() {
    return (
      <main className="container">
        <Movies />
      </main>
    );
  }
}

export default App;
