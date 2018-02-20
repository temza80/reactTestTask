import React, {
    Component
} from 'react';


let data = [{
        "favorite": true,
        "name": "atari98",
        "strength": 32,
        "security": ["psk"]
    },
    {
        "favorite": false,
        "name": "olson",
        "strength": 91,
        "security": ["psk"]
    },
    {
        "favorite": false,
        "name": "1990Wiley",
        "strength": 64,
        "security": ["psk", "wps"]
    },
    {
        "favorite": false,
        "name": "Guzman",
        "strength": 12,
        "security": ["wps"]
    },
    {
        "favorite": true,
        "name": "KPetersen86",
        "strength": 95,
        "security": ["wps"]
    },
    {
        "favorite": false,
        "name": "GillespIE",
        "strength": 84,
        "security": ["psk"]
    },
    {
        "favorite": false,
        "name": "patton",
        "strength": 40,
        "security": ["psk", "wps"]
    }
]


class Select extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            value: "Please select",
            selectClass: "select-closed",
            selectLabel: "select-label",
            selectPlaceholder: "select-placeholder"
        }

        this.refresh = this.refresh.bind(this);
        this.selectClass = this.selectClass.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
        this.refresh();
        fetch("/refresh_icon.svg")
            .then(response => response.text())
            .then(svg => this.svgDiv.insertAdjacentHTML("afterbegin", svg));
    }
    refresh() {
        function strength(a, b) {
            if (a.strength < b.strength)
                return 1;
            if (a.strength > b.strength)
                return -1;
            return 0;
        }

        function favorite(a, b) {
            if (a.favorite < b.favorite)
                return 1;
            if (a.favorite > b.favorite)
                return -1;
            return 0;
        }
        data.sort(strength);
        data.sort(favorite);
        let names = data.map(item => item.name);
        this.setState({
            list: names
        });


    }


    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    handleClickOutside(e) {

        if (this.ul && !this.ul.contains(e.target)) {
            this.setState({
                selectClass: "select-closed"
            })
        }
    }
    clickHandler(e) {
        this.setState({
            selectClass: "select-closed"
        })
        this.setState({
            selectPlaceholder: 'select-placeholder-selected'
        })
        this.props.sendSelected(e.target.innerText);

    }
    selectClass() {
        if (this.state.selectClass === "select-closed")
            this.setState({
                selectClass: "select-opened"
            })
        else this.setState({
            selectClass: "select-closed"
        })
    }
    render(){
		let options=this.state.list.map(option => <li key={option} onClick={this.clickHandler}>{option}</li>)
		
        return	<div className={(this.props.enabled === false)? 'disabled-div' : ''} ref={ul => this.ul=ul}>
         <div className="select">
          <div className="select-label" ref={text => this.props.setRef(text,this.props.name)}>
			<span className={this.props.required}>{this.props.label}</span>
				</div>
			<div className="select-control">
			<a onClick={this.selectClass} className={this.state.selectClass}>
			<span className={this.state.selectPlaceholder}>{this.props.value}</span>
			<div><b /></div>
			</a>
        <div>
        <ul className={this.state.selectClass}  >
          {options}
          </ul>
          </div>
          </div>
          <div className="refresh-icon" ref={div => this.svgDiv=div} onClick={this.refresh}></div>
			</div>
		</div>
}

}
export default Select;
