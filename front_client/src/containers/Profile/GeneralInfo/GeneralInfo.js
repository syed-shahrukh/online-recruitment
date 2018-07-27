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
import axios from 'axios';
import Aux from "../../Auxilary/Auxilary";

class GeneralInfo extends Component {
  state = {
    userGeneralInfo: {
      userId: this.props.id,
      fullName: '',
      fatherHusbandName: '',
      cnic: '',
      dob:'',
      gender:'',
      maritalStatus:'',
      mobilePhone:'',
      homePhone:'',
      currentAddress:'',
      permanentAddress:'',
      positionApplied:''
    }
    
    
    
  };


  submitProfileInformation = () => {
    const user = this.state.userGeneralInfo;
    axios.post('api/candidates/', user)
    .then(response => {
      console.log(response.data);
      this.props.click();
      
    })
    .catch((error) => {
      // Error
      if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      //console.log(error.response.headers);
      } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
      } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
      }
      });;
  };
  fillValues = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    let record = this.state.userGeneralInfo
    switch(name){
      case "name":
        record.fullName = value;
        
        break;
      
      case "father-name":
      record.fatherHusbandName = value;
      
      break;
      
      case "cnic-no":
      record.cnic = value;
      
      break;

      case "dob":
      record.dob = value;
      
      break;

      case "gender":
      record.gender = value;
      
        break;
      case "Marital Status":
      record.maritalStatus = value;
      
        break;
      
      case "mobile-no":
      record.mobilePhone = value;
      
        break;
      case "home-phone":
      record.homePhone = value;
      
        break;
      case "curr-address":
      record.currentAddress = value;
      
        break;
      case "permanent-address":
      record.permanentAddress = value;
      
        break;
      case "position":
      record.positionApplied = value;
      
        break;
     
        
      default:
        
    }
    this.setState({userGeneralInfo: record}, () => {
      console.log(this.state.userGeneralInfo);
    });
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
          <Button className="to-academic-button" bsClass="xavor-style" onClick={this.submitProfileInformation}>Next</Button>
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
