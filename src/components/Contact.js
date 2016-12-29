import React from "react";
import Contactinfo from "./Contactinfo";
import ContactDetails from "./ContactDetails";
import ContactCreate from "./ContactCreate";
import update from "react-addons-update";

export default class Contact extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            keyIndex: -1,
            keyword: '',
            contactData: [
                {
                    name: 'Abet',
                    phone: '010-0000-0001'
                }, {
                    name: 'Betty',
                    phone: '010-0000-0002'
                }, {
                    name: 'Charlie',
                    phone: '010-0000-0003'
                }, {
                    name: 'David',
                    phone: '010-0000-0004'
                }
            ]
        };
        console.log("constructor");

        // 바인딩 하는데 왜 바인딩 하는지  잘모르겠다. javascript의 바인딩에 대해서 찾아봐야겟다.

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleEdit = this.handleEdit.bind(this);

    }

    componentWillMount(){
        const contactData  = localStorage.contactData;

        if(contactData){
            this.setState({
                contactData : JSON.parse(contactData)
            });
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(JSON.stringify(prevState.contactData) != JSON.stringify(this.state.contactData)){
            localStorage.contactData = JSON.stringify(this.state.contactData);
        }
    }


    handleCreate(contact) {
        this.setState({
            contactData: update(this.state.contactData, {$push: [contact]})
        });
    }

    handleClick(key) {
        this.setState({keyIndex: key});

        console.log(key, 'is selected');
    }

    handleEdit(name, phone) {
        this.setState({
            contactData: update(this.state.contactData, {
                [this.state.keyIndex]: {
                    name: {
                        $set: name
                    },
                    phone: {
                        $set: phone
                    }
                }
            })
        });
    }
    handleRemove() {

        if (this.state.keyIndex < 0) {
            return;
        }

        this.setState({
            contactData: update(this.state.contactData, {
                $splice: [
                    [this.state.keyIndex, 1]
                ]
            }),
            keyIndex: -1
        });
    }

    handleChange(event) {
        this.setState({keyword: event.target.value});
    }

    render() {
        const mapToComponents = (data) => {

            data.sort();
            data = data.filter((contact) => {
                return contact.name.toLowerCase().indexOf(this.state.keyword) > -1;
            });

            return data.map((contact, i) => {
                return (< Contactinfo contact = {
                    contact
                }
                key = {
                    i
                }
                onClick = {
                    () => this.handleClick(i)
                } />);
            });
        };

        return (
            <div>
                <h1>
                    Contacts
                </h1>
                <input name="keyword" placeholder="Search" value={this.state.keyword} onChange={this.handleChange}/>
                <div >
                    {mapToComponents(this.state.contactData)
}
                </div>
                <ContactDetails isSelected= {this.state.keyIndex != -1} contact={this.state.contactData[this.state.keyIndex]} handleRemove={this.handleRemove} onEdit={this.handleEdit}/>
                <ContactCreate onCreate={this.handleCreate}/>
            </div >
        );
    }
}
