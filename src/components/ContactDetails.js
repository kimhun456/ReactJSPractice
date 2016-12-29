import React from "react";

export default class ContactDetails extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            idEdit : false,
            name :'',
            phone : ''
        };
        this.handleToggle = this.handleToggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleToggle(){

        if(!this.state.isEdit){
            this.setState({
                name : this.props.contact.name,
                phone : this.props.contact.phone
            });
        }
        else{
            this.props.onEdit(this.state.name, this.state.phone);
        }

        this.setState({
            isEdit : !this.state.isEdit
        });

    }

    handleChange(event){
        let nextState ={};
        nextState[event.target.name] = event.target.value;
        this.setState(nextState);
    }

    render() {


        const editDetails =(
            <div>
                <p>
                    <input
                        type= "text"
                        placeholder = "name"
                        name = "name"
                        onChange = {this.handleChange}
                        value = {this.state.name}/>
                </p>
                <p>
                    <input
                        type= "text"
                        placeholder = "phone"
                        name = "phone"
                        onChange = {this.handleChange}
                        value = {this.state.phone}/>
                </p>
            </div>
        );

        const details = (
            <div>
                <p>
                    {this.props.contact.name}
                </p>
                <p>
                    {this.props.contact.phone}
                </p>
            </div>
        );

        const toggle = this.state.isEdit ? editDetails : details;

        const blank = (
            <div>Not Selected</div>
        );

        return (
            <div>
                <h2>Details</h2>
                {this.props.isSelected ? toggle : blank}
                <button onClick={this.handleToggle}>{this.state.isEdit ? "OK" : "Edit"}</button>
                <button onClick={this.props.handleRemove}>Remove</button>
            </div>
        );
    }
}

ContactDetails.defaultProps = {
    contact: {
        name: "",
        phone: ""
    },
    handleRemove: () => {
        console.log("handleRemove not defined");
    },
    onEdit : () => {
        console.log("onEdit not defined");
    },
};
