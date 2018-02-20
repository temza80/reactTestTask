import React, { Component } from 'react';


class	Radio extends	Component{
    
	render()
	{
		return <div className={(this.props.enabled === false)? 'disabled-div' : ''}>
		 <div className="radio">
          <label>
            <input type="radio"  value="closed" checked={this.props.value === false} 
            disabled={!this.props.enabled}
             onChange={() => this.props.handler(this.props.name,"closed")}/>
            <span>{this.props.label1}</span>
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" value="opened" checked={this.props.value === true} 
            disabled={!this.props.enabled}
             onChange={() => this.props.handler(this.props.name,"opened")}/>
            <span>{this.props.label2}</span>
          </label>
        </div>
        </div>
	}
}
export default Radio;

