import React, { Component } from "react";
import Aux from "../../Auxilary/Auxilary";
import axios from 'axios';
import { Modal, Button, FormControl, FormGroup, Form, ControlLabel } from 'react-bootstrap';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import './ProfessionalInfo.css';




class ProfessionalInfo extends Component {

    /*************************************************ROWS to show in table******************************************************/
    state = {
        show: false,
        selected_record: {},
        show_delete_alert: false,
        show_edit_modal: false,
        record: {
            userId: this.props.id,
            employer: '',
            employmentDate: '',
            duration: '',
            salaryStart: '',
            salaryFinal: '',
            title: '',
            reason: '',
            duties: ''
        },
        records: []
    };
    componentDidMount(){
        axios.get('api/professionalinfo')
        .then(response => {
            this.setState({records: response.data});
        })
    }
    /*************************************************Functions******************************************************/
    handleClose = () => {
        this.setState({ show: false });
    }

    handleShow = () => {
        this.setState({ show: true });
    }
    handleEditOperation = () => {

    }

    fillValues = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        let record = this.state.record;
        switch (name) {
            case "employer":
                record.employer = value;
                break;

            case "fromdate":
                record.employmentDate = new Date(value);
                break;

            case "todate":
                record.duration = value
                break;
            case "jobtitle":
                record.title = value
            break;

            case "salarystart":
                record.salaryStart = value;
                break;
            case "salaryfinal":
                record.salaryFinal = value;
                break;
                case "reasonleave":
                record.reason = value;
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
        axios.post('api/professionalinfo/', record)
            .then(response => {
                console.log(response.data);
                axios.get('api/professionalinfo/')
                .then(response => {
                    this.setState({records: response.data});
                })
            })

        
        
        this.handleClose();


    }

    handleDeleteAlert = () => {
        const status = !this.state.show_delete_alert;
        
        this.setState({show_delete_alert: status});
    }
    /************************************************************************************************* */
    handleDeleteOperation = (row) => {
        this.handleDeleteAlert();
        this.setState({selected_record: row,}, () => {
            
            console.log("Row to delete: ");
            console.log(this.state.selected_record);
        } );
        
    }


    handleEditModal = () => {

        const status = !this.state.show_edit_modal;
        
        this.setState({show_edit_modal: status});
    }


    /***************************************************************************************************** */
    handleEditOperation = (row) =>{
        this.handleEditModal();
       this.setState({selected_record: row}, () => {console.log("Selected Row: " + this.state.selected_record._id + "\n")});
      
    }


      /****************************************Update Function************************************************** */
      editValues  = (event) => {
        
        const name = event.target.name;
        const value = event.target.value;
        let updatedRecord = this.state.selected_record
        switch(name){
            case "employer":
                updatedRecord.employer = value;
                this.setState({selected_record: updatedRecord});
                
                break;
            case "fromdate":
                updatedRecord.employmentDate = new Date(value);
                this.setState({selected_record: updatedRecord});
                break;
            case "todate":
                 updatedRecord.duration = value;
                 this.setState({selected_record: updatedRecord});
                break;
            case "jobtitle":
                updatedRecord.title = value;
                this.setState({selected_record: updatedRecord});
               break;
            case "salarystart":
               updatedRecord.salaryStart = value;
               this.setState({selected_record: updatedRecord});
              break;
            case "salaryfinal":
              updatedRecord.salaryFinal = value;
              this.setState({selected_record: updatedRecord});
             break;
            case "reasonleave":
             updatedRecord.reason = value;
             this.setState({selected_record: updatedRecord});
            break;
            case "duties":
             updatedRecord.duties = value;
             this.setState({selected_record: updatedRecord});
            break;
            default:
        };
    }
     
      updateRecord = () => {
        const selectedRecord = this.state.selected_record;
        const id = selectedRecord._id;
        const updatedRecord = {
            userId: selectedRecord.userId,
            employer: selectedRecord.employer,
            title: selectedRecord.title,
            employmentDate: selectedRecord.employmentDate,
            duration: selectedRecord.duration,
            salaryStart: selectedRecord.salaryStart,
            salaryFinal: selectedRecord.salaryFinal,
            reason: selectedRecord.reason,
            duties: selectedRecord.duties
            
        }
        axios.put(`/api/professionalinfo/${id}`, updatedRecord)
        .then(response => {
            this.handleEditModal();            
            axios.get('/api/professionalinfo/')
            .then( response => {
                this.setState({records: response.data});
                 });

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
    }

    /****************************************End of Update Function ***********************************************/
    /*************************************Delete Function********************************************************* */
    deleteRecord = () => {
        const selectedRecord = this.state.selected_record;
        const id = selectedRecord._id;
        
        console.log(id);
        axios.delete(`/api/professionalinfo/${id}`)
        .then(response => {
            
            
            axios.get('/api/professionalinfo/')
            .then( response => {
                this.setState({records: response.data});
                this.handleDeleteAlert();
                 });

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
    }

    /*************************************************End of Functions******************************************************/
    render() {


        /*********************************************Columns/Headings****************************************************/ 
        const columns = [{
            Header: "Employment Date",
            headerClassName: "table-header-grid",
            accessor: "employmentDate"
        },
        {
          Header: "Duration",
          headerClassName: "table-header-grid",
          accessor: "duration"
        },
        {
            Header: "Employer/Company",
            headerClassName: "table-header-grid",
            accessor: "employer"
        },
        {
            Header: "Salary",
            headerClassName: "table-header-grid",
            columns: [
                {
                    Header: "Starting",
                    headerClassName: "table-header-grid",
                    accessor: "salaryStart"
                },
                {
                    Header: "Final",
                    headerClassName: "table-header-grid",
                    accessor: "salaryFinal"
                }
            ]
        },
        {
            Header: 'Job Title',
            headerClassName: "table-header-grid",
            accessor: 'title'
        },
        {
            Header: 'Reason for Leaving',
            headerClassName: "table-header-grid",
            accessor: 'reason',

        },
        {
            Header: 'Action',
            headerClassName: "table-header-grid",
            Cell: row => (
                <div>
                    <a onClick={() => this.handleEditOperation(row.original)}>Edit</a> | 
                    <a onClick={() => this.handleDeleteOperation(row.original)}>Delete</a>             
                </div>
              )
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

{/*************************************Add Professional Record Modal**********************************************************************/}  
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

                            {/**********************************************Confirm Delete Modal**************************************************/}
                    <Modal show={this.state.show_delete_alert} onHide={this.handleDeleteAlert}>
                                <Modal.Header closeButton>
                                    <Modal.Title><b>Confirm Delete?</b></Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    
                                    <div className="row">
                                        <div className="col-md-12">
                                        <p>Are you sure you want to delete this record?</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                    <div className="col-md-12">
                                    <Button bsClass="normal-style-small" onClick={this.handleDeleteAlert}>No</Button>
                                    <Button bsClass="xavor-style-small" onClick={this.deleteRecord}>Yes</Button>
                                    </div>
                                    </div>
                                </Modal.Body>
                                
                            </Modal>
{/*************************************End of Adding Professional Record Modal**********************************************************************/}                              


{/*************************************Editing Professional Record Modal**********************************************************************/}  
<Modal className="Popup" show={this.state.show_edit_modal} onHide={this.handleEditModal}>
                                <Modal.Header closeButton>
                                    <Modal.Title><b>Edit record</b></Modal.Title>
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
                                                        value={this.state.selected_record.employer}
                                                        placeholder="Xavor Corporation"
                                                        onChange={this.editValues}
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
                                                        value={this.state.selected_record.title}
                                                        placeholder="Example: Software Engineer"
                                                        onChange={this.editValues}
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
                                                        type="datetime-local"
                                                        value={this.state.selected_record.employmentDate}
                                                        placeholder="1/1/2001"
                                                        onChange={this.editValues}
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
                                                        value={this.state.selected_record.duration}
                                                        placeholder="6"
                                                        onChange={this.editValues}
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
                                                        value={this.state.selected_record.salaryStart}
                                                        bsClass="input-length"
                                                        onChange={this.editValues}

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
                                                        value={this.state.selected_record.salaryFinal}
                                                        bsClass="input-length"
                                                        onChange={this.editValues}
                                                    />{' '}<b className="salary-field">PKR</b>
                                                </div>
                                            </div>




                                            <div className="row">
             
                                                <div className="col-md-8 modal-field-professional">
                                                    <div>
                                                        <ControlLabel>Reason for Leaving</ControlLabel>
                                                        {"     "}
                                                    </div>
                                                    <FormControl
                                                        name="reasonleave"
                                                        type="text"
                                                        value={this.state.selected_record.reason}
                                                        placeholder="Please Specify"
                                                        onChange={this.editValues}
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
                                                        value={this.state.selected_record.duties}
                                                        placeholder="Please Specify"
                                                        onChange={this.editValues}

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
                                <Button bsClass="normal-style-small" onClick={this.handleEditModal}>Cancel</Button>
                                <Button bsClass="xavor-style-small" onClick={this.updateRecord}>Update</Button>
                                </div>
                                </div>
                                    </div>
                                </Modal.Body>
                            </Modal>

{/*************************************End of editing Professional Record Modal**********************************************************************/}  
{/********************************************End of Confirm Delete Modal********************************************/}
                           
                    <div className="container-fluid">
                    <ReactTable
                        className="data-table"
                        data={this.state.records}
                        columns={columns}
                        showPagination={false}
                        defaultPageSize={10}
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