import React, { Component } from "react";
import Aux from "../../Auxilary/Auxilary";
import { Modal, Button, FormControl, FormGroup, Form, ControlLabel } from 'react-bootstrap';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import axios from 'axios';
import './AcademicInfo.css';




class AcademicInfo extends Component {

    /*************************************************ROWS to show in table******************************************************/
    state = {
        show: false,
        selected_record: {},
        show_delete_alert: false,
        show_edit_modal: false,
        record: {
            userId: this.props.id,
            institute: '',
            subject: '',
            yearEnrolled: '',
            yearGraduated: '',
            major: '',
            degree: '',
            grades: '',
        },
        records: []
    }
    /*************************************************Functions******************************************************/
    componentDidMount(){
        axios.get('api/academicinfo/')
        .then(response => {
            this.setState({records: response.data});
        });
    }
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
      record.yearEnrolled = value;
          break;

      case "todate":
      record.yearGraduated = value
      break;

      case "degree":
        record.degree = value;
        break;
      case "grades":
        record.grades = value;
        break; 
    case "major":
        record.major = value;
        break;   
      default:
    }
    this.setState({record: record})
    }


    addRecord = () => {
        const record = this.state.record;
        axios.post('/api/academicinfo', record)
            .then(response => {
                console.log(response.data);
                axios.get('api/academicinfo/')
                     .then(response => {
            this.setState({records: response.data});
                          });
            }).catch((error) => {
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
                });
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
            case "institute":
                updatedRecord.institute = value;
                this.setState({selected_record: updatedRecord});
                
                break;
            case "subject":
                updatedRecord.subject = value;
                this.setState({selected_record: updatedRecord});
                break;
            case "fromdate":
                 updatedRecord.yearEnrolled = value;
                 this.setState({selected_record: updatedRecord});
                break;
            case "todate":
                updatedRecord.yearGraduated = value;
                this.setState({selected_record: updatedRecord});
               break;
            case "degree":
               updatedRecord.degree = value;
               this.setState({selected_record: updatedRecord});
              break;
            case "grades":
              updatedRecord.grades = value;
              this.setState({selected_record: updatedRecord});
             break;
            case "major":
             updatedRecord.major = value;
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
            institute: selectedRecord.institute,
            subject: selectedRecord.subject,
            yearEnrolled: selectedRecord.yearEnrolled,
            yearGraduated: selectedRecord.yearGraduated,
            degree: selectedRecord.degree,
            grades: selectedRecord.grades,
            major: selectedRecord.major
        }
        axios.put(`/api/academicinfo/${id}`, updatedRecord)
        .then(response => {
            this.handleEditModal();            
            axios.get('/api/academicinfo/')
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
        axios.delete(`/api/academicinfo/${id}`)
        .then(response => {
            
            
            axios.get('/api/academicinfo/')
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
    /************************************************************************************************************ */

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
                    accessor: "yearEnrolled"
                },
                {
                    Header: "To",
                    headerClassName: "table-header-grid",
                    accessor: "yearGraduated"
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
                    <a onClick={() => this.handleEditOperation(row.original)}>Edit</a> | 
                    <a onClick={() => this.handleDeleteOperation(row.original)}>Delete</a>             
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
                                                <ControlLabel>* Subject</ControlLabel>{' '}
                                            </div>
                                            <FormControl
                                                name="subject"
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
                                                    type="year"
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
                                                type="year"
                                                placeholder="1/1/2001"
                                                onChange = {this.fillValues}
                                            />
                                            </div>
                                        </div>

                                        <div className="row">
                                           
                                        <div className="col-md-6 modal-field">
                                            <div>
                                                <ControlLabel>* Degree</ControlLabel>
                                                {"     "}
                                            </div>
                                            <FormControl
                                                name="degree"
                                                type="text"
                                                placeholder="Please Specify"
                                                onChange = {this.fillValues}
                                            />
                                            </div>
                                           
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

                                         <div className="row">
                                           
                                           <div className="col-md-6 modal-field">
                                               <div>
                                                   <ControlLabel>* Major</ControlLabel>
                                                   {"     "}
                                               </div>
                                               <FormControl
                                                   name="major"
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
{/***********************************************Edit Modal***********************************************************/}
<Modal className="Popup" show={this.state.show_edit_modal} onHide={this.handleEditModal}>
                                <Modal.Header className="academic-modal-header" closeButton>
                                    <Modal.Title><b>Edit Record</b></Modal.Title>
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
                                                    value={this.state.selected_record.institute}
                                                    placeholder="McGille University"
                                                    onChange = {this.editValues}
                                                />    
                                            </div>
                                            <div className="col-md-6 modal-field">
                                            <div>
                                                <ControlLabel>* Subject</ControlLabel>{' '}
                                            </div>
                                            <FormControl
                                                name="subject"
                                                type="text"
                                                value={this.state.selected_record.subject}
                                                placeholder="Please Specify"
                                                onChange = {this.editValues}

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
                                                    type="year"
                                                    value={this.state.selected_record.yearEnrolled}
                                                    placeholder="1/1/2001"
                                                    onChange = {this.editValues}
                                                />    
                                            </div>
                                          
                                            <div className="col-md-6 modal-field">
                                            <div>
                                                <ControlLabel>* Year Graduated</ControlLabel>
                                                {"     "}
                                            </div>
                                            <FormControl
                                                name="todate"
                                                type="year"
                                                value={this.state.selected_record.yearGraduated}
                                                placeholder="1/1/2001"
                                                onChange = {this.editValues}
                                            />
                                            </div>
                                        </div>

                                        <div className="row">
                                           
                                        <div className="col-md-6 modal-field">
                                            <div>
                                                <ControlLabel>* Degree</ControlLabel>
                                                {"     "}
                                            </div>
                                            <FormControl
                                                name="degree"
                                                type="text"
                                                value={this.state.selected_record.degree}
                                                placeholder="Please Specify"
                                                onChange = {this.editValues}
                                            />
                                            </div>
                                           
                                            <div className="col-md-6 modal-field">
                                            <div>
                                                <ControlLabel>* CGPA/Grades</ControlLabel>
                                                {"     "}
                                            </div>
                                            <FormControl
                                                name="grades"
                                                type="text"
                                                value={this.state.selected_record.grades}
                                                placeholder="Please Specify"
                                                onChange = {this.editValues}
                                            />
                                            </div>
                                        </div>

                                         <div className="row">
                                           
                                           <div className="col-md-6 modal-field">
                                               <div>
                                                   <ControlLabel>* Major</ControlLabel>
                                                   {"     "}
                                               </div>
                                               <FormControl
                                                   name="major"
                                                   type="text"
                                                   value={this.state.selected_record.major}
                                                   placeholder="Please Specify"
                                                   onChange = {this.editValues}
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
                                <Button bsClass="normal-style-small" onClick={this.handleEditModal}>Cancel</Button>
                                <Button bsClass="xavor-style-small" onClick={this.updateRecord}>Save</Button>
                                </div>
                                </div>
                               
                                </Modal.Body>
                                
                            </Modal>
{/***********************************************End of Edit Modal***********************************************************/}
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
{/********************************************End of Confirm Delete Modal********************************************/}

                    
                    
                    <ReactTable
                        className="data-table"
                        showPagination={false}
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