import React, {
    Component
} from 'react';


class Check extends Component {
    constructor(props) {
        super(props);

        this.toggleCheckboxChange = this.toggleCheckboxChange.bind(this);
    }

    toggleCheckboxChange = () => {
        const {
            handleRadioChange,
            name
        } = this.props;
        handleRadioChange(name, !this.props.checked);
    }
    render(){
        return	<div className={(this.props.enabled === false)? 'disabled-div' : ''}>
        <div className="checkbox">
        <label className="container">{this.props.label}
          <input
          type="checkbox"
          checked={this.props.checked}
          disabled={(this.props.enabled === false)? 'disabled' : ''}
          onChange={this.toggleCheckboxChange}
           />
          <span className="checkmark"></span>
        </label>
      </div>
      </div>
}

}
export default Check;
