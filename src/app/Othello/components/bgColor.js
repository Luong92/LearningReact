import React, { Component } from 'react';

export class SelectColor extends Component{
  handleChange(e){
    e.preventDefault();
    const color = e.target.value
    if (this.props.onColorChange){
      this.props.onColorChange(color)
    }
  }
  render(){
    return(
        <select value={this.props.value} onChange={this.handleChange.bind(this)}>
          <option value="orangered">orangered</option>
          <option value="teal">teal</option>
          <option value="orange">orange</option>
          <option value="indigo">indigo</option>
          <option value="red">red</option>
        </select>
    )
  }
}

SelectColor.propTypes={
  value: React.PropTypes.string.isRequired,
  onColorChange: React.PropTypes.func
};
