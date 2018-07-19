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
    name: '',
    fathername: '',
    cnic: '',
    dob:'',
    gender:'',
    marital:'',
    email:'',
    mobile:'',
    homephone:'',
    current_address:'',
    permanent_address:'',
    position_applied:'',
    salary_expected:'',
    employment_desired: '',
    expected_joining:''
  };

  fillValues = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    switch(name){
      case "name":
        this.setState({name: value});
        break;
      
      case "father-name":
      this.setState({fathername: value});
      break;
      
      case "cnic-no":
      this.setState({cnic: value});
      break;

      case "dob":
      this.setState({dob: value});
      break;

      case "gender":
        this.setState({gender: value});
        break;
      case "Marital Status":
        this.setState({marital: value});
        break;
      case "email":
        this.setState({email: value});
        break;
      case "mobile-no":
        this.setState({mobile: value});
        break;
      case "home-phone":
        this.setState({homephone: value});
        break;
      case "curr-address":
        this.setState({current_address: value});
        break;
      case "permanent-address":
        this.setState({permanent_address: value});
        break;
      case "expected-salary":
        this.setState({salary_expected: value});
        break;
      case "joining":
        this.setState({expected_joining: value});
        break;
      case "position":
        this.setState({position_applied: value});
        break;
      case "employment-desired":
        this.setState({employment_desired: value})
        break;
        
      default:
        
    }

   
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
              <option value="software">Software Engineer</option>
              <option value="qualityassurance">
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
          <Button className="to-academic-button" bsClass="xavor-style" onClick={this.props.click}>Next</Button>
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
