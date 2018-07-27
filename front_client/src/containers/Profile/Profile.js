import React, { Component } from 'react';
import './Profile.css';
import Navbar from '../Navbar/Navbar';
import Aux from '../Auxilary/Auxilary';
import { Tab, Tabs } from 'react-bootstrap';
import GeneralInfo from './GeneralInfo/GeneralInfo';
import AcademicInfo from './Academic Info/AcademicInfo';
import ProfessionalInfo from './Professional Info/ProfessionalInfo';
import References from './References/References';



class Profile extends Component {

    constructor(props, context) {
        super(props, context);

        this.handleSelect = this.handleSelect.bind(this);

        this.state = {
            key: 1,
            location : this.props.location.state && this.props.location.state.userId,
            userId: "5b56ca115a43e31ba0be9cd1"
        };
    }

    componentDidMount(){
        console.log("This user_id is: ");
    }

    handleSelect(key) {
        console.log(key);
        this.setState({ key: key });
    }
    render() {
        return (
            <Aux>

                <Navbar title="Register yourself to become a part of Xavor Family" />
                <h4> Signup Form </h4>

                <Tabs className="generic-tab"
                    activeKey={this.state.key}
                    onSelect={this.handleSelect}
                    id="1">
                    <Tab eventKey={1} title="General Information" >
                        

                        <GeneralInfo recieve={(data) => {this.childInformation (data)}}
                                    click={() => this.handleSelect(2)} />
                    </Tab>

                    <Tab eventKey={2} title="Academic Information">
                        
                        <AcademicInfo click={() => this.handleSelect(3)}
                                      prev={() => this.handleSelect(1)} />
                    </Tab>
                    <Tab eventKey={3} title="Professional Information" >
                        
                        <ProfessionalInfo click={() => this.handleSelect(4)}
                        prev={() => this.handleSelect(2)} />
                    </Tab>
                    <Tab eventKey={4} title="References" >

                        <References click={() => this.handleSelect(5)}
                        prev={() => this.handleSelect(3)} />
                    </Tab>
                </Tabs>;
             </Aux>
        );
    }
};


export default Profile;
