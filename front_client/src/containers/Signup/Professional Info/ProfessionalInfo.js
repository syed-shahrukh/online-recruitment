import React, { Component } from "react";
import Aux from "../../Auxilary/Auxilary";
import { Modal, Button, FormControl, FormGroup, Form, ControlLabel } from 'react-bootstrap';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import './ProfessionalInfo.css';




class ProfessionalInfo extends Component {

    /*************************************************ROWS to show in table******************************************************/
    state = {
        show: false,
        record: {
            employer: '',
            address: '',
            fromdate: '',
            todate: '',
            salarystart: '',
            salaryfinal: '',
            jobtitle: '',
            reasonleave: '',
            duties: ''
        },
        records: [{
            employer: 'Shahrukh',
            address: '',
            fromdate: '',
            todate: '',
            salarystart: '',
            salaryfinal: '',
            jobtitle: '',
            reasonleave: '',
            duties: ''
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
        switch (name) {
            case "employer":
                record.employer = value;
                break;

            case "address":
                record.address = value;
                break;

            case "fromdate":
                record.fromdate = value;
                break;

            case "todate":
                record.todate = value
                break;
            case "jobtitle":
                record.jobtitle = value
            break;

            case "salarystart":
                record.salarystart = value;
                break;
            case "salaryfinal":
                record.salaryfinal = value;
                break;
                case "reasonleave":
                record.reasonleave = value;
                break;
            case "duties":
                record.duties = value;
                break;
            default:
        }
        this.setState({ record: record })
    }

    addRecord = () => {
        const record = this.state.record;
        const allRecords = this.state.records;
        allRecords.push(record);
        this.setState({ records: allRecords });
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
            Header: "Employment Date",
            headerClassName: "table-header-grid",
            accessor: "fromdate"
        },
        {
          Header: "Duratoin",
          headerClassName: "table-header-grid",
          accessor: "todate"
        },
        {
            Header: "Employer/Company",
            headerClassName: "table-header-grid",
            accessor: "todate"
        },
        {
            Header: "Salary",
            headerClassName: "table-header-grid",
            columns: [
                {
                    Header: "Starting",
                    headerClassName: "table-header-grid",
                    accessor: "salarystart"
                },
                {
                    Header: "Final",
                    headerClassName: "table-header-grid",
                    accessor: "salaryfinal"
                }
            ]
        },
        {
            Header: 'Job Title',
            headerClassName: "table-header-grid",
            accessor: 'jobtitle'
        },
        {
            Header: 'Reason for Leaving',
            headerClassName: "table-header-grid",
            accessor: 'reasonleave',

        },
        {
            Header: 'Action',
            headerClassName: "table-header-grid",
            accessor: 'del'
        }
        ]
        return (
            <Aux>
                    <div className="professional-wrap">
                    <div className="professional-heading">
                    <div className="heading-title">
                    <h5>Complete List. Starting from Most Recent</h5>
                    </div>

                    <div className="add-record-button">
                        <span className="glyphicon glyphicon-plus"></span>
                        <a onClick={this.handleShow}>  Add a new record</a>
                    </div>
                    </div>

                         
                            <Modal dialogClassName="professional-modal" className="Popup" show={this.state.show} onHide={this.handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title><b>Add new record</b></Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                <div className="container-fluid professional-modal-body">
                                    <Form className="professional-info">
                                        <FormGroup controlId="formBasicText">
                                            <div className="row">
                                                <div className="col-md-4 modal-field-professional">
                                                    <div>
                                                        <ControlLabel>* Name of Employer</ControlLabel>{' '}
                                                    </div>
                                                    <FormControl
                                                        name="employer"
                                                        type="text"
                                                        placeholder="Xavor Corporation"
                                                        onChange={this.fillValues}
                                                    />
                                                </div>
                                                
                                                <div className="col-md-4 modal-field-professional">
                                                    <div>
                                                        <ControlLabel>* Job Title</ControlLabel>
                                                        {"     "}
                                                    </div>
                                                    <FormControl
                                                        name="jobtitle"
                                                        type="text"
                                                        placeholder="Example: Software Engineer"
                                                        onChange={this.fillValues}
                                                    />
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-4 modal-field-professional">
                                                    <div>
                                                        <ControlLabel>* Employment Date</ControlLabel>{' '}
                                                    </div>
                                                    <FormControl
                                                        name="fromdate"
                                                        type="date"
                                                        placeholder="1/1/2001"
                                                        onChange={this.fillValues}
                                                    />
                                                </div>
                                                
                                                <div className="col-md-4 modal-field-professional">
                                                    <div>
                                                        <ControlLabel>Duration (Months)</ControlLabel>
                                                        {"     "}
                                                    </div>
                                                    
                                                    <FormControl
                                                        name="todate"
                                                        type="number"
                                                        placeholder="6"
                                                        onChange={this.fillValues}
                                                    />
                                                </div>
                                            </div>






                                            <div className="row">
                                                <div className="col-md-4 modal-field-professional">
                                                    <div>
                                                        <ControlLabel>Salary (Optional) Start</ControlLabel>{' '}
                                                    </div>
                                                    <FormControl
                                                        name="salarystart"
                                                        type="number"
                                                        placeholder="Specify"
                                                        bsClass="input-length"
                                                        onChange={this.fillValues}

                                                    />{'  '}<b className="salary-field">PKR</b>
                                                </div>
                                                <div className="col-md-4 modal-field-professional">
                                                    <div>
                                                        <ControlLabel>*Salary Final</ControlLabel>
                                                        {"     "}
                                                    </div>
                                                    <FormControl
                                                        name="salaryfinal"
                                                        type="number"
                                                        placeholder="Specify"
                                                        bsClass="input-length"
                                                        onChange={this.fillValues}
                                                    />{' '}<b className="salary-field">PKR</b>
                                                </div>
                                            </div>




                                            <div className="row">
                                                <div className="col-md-8 modal-field-professional">
                                                    <div>
                                                        <ControlLabel>Address</ControlLabel>{' '}
                                                    </div>
                                                    <FormControl
                                                        name="address"
                                                        type="text"
                                                        placeholder="Please Specify"
                                                        onChange={this.fillValues}

                                                    />
                                                </div>

                                                <div className="col-md-8 modal-field-professional">
                                                    <div>
                                                        <ControlLabel>Reason for Leaving</ControlLabel>
                                                        {"     "}
                                                    </div>
                                                    <FormControl
                                                        name="reasonleave"
                                                        type="text"
                                                        placeholder="Please Specify"
                                                        onChange={this.fillValues}
                                                    />
                                                </div>
                                            </div>



                                            <div className="row">
                                                <div className="col-md-12 modal-field-professional">
                                                    <div>
                                                        <ControlLabel>List the duties you performed, skills you used or learned, support or supervisory positions held and promotions</ControlLabel>{' '}
                                                    </div>
                                                    <FormControl
                                                        name="duties"
                                                        componentClass="textarea"
                                                        placeholder="Please Specify"
                                                        onChange={this.fillValues}

                                                    />
                                                </div>

                                            </div>

                                        </FormGroup>

                                    </Form>
                                    


                                    <div className="row">
                                    <div className="col-md-6">
                                <section className="mandatory-note"><b>* All fields are mandatory</b></section>
                                </div>
                                <div className="professional-save-button-container">
                                <Button bsClass="normal-style-small" onClick={this.handleClose}>Cancel</Button>
                                <Button bsClass="xavor-style-small" onClick={this.addRecord}>Save</Button>
                                </div>
                                </div>
                                    </div>
                                </Modal.Body>
                            </Modal>
                           
                    <div className="container-fluid">
                    <ReactTable
                        className="data-table"
                        data={this.state.records}
                        columns={columns}
                        defaultPageSize={5}
                    />
                    <div className="row">
                        <Button className="to-references-button" bsClass="xavor-style" onClick={this.props.click}>Next</Button>
                        <Button className="to-previous" bsClass="xavor-style" onClick={this.props.prev}>Previous</Button>
                    </div>

                    </div>
                    

            

                    </div>
            </Aux>

        );
    }
}

export default ProfessionalInfo;