import React, { Component } from "react";

class Counter extends Component {
  // constructor() {
  //   super();
  //   this.handleIncrement = this.handleIncrement.bind(this);
  // }
  state = {
    value: this.props.value,
  };

  styles = {
    fontSize: 13,
    fontWeight: "bold",
  };

  handleIncrement = (product) => {
    console.log(product);
    this.setState({ count: this.state.value + 1 });
  };

  // doHandleIncrement = () => {
  //   this.handleIncrement({ id: 1 });
  // };

  render() {
    //console.log("->", this.props);
    return (
      <div>
        <span style={this.styles} className={this.getBadgeClasses()}>
          {this.formatCount()}
        </span>
        <button
          onClick={() => this.handleIncrement({ id: 1 })}
          style={{ fontWeight: "bold" }}
          className="btn btn-secondary btn-sm"
        >
          Increment
        </button>
      </div>
    );
  }

  /*
  
  */

  formatCount() {
    const { value } = this.state;
    return value === 0 ? "Zero" : value;
  }

  getBadgeClasses() {
    let classes = "m-2 p-2 badge badge-";
    classes += this.state.value === 0 ? "warning" : "primary";
    return classes;
  }
}

export default Counter;
