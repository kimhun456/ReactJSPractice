import React from "react";

export default class ContactCreate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }



    handleChange(event){

        let nextState ={};
        nextState[event.target.name] = event.target.value;
        this.setState(nextState);
    }

    handleClick(){
        console.log("handleClick function");

        const contact = {
            name : this.state.name,
            phone : this.state.phone
        };

        this.props.onCreate(contact);
        this.setState(
            {
                name : "",
                phone : ''
            }
        );

        this.nameInput.focus();

    }

    handleKeyPress(e){
        if(e.charCode===13){
            this.handleClick();
        }
    }

    render() {
        return (
            <div>
                <h2>Create Contact</h2>
                <p>
                    <input
                        type="text"
                        name="name"
                        placeholder="name"
                        onChange = {this.handleChange}
                        ref = {(ref) => {this.nameInput = ref;}}
                        value = {this.state.name}/>
                    <input
                        type="text"
                        name="phone"
                        onChange = {this.handleChange}
                        placeholder="phone"
                        value = {this.state.phone}
                        onKeyPress = {this.handleKeyPress}/>
                </p>
                <button onClick = {this.handleClick}>create</button>

            </div>
        );

    }
}

ContactCreate.propTypes ={
    onCreate : React.PropTypes.func
};

ContactCreate.defaultProps ={
    onCreate : ()=> console.log("handleCreate not passed")
};
