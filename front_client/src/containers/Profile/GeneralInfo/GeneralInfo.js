import React, { Component } from "react";
import {
  Form,
  FormControl,
  FormGroup,
  ControlLabel,
  Radio,
  Button
} from "react-bootstrap";
import "./GeneralInfo.css";
import Aux from "../../Auxilary/Auxilary";

class GeneralInfo extends Component {
  state = {
    userGeneralInfo: {
      name: '',
      fathername: '',
      cnic: '',
      dob:'',
      gender:'',
      marital:'',
      mobile:'',
      homephone:'',
      current_address:'',
      permanent_address:'',
      position_applied:''
    }
    
    
    
  };

  fillValues = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    let userGeneralInfo = {...this.state.userGeneralInfo};
    switch(name){
      case "name":
        userGeneralInfo.name = value;
        this.setState({userGeneralInfo});
        break;
      
      case "father-name":
      userGeneralInfo.fathername = value;
      this.setState({userGeneralInfo});
      break;
      
      case "cnic-no":
      userGeneralInfo.cnic = value;
      this.setState({userGeneralInfo});
      break;

      case "dob":
      userGeneralInfo.dob = value;
      this.setState({userGeneralInfo});
      break;

      case "gender":
      userGeneralInfo.gender = value;
      this.setState({userGeneralInfo});
        break;
      case "Marital Status":
      userGeneralInfo.marital = value;
      this.setState({userGeneralInfo});
        break;
      
      case "mobile-no":
      userGeneralInfo.mobile = value;
      this.setState({userGeneralInfo});
        break;
      case "home-phone":
      userGeneralInfo.homephone = value;
      this.setState({userGeneralInfo});
        break;
      case "curr-address":
        userGeneralInfo.current_address = value;
      this.setState({userGeneralInfo});
        break;
      case "permanent-address":
        userGeneralInfo.permanent_address = value;
      this.setState({userGeneralInfo});
        break;
      
      case "joining":
        userGeneralInfo.expected_joining = value;
      this.setState({userGeneralInfo});
        break;
      case "position":
        userGeneralInfo.position_applied = value;
      this.setState({userGeneralInfo});
        break;
     
        
      default:
        console.log("User Id is: " + this.state.id);
    }
  }
  submitValues = () => {
    
    
    

  }
  render() {
    return (
      <Aux>
      <div className="tab-heading">
        <h4>Tell us a bit about yourself</h4>
      </div>
      
      <Form className="general-info">
        <FormGroup
          id="nameform"
          controlId="formInlineName"
          className="form-group"
        >
          {/*Name, Fathers Name and CNIC**************************************************************************/}
          <div className="container-fluid general-info-container">
          <div className="row">
            <div className="col-md-4">
              <div>
                <ControlLabel>* Name (as per NIC)</ControlLabel>
              </div>
              <FormControl
                name="name"
                type="text"
                placeholder="Jane Doe"
                onChange = {this.fillValues}
              />
            </div>

            <div className="col-md-4">
              <div>
                <ControlLabel>* Father/Husband's Name</ControlLabel>
                {"     "}
              </div>
              <FormControl
                name="father-name"
                type="text"
                placeholder="Syed Waseem Akhtar"
                onChange = {this.fillValues}
              />
            </div>

            <div className="col-md-4">
              <div>
                <ControlLabel>* CNIC No.</ControlLabel>
                {"     "}
              </div>
              <FormControl
                name="cnic-no"
                type="text"
                placeholder="xxxxx-xxxxxxx-x"
                className="cnic"
                onChange={this.fillValues}
              />
            </div>
          </div>
          {/*Date of Birth, Gender and Marital Status**************************************************************************/}
          <div className="row">
            <div className="col-md-4">
              <div>
                <ControlLabel>Date of birth</ControlLabel>
              </div>
              <FormControl
                name="dob"
                type="Date"
                placeholder="01-22-1994"
                onChange={this.fillValues}
              />
            </div>

            <div className="col-md-4">
              <div>
                <ControlLabel>Gender</ControlLabel>
                {""}
              </div>
              <div>
                <Radio inline name="gender"
                       value="Male"
                       onClick={this.fillValues}>
                  Male
                </Radio>{" "}
                <Radio inline name="gender"
                       value="Female"
                       onClick={this.fillValues}
                >
                  Female
                </Radio>{" "}
              </div>
            </div>

            <div className="col-md-4">
              <div>
                <ControlLabel>Marital Status</ControlLabel>
                {""}
              </div>
              <div>
                <Radio inline name="Marital Status"
                       value="Single" onClick={this.fillValues}>
                  Single
                </Radio>{" "}
                <Radio inline name="Marital Status"
                       value="Married" onClick={this.fillValues}>
                  Married
                </Radio>{" "}
              </div>
            </div>
          </div>
          {/*Email, Mobile and Home Phone**************************************************************************/}
          <div className="row">
          
            <div className="col-md-4">
              <div>
                <ControlLabel>* Mobile Phone</ControlLabel>
                {"     "}
              </div>
              <FormControl
                name="mobile-no"
                onChange={this.fillValues}
                type="text"
                placeholder=""
                style={{ width: "100%" }}
              />
            </div>

            <div className="col-md-4">
              <div>
                <ControlLabel>Home Phone</ControlLabel>

              </div>
              <FormControl
                name="home-phone"
                onChange={this.fillValues}
                type="text"
                placeholder="xxxxx-xxxxxxx-x"
              />
            </div>

            <div className="col-md-4">
            <div>
              <ControlLabel>Position applying for</ControlLabel>
            </div>
            <FormControl
              name="position"
              componentClass="select"
              placeholder="Select"
              onChange={this.fillValues}
            >
              <option value="Not Selected">Please Select</option>
              <option value="Software Engineer">Software Engineer</option>
              <option value="Quality Assurance Engineer">
                Quality Assurance Engineer
              </option>
            </FormControl>
          </div>
          </div>
          {/*Current Address and Permanent Address**************************************************************************/}
          <div className="row">
            <div className="col-md-8">
              <div>
                <ControlLabel>* Current Address</ControlLabel>
              </div>
              <FormControl
                name="curr-address"
                onChange={this.fillValues}
                type="text"
                placeholder="22. Baker St"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-8">
              <div>
                <ControlLabel>* Permanent Address</ControlLabel>
              </div>
              <FormControl
                name="permanent-address"
                onChange={this.fillValues}
                type="text"
                placeholder="Maryland, CH"
              />
            </div>
          </div>

          {/*All fields are mandatory**************************************************************************/}
          <div className="row general-info-footer">
          <div className="col-md-6 ">
            <section className="mandatory-note">
            <b>Note: All fields marked with * mandatory</b>
            </section>
            </div>
            <div className="col-md-6">
          <Button className="to-academic-button" bsClass="xavor-style" onClick={() => { this.props.recieve(this.state.userGeneralInfo) }}>Next</Button>
          </div>
          </div>
          </div>
        </FormGroup>
      </Form>
      </Aux>
    );
  }
}

export default GeneralInfo;
