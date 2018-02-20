import React, {
    Component
} from 'react';
import  './styles.css';
import Input from "./input";
import Radio from "./radiobutton";
import Check from "./checkbox";
import Select from "./select";
class Form extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ipAddressOption: false,
            dnsOption: false,
            w_ipAddressOption: false,
            w_dnsOption: false,
            wirelessOption: false,
            w_securityOption: false,
            ipAddress: "",
            subnetMask: "",
            defaultGateWay: "",
            preferredDnsServer: "",
            alternativeDnsServer: "",
            wirelessNetworkName: "Please select",
            securityKey: "",
            w_ipAddress: "",
            w_subnetMask: "",
            w_defaultGateWay: "",
            w_preferredDnsServer: "",
            w_alternativeDnsServer: "",
        }
        this.labels = {};
        this.ipAddressReg = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
        this.subnetMaskReg = /^(((255\.){3}(255|254|252|248|240|224|192|128|0+))|((255\.){2}(255|254|252|248|240|224|192|128|0+)\.0)|((255\.)(255|254|252|248|240|224|192|128|0+)(\.0+){2})|((255|254|252|248|240|224|192|128|0+)(\.0+){3}))$/

        this.validations = {
            ipAddress: {
                check: false,
                methods: [this.required.bind(this), (name) => this.format(name, this.ipAddressReg)]
            },
            subnetMask: {
                check: false,
                methods: [this.required.bind(this), (name) => this.format(name, this.subnetMaskReg)]
            },
            defaultGateWay: {
                check: false,
                methods: [(name) => this.format(name, this.ipAddressReg)]
            },
            preferredDnsServer: {
                check: false,
                methods: [this.required.bind(this), (name) => this.format(name, this.ipAddressReg)]
            },
            alternativeDnsServer: {
                check: false,
                methods: [(name) => this.format(name, this.ipAddressReg)]
            },
            wirelessNetworkName: {
                check: false,
                methods: [this.required.bind(this)]
            },
            securityKey: {
                check: false,
                methods: [this.required.bind(this)]
            },
            w_ipAddress: {
                check: false,
                methods: [this.required.bind(this), (name) => this.format(name, this.ipAddressReg)]
            },
            w_subnetMask: {
                check: false,
                methods: [this.required.bind(this), (name) => this.format(name, this.subnetMaskReg)]
            },
            w_defaultGateWay: {
                check: false,
                methods: [(name) => this.format(name, this.ipAddressReg)]
            },
            w_preferredDnsServer: {
                check: false,
                methods: [this.required.bind(this), (name) => this.format(name, this.ipAddressReg)]
            },
            w_alternativeDnsServer: {
                check: false,
                methods: [(name) => this.format(name, this.ipAddressReg)]
            },

        };
        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.sendSelected = this.sendSelected.bind(this);
        this.handleInputValue = this.handleInputValue.bind(this);
        this.sendClick = this.sendClick.bind(this);
        this.required = this.required.bind(this);
        this.validate = this.validate.bind(this);
        this.setValidations = this.setValidations.bind(this);
        this.setRef = this.setRef.bind(this);
        this.save = this.save.bind(this);
        this.getAll = this.getAll.bind(this);
        this.cancel = this.cancel.bind(this);
        this.format = this.format.bind(this);

    }
    format(name, reg) {
        if (this.state[name].length === 0) return "ok";
        let result = this.state[name].match(reg);
        
        if (result) return "ok"
        else return "wrong format"

    }
    required(name) {
        if (!(this.state[name].length === 0 || this.state[name] === 'Select your option')) return "ok";
        else return "required"
    }

    setRef(input, name) {
        this.labels[name] = input;
    }

    validate() {
        console.log(this.validations);
        let allOk = 1;
        let errMsg = 'Errors in the next fields:\n';
        for (let key in this.validations)
            if (this.validations[key]['check'])
                this.validations[key]['methods'].forEach(method => {
                    let result = method(key);

                    if (result !== 'ok') {
                        allOk = -1;
                        errMsg += this.labels[key].innerText + '-' + result + '\n';
                    }

                })
        if (allOk === -1) {
            alert(errMsg);
            return "err";
        } else return "ok";


    }


    save() {


        fetch('/api/save', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    state: this.state
                })
            })
            .then(res => res.json())
            .then(resp => {
                if (resp.answer === "ok") alert('saved')
            }).catch(err => console.log(err))




    }
    cancel(e) {
        e.preventDefault();
        this.getAll();
    }
    getAll() {

        fetch('/api/getall').
        then(res => res.json()).
        then(Data => {
            let data = JSON.parse(Data);
            for (let key in data) {
                this.setState({
                    [key]: data[key]
                })
                if (key.indexOf("Option") !== -1) this.setValidations(key, this.state[key]);
            }
        }).catch(err => console.log(err))
    }


    componentDidMount() {
        this.getAll();


    }
    sendClick(e) {
        e.preventDefault();
        if (this.validate() === 'ok') this.save();
    }
    setValidations(name, bValue) {
        switch (name) {

            case 'ipAddressOption':
                this.validations.ipAddress.check = bValue;
                this.validations.subnetMask.check = bValue;
                this.validations.defaultGateWay.check = bValue;
                break;
            case 'dnsOption':
                this.validations.preferredDnsServer.check = bValue;
                this.validations.alternativeDnsServer.check = bValue;
                break;
            case 'w_ipAddressOption':
                this.validations.w_ipAddress.check = bValue;
                this.validations.w_subnetMask.check = bValue;
                this.validations.w_defaultGateWay.check = bValue;

                break;
            case 'w_dnsOption':
                this.validations.w_preferredDnsServer.check = bValue;
                this.validations.w_alternativeDnsServer.check = bValue;
                break;
            case 'wirelessOption':
                this.validations.wirelessNetworkName.check = bValue; 
                break;
            case 'w_securityOption':
                this.validations.securityKey.check = bValue;
                break;

        }
        if(name==="wirelessOption" && bValue===false)
        {
			this.setState({w_securityOption:false});
			this.setState({w_dnsOption:false});
			this.setState({w_ipAddressOption:false});
			this.validations.w_preferredDnsServer.check = bValue;
            this.validations.w_alternativeDnsServer.check = bValue;
            this.validations.w_ipAddress.check = bValue;
            this.validations.w_subnetMask.check = bValue;
            this.validations.w_defaultGateWay.check = bValue;
		}
    }

    handleRadioChange(name, value) {



        let bValue;
        if (value === "closed" || value === "opened") bValue = (value === "closed") ? false : true;
        else bValue = value;

        this.setState({
            [name]: bValue
        });
        this.setValidations(name, bValue);


    }
    sendSelected(value) {

        this.setState({
            wirelessNetworkName: value
        });
    }

    handleInputValue(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    render(){
		
        return 	<form>
        <div className="main">
        <div className="upper">
        <div className="settings">
        <Radio
         name="ipAddressOption"
         value={this.state.ipAddressOption}
         enabled={true}
         label1="Obtain IP address automatically(DHCP/BootP)"
         label2="Use the following IP address"
         handler={this.handleRadioChange}
         />
          
       <Input name="ipAddress"
       setRef={this.setRef}
       label="IP address" 
       value={this.state.ipAddress}
        enabled={this.state.ipAddressOption}
         required="required"
         handler={this.handleInputValue} />
			<Input name="subnetMask"
			setRef={this.setRef}
			label="Subnet Mask" 
			value={this.state.subnetMask}
			enabled={this.state.ipAddressOption}
			required="required"
			handler={this.handleInputValue} />
				<Input name="defaultGateWay"
				setRef={this.setRef}
				label="Default Gate Way" 
				value={this.state.defaultGateWclassNameay}
				enabled={this.state.ipAddressOption}
				required=""
				handler={this.handleInputValue} />
			
         <Radio
         name="dnsOption"
         value={this.state.dnsOption}
         enabled={true}
         label1="Obtain DNS server address automatically"
         label2="Use the following DS server address"
         handler={this.handleRadioChange}
         />
          
       <Input name="preferredDnsServer"
       setRef={this.setRef}
       label="Preferred Dns Server" 
       value={this.state.preferredDnsServer}
        enabled={this.state.dnsOption}
         required="required"
         handler={this.handleInputValue} />
			<Input name="alternativeDnsServer"
			setRef={this.setRef}
			label="Alternative Dns Server" 
			value={this.state.alternativeDnsServer}
			enabled={this.state.dnsOption}
			required=""
			handler={this.handleInputValue} />
				
			</div>
         <div className="settings">
         <Check
         name="wirelessOption"
         checked={this.state.wirelessOption}
         enabled={true}
         label="Enable wifi"
         handleRadioChange={this.handleRadioChange}
          />
       
       <Select
       label="Wireless Network Name" 
       name="wirelessNetworkName"
       value={this.state.wirelessNetworkName}
       setRef={this.setRef}
        enabled={this.state.wirelessOption}
         required="required"
         sendSelected={this.sendSelected} />
           <Check
         name="w_securityOption"  
         checked={this.state.w_securityOption} 
         enabled={this.state.wirelessOption}
         label="Enable wireless security"
         handleRadioChange={this.handleRadioChange}
          />
          <Input name="securityKey"
          setRef={this.setRef}
       label="Security Key" 
       value={this.state.securityKey}
        enabled={this.state.wirelessOption && this.state.w_securityOption}
         required="required"
         handler={this.handleInputValue} />
          <Radio
         name="w_ipAddressOption"
         value={this.state.w_ipAddressOption}
         enabled={this.state.wirelessOption}
         label1="Obtain IP address automatically(DHCP/BootP)"
         label2="Use the following IP address"
         handler={this.handleRadioChange}
         />
          
       <Input name="w_ipAddress"
       setRef={this.setRef}
       label="IP address" 
       value={this.state.w_ipAddress}
        enabled={this.state.wirelessOption && this.state.w_ipAddressOption}
         required="required"
         handler={this.handleInputValue} />
			<Input name="w_subnetMask"
			setRef={this.setRef}
			label="Subnet Mask" 
			value={this.state.w_subnetMask}
			enabled={this.state.wirelessOption && this.state.w_ipAddressOption}
			required="required"
			handler={this.handleInputValue} />
				<Input name="w_defaultGateWay"
				setRef={this.setRef}
				label="Default Gate Way" 
				value={this.state.w_defaultGateWay}
				enabled={this.state.wirelessOption && this.state.w_ipAddressOption}
				required=""
				handler={this.handleInputValue} />
			
         <Radio
         name="w_dnsOption"
         value={this.state.w_dnsOption}
         enabled={this.state.wirelessOption}
         label1="Obtain DNS server address automatically"
         label2="Use the following DS server address"
         handler={this.handleRadioChange}
         />
          
       <Input name="w_preferredDnsServer"
       setRef={this.setRef}
       label="Preferred Dns Server" 
       value={this.state.w_preferredDnsServer}
        enabled={this.state.wirelessOption && this.state.w_dnsOption}
         required="required"
         handler={this.handleInputValue} />
			<Input name="w_alternativeDnsServer"
			setRef={this.setRef}
			label="Alternative Dns Server" 
			value={this.state.w_alternativeDnsServer}
			enabled={this.state.wirelessOption && this.state.w_dnsOption}
			required=""
			handler={this.handleInputValue} />
			</div>
			
			</div>
			<div  className="buttons">
			<button  class="knopka01" onClick={this.sendClick}>Save</button>
			<button  class="knopka01" onClick={this.cancel}>Cancel</button>
			</div>
			</div>
         </form>
         
}

}
export default Form;
