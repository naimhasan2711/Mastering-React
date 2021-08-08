import React, { Component } from "react";

class Counter extends Component {
  

  styles = {
    fontSize: 13,
    fontWeight: "bold",
  };

 

  render() {
    
    return (
      <div className="row">
      <div className="col-1">
      <span style={this.styles} className={this.getBadgeClasses()}>
          {this.formatCount()}
        </span>
        </div>
      <div className="col">
      <button
          onClick={() => this.props.onIncrement(this.props.counter)}
          className="btn btn-secondary btn-sm"
        >
          +
        </button>

        <button
         onClick={()=>this.props.onDecrement(this.props.counter)}
         className="btn btn-secondary btn-sm m-2"
         disabled={this.props.counter.value===0?'disabled':''}>
         -
         </button>
         
        <button
          onClick={() => this.props.onDelete(this.props.counter.id)}
          className="btn btn-danger btn-sm"
        >
          X
        </button>
      </div>
        
        
      </div>
    );
  }


  formatCount() {
    const { value } = this.props.counter;
    return value === 0 ? "Zero" : value;
  }

  getBadgeClasses() {
    let classes = "m-2 p-2 badge badge-";
    classes += this.props.counter.value === 0 ? "warning" : "primary";
    return classes;
  }
}

export default Counter;
