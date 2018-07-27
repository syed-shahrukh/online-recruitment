import React, { Component } from "react";
import Aux from "../../Auxilary/Auxilary";
import { Modal, Button, FormControl, FormGroup, Form, ControlLabel, Radio } from 'react-bootstrap';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import './References.css';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';







class References extends Component {

    /*************************************************ROWS to show in table******************************************************/
    state = {
        show: false,
        selected_record: {},
        show_delete_alert: false,
        show_edit_modal: false,
        record: {
            userId: this.props.id,
            name: '',
            phone: '',
            relationship: '',
            yearsKnown: '',
            notified: ''
            
        },
        records: []
    }
    componentDidMount(){
        axios.get('api/referenceinfo/')
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

    fillValues = (event) => {
        const name = event.target.name;
    const value = event.target.value;
    let record = this.state.record;
    switch(name){
      case "name":
        record.name = value;
        break;
      
      case "relationship":
      record.relationship = value;
          break;

      case "yearsknown":
      record.yearsKnown = value
      break;
      case "telephone":
        record.phone = value;
      break;
      case "notified":
        record.notified = value;
        break;        
      default:
    }
    this.setState({record: record})
    }


    addRecord = () => {
        const record = this.state.record;
        axios.post('api/referenceinfo/', record)
            .then(response => {
                console.log(response.data);
                axios.get('api/referenceinfo/')
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
            case "name":
                updatedRecord.name = value;
                this.setState({selected_record: updatedRecord});
                
                break;
            case "relationship":
                updatedRecord.relationship = value;
                this.setState({selected_record: updatedRecord});
                break;
            case "yearsknown":
                 updatedRecord.yearsKnown = value;
                 this.setState({selected_record: updatedRecord});
                break;
            case "telephone":
                updatedRecord.phone = value;
                this.setState({selected_record: updatedRecord});
               break;
            case "notified":
               updatedRecord.notified = value;
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
            name: selectedRecord.name,
            relationship: selectedRecord.relationship,
            yearsKnown: selectedRecord.yearsKnown,
            phone: selectedRecord.phone,
            notified: selectedRecord.notified
        }
        axios.put(`/api/referenceinfo/${id}`, updatedRecord)
        .then(response => {
            this.handleEditModal();            
            axios.get('/api/referenceinfo/')
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
        axios.delete(`/api/referenceinfo/${id}`)
        .then(response => {
            
            
            axios.get('/api/referenceinfo/')
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
            Header: 'Name',
            headerClassName: "table-header-grid",
            accessor: 'name' // String-based value accessors!
        },{
            Header: 'Telephone',
            headerClassName: "table-header-grid",
            accessor: 'phone' // String-based value accessors!
        },
        {
            Header: 'Relationship to you',
            headerClassName: "table-header-grid",
            accessor: 'relationship'
        },
        {
            Header: 'Years they have known you',
            headerClassName: "table-header-grid",
            accessor: 'yearsKnown',

        },
        {
            
            Header: 'Notified?',
            headerClassName: "table-header-grid",
            accessor: 'notified',
            Cell: ({ value }) => {
                if(value){
                    return "Yes";
                }
                else{
                    return "No";
                }
            },
            show: true
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
                    <div className="references-wrap">
                    <div className="references-heading">
                    

                    <div className="reference-add-record-button">
                        <span className="glyphicon glyphicon-plus"></span>
                        <a onClick={this.handleShow}>  Add a new reference</a>
                    </div>
                    </div>
{/***********************************************Add Record Modal*****************************************************************************/}
                            <Modal dialogClassName="references-modal" className="Popup" show={this.state.show} onHide={this.handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title><b>Add new reference</b></Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                <div className="container-fluid references-modal-body">
                                <Form className="academic-info">
                                    <FormGroup controlId="formBasicText">
                                        <div className="row">
                                            <div className="col-md-6 references-field">
                                                <div>
                                                    <ControlLabel>Name</ControlLabel>{' '}
                                                </div>
                                                <FormControl
                                                    name="name"
                                                    type="text"
                                                    placeholder="McGille University"
                                                    onChange = {this.fillValues}
                                                />    
                                            </div>
                                            <div className="col-md-6 references-field">
                                            <div>
                                                <ControlLabel>Relationship to you</ControlLabel>
                                                {"     "}
                                            </div>
                                            <FormControl
                                                name="relationship"
                                                type="text"
                                                placeholder="Example: Professor"
                                                onChange = {this.fillValues}
                                            />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6 references-field">
                                                <div>
                                                    <ControlLabel>Telephone</ControlLabel>{' '}
                                                </div>
                                                <FormControl
                                                    name="telephone"
                                                    type="text"
                                                    placeholder="090078601"
                                                    onChange = {this.fillValues}
                                                />    
                                            </div>
                                            <div className="col-md-6 references-field">
                                            <div>
                                                <ControlLabel>Years they have known you</ControlLabel>
                                                {"     "}
                                            </div>
                                            <FormControl
                                                className="years"
                                                name="yearsknown"
                                                type="number"
                                                placeholder="1"
                                                onChange = {this.fillValues}
                                            />
                                            </div>
                                        </div>






                                        <div className="row">
                                            <div className="col-md-12 references-field">
                                                <div>
                                                    <ControlLabel>Have they been notified that we will contact them for verification?</ControlLabel>{' '}
                                                </div>
                                                <FormGroup className="Radio">
                                                    <Radio onClick={this.fillValues} name="notified" value="true" inline>
                                                        Yes
                                                    </Radio>{' '}
                                                    <Radio onClick={this.fillValues} name="notified" value="false" inline>
                                                        No
                                                    </Radio>{' '}
                                                </FormGroup>
                                            </div>
                                            


                                        </div>
                                        
                                    </FormGroup>
                                    
                                </Form>

                                </div>

                                <div className="row">
                                <div className="col-md-6">
                                <section className="mandatory-note"><b>* All fields are mandatory</b></section>
                                </div>
                                <div className="references-save-button-container">
                                <Button bsClass="normal-style-small" onClick={this.handleClose}>Cancel</Button>
                                <Button bsClass="xavor-style-small" onClick={this.addRecord}>Save</Button>
                                </div>
                                </div>
                                </Modal.Body>
                            </Modal>

{/*****************************************End of Add Record Modal*****************************************************************************/}


{/***********************************************Edit Record Modal*****************************************************************************/}
                            <Modal  show={this.state.show_edit_modal} onHide={this.handleEditModal}>
                                <Modal.Header closeButton>
                                    <Modal.Title><b>Update Record</b></Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                <div className="container-fluid references-modal-body">
                                <Form className="academic-info">
                                    <FormGroup controlId="formBasicText">
                                        <div className="row">
                                            <div className="col-md-6 references-field">
                                                <div>
                                                    <ControlLabel>Name</ControlLabel>{' '}
                                                </div>
                                                <FormControl
                                                    name="name"
                                                    type="text"
                                                    placeholder="McGille University"
                                                    value={this.state.selected_record.name}
                                                    onChange = {this.editValues}
                                                />    
                                            </div>
                                            <div className="col-md-6 references-field">
                                            <div>
                                                <ControlLabel>Relationship to you</ControlLabel>
                                                {"     "}
                                            </div>
                                            <FormControl
                                                name="relationship"
                                                type="text"
                                                placeholder="Example: Professor"
                                                value={this.state.selected_record.relationship}
                                                onChange = {this.editValues}
                                            />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6 references-field">
                                                <div>
                                                    <ControlLabel>Telephone</ControlLabel>{' '}
                                                </div>
                                                <FormControl
                                                    name="telephone"
                                                    type="text"
                                                    placeholder="090078601"
                                                    value={this.state.selected_record.phone}
                                                    onChange = {this.editValues}
                                                />    
                                            </div>
                                            <div className="col-md-6 references-field">
                                            <div>
                                                <ControlLabel>Years they have known you</ControlLabel>
                                                {"     "}
                                            </div>
                                            <FormControl
                                                className="years"
                                                name="yearsknown"
                                                type="number"
                                                placeholder="1"
                                                value={this.state.selected_record.yearsKnown}
                                                onChange = {this.editValues}
                                            />
                                            </div>
                                        </div>






                                        <div className="row">
                                            <div className="col-md-12 references-field">
                                                <div>
                                                    <ControlLabel>Have they been notified that we will contact them for verification?</ControlLabel>{' '}
                                                </div>
                                                <FormGroup className="Radio">
                                                    <Radio onClick={this.editValues} name="notified" value="true" inline>
                                                        Yes
                                                    </Radio>{' '}
                                                    <Radio onClick={this.editValues} name="notified" value="false" inline>
                                                        No
                                                    </Radio>{' '}
                                                </FormGroup>
                                            </div>
                                            


                                        </div>
                                        
                                    </FormGroup>
                                    
                                </Form>

                                </div>

                                <div className="row">
                                <div className="col-md-6">
                                <section className="mandatory-note"><b>* All fields are mandatory</b></section>
                                </div>
                                <div className="references-save-button-container">
                                <Button bsClass="normal-style-small" onClick={this.handleEditModal}>Cancel</Button>
                                <Button bsClass="xavor-style-small" onClick={this.updateRecord}>Update</Button>
                                </div>
                                </div>
                                </Modal.Body>
                            </Modal>

{/***********************************************End of Record Modal*****************************************************************************/}
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
{/**********************************************End of Confirm Delete Modal**************************************************/}


                    <div className="container-fluid">
                    <ReactTable
                        className="data-table"
                        data={this.state.records}
                        showPagination={false}
                        columns={columns}
                        defaultPageSize={5}
                    />
                    <div className="row">
                <Button href="/account-type" className="finish-signup-button" bsClass="xavor-style">Signup</Button>
                <Button className="to-previous" bsClass="xavor-style" onClick={this.props.prev}>Previous</Button>
                </div>
                </div>
                    
                </div>
                
            </Aux>

        );
    }
}

export default References;