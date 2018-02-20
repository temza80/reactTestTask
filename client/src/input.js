import React, { Component } from 'react';


class	Input extends	Component{
    
	render()
	{
		
		 return <div className={(this.props.enabled === false)? 'disabled-div' : ''}><div className="input" >
        <div className="ip-address">
        <span className={this.props.required} ref={text => this.props.setRef(text,this.props.name)}>{this.props.label}</span>
        </div>
        <div className="input-control">
        <input type="text"
        name={this.props.name}
         value={this.props.value}
          disabled={(this.props.enabled === false)? 'disabled' : ''}
          onChange={this.props.handler}
          />
          </div>
        </div>
        </div>
	}
}
export default Input;
