import React, { Component } from "react";
import Aux from "../../Auxilary/Auxilary";
import { Modal, Button, FormControl, FormGroup, Form, ControlLabel } from 'react-bootstrap';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import './AcademicInfo.css';




class AcademicInfo extends Component {

    /*************************************************ROWS to show in table******************************************************/
    state = {
        show: false,
        record: {
            institute: '',
            subject: '',
            fromdate: '',
            todate: '',
        
            degree: '',
            grades: '',
            del: false 
        },
        records: [{
            institute: 'FAST',
            subject: 26,
            fromdate: '0-22-95',
            todate: '12-5-2007',
            degree: 'cs',
            grades: '3.5',
            del: false
        },]
    }
    /*************************************************Functions******************************************************/
    handleClose = () => {
        this.setState({ show: false });
    }

    handleShow = () => {
        this.setState({ show: true });
    }

    fillValues = (event) => {
        const name = event.target.name;
    const value = event.target.value;
    let record = this.state.record;
    switch(name){
      case "institute":
        record.institute = value;
        break;
      
      case "subject":
      record.subject = value;
         break;
      
      case "fromdate":
      record.fromdate = value;
          break;

      case "todate":
      record.todate = value
      break;

      case "degree":
        record.degree = value;
        break;
      case "grades":
        record.grades = value;
        break;   
      default:
    }
    this.setState({record: record})
    }

    addRecord = () => {
        const record = this.state.record;
        const allRecords = this.state.records;
        allRecords.push(record);
        this.setState({records: allRecords});
        console.log("Showing values of record from state: \n");
        console.log(this.state.record);
        console.log("Showing values of all records array from state: \n");
        console.log(this.state.records);
        this.handleClose();
        

    }

    /*************************************************End of Functions******************************************************/
    render() {


        /*********************************************Columns/Headings****************************************************/ 
        const columns = [{
            Header: 'Name of Institute',
            headerClassName: "table-header-grid",
            accessor: 'institute' // String-based value accessors!
        }, {
            Header: 'Subject',
            headerClassName: "table-header-grid",
            accessor: 'subject',
            Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
        }, {
            Header: "Tenure",
            headerClassName: "table-header-grid",
            columns: [
                {
                    Header: "From",
                    headerClassName: "table-header-grid",
                    accessor: "fromdate"
                },
                {
                    Header: "To",
                    headerClassName: "table-header-grid",
                    accessor: "todate"
                }
            ]
        },
        
        {
            Header: 'Major/Degree',
            headerClassName: "table-header-grid",
            accessor: 'degree',

        },
        {
            Header: 'Grades',
            headerClassName: "table-header-grid",
            accessor: 'grades',
            Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
        },
        {
            Header: 'Action',
            headerClassName: "table-header-grid",
            accessor: 'del',
            Cell: row => (
                <div>
                    <Button bsClass="action-link-buttons" bsStyle="link">Edit</Button> | 
                    <Button bsClass="action-link-buttons" >Remove</Button>             
                </div>
              )
        }
        ]
        return (
            <Aux>
                <div className="academic-wrap">
                <div className="academic-heading">
                <div className="heading-title">
                <h5>Complete List. Starting from Most Recent</h5>
                </div>
    
                <div className="add-record-button">
                    <span className="glyphicon glyphicon-plus"></span>
                    <a onClick={this.handleShow}>  Add a new record</a>
                </div>
                </div>


                <div className="container-fluid">
                        
                           
                            <Modal dialogClassName="academic-modal" bsSize="large" className="Popup" show={this.state.show} onHide={this.handleClose}>
                                <Modal.Header className="academic-modal-header" closeButton>
                                    <Modal.Title><b>Add new record</b></Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                <div className="container-fluid academic-modal-body">
                                <Form className="academic-info">
                                    <FormGroup controlId="formBasicText">
                                    
                                        <div className="row">
                                            <div className="col-md-6 modal-field">
                                                <div>
                                                    <ControlLabel>* Name of Institute</ControlLabel>{' '}
                                                </div>
                                                <FormControl
                                                    name="institute"
                                                    type="text"
                                                    placeholder="McGille University"
                                                    onChange = {this.fillValues}
                                                />    
                                            </div>
                                            <div className="col-md-6 modal-field">
                                            <div>
                                                <ControlLabel>* Major</ControlLabel>{' '}
                                            </div>
                                            <FormControl
                                                name="major"
                                                type="text"
                                                placeholder="Please Specify"
                                                onChange = {this.fillValues}

                                            />    
                                        </div>
                                          
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6 modal-field">
                                                <div>
                                                    <ControlLabel>* Year Enrolled</ControlLabel>{' '}
                                                </div>
                                                <FormControl
                                                    name="fromdate"
                                                    type="date"
                                                    placeholder="1/1/2001"
                                                    onChange = {this.fillValues}
                                                />    
                                            </div>
                                          
                                            <div className="col-md-6 modal-field">
                                            <div>
                                                <ControlLabel>* Year Graduated</ControlLabel>
                                                {"     "}
                                            </div>
                                            <FormControl
                                                name="todate"
                                                type="date"
                                                placeholder="1/1/2001"
                                                onChange = {this.fillValues}
                                            />
                                            </div>
                                        </div>






                                        <div className="row">
                                         
                                          
                                            <div className="col-md-6 modal-field">
                                            <div>
                                                <ControlLabel>* CGPA/Grades</ControlLabel>
                                                {"     "}
                                            </div>
                                            <FormControl
                                                name="grades"
                                                type="text"
                                                placeholder="Please Specify"
                                                onChange = {this.fillValues}
                                            />
                                            </div>
                                        </div>
                                        
                                    </FormGroup>
                                    
                                </Form>
                                
                                </div>

                                <div className="row">
                                <div className="col-md-6">
                                <section className="mandatory-note"><b>* All fields are mandatory</b></section>
                                </div>
                                <div className="save-button-container">
                                <Button bsClass="normal-style-small" onClick={this.handleClose}>Cancel</Button>
                                <Button bsClass="xavor-style-small" onClick={this.addRecord}>Save</Button>
                                </div>
                                </div>
                               
                                </Modal.Body>
                                
                            </Modal>
                    
                    
                    <ReactTable
                        className="data-table"
                        data={this.state.records}
                        columns={columns}
                        defaultPageSize={5}
                    />
                    <div className="row">
                <Button className="to-professional-button" bsClass="xavor-style" onClick={this.props.click}>Next</Button>
                <Button className="to-previous" bsClass="xavor-style" onClick={this.props.prev}>Previous</Button>
                </div>
                    
                </div>
               
                </div>
            </Aux>

        );
    }
}

export default AcademicInfo;