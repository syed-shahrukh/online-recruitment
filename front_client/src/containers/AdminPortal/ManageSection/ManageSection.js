import React, { Component } from 'react';
import Aux from '../../Auxilary/Auxilary';
import { Breadcrumb } from 'react-bootstrap';
import { Form, FormControl, Modal, Button, ControlLabel, FormGroup } from 'react-bootstrap';
import ReactTable from 'react-table';
import axios from 'axios';
import './ManageSection.css';



class ManageSection extends Component {
    componentDidMount () {
        axios.get('/api/sections')
            .then( response => {
                this.setState({sections: response.data});
                 });
    }
   
    state = {
        show: false,
        show_edit_modal: false,
        show_delete_alert:false,
        sections: [],
        selected_row: {},
        section_name:"",
        question_to_list:null,
        section_description:"",        
        columns: [
            
          {
            Header: "Section Name",
            accessor: "name",
            minWidth: 100, // A minimum width for this column. If there is extra room, column will flex to fill available space (up to the max-width, if set)
            maxWidth: 150,
            headerClassName: "table-header-grid",
            show: true
          },
          {
            Header: "Description",
            accessor: "description",
            minWidth: 500, // A minimum width for this column. If there is extra room, column will flex to fill available space (up to the max-width, if set)
            maxWidth: 550,
            headerClassName: "table-header-grid",
            show: true
          },
         
          {
            Header: "Action",
            headerClassName: "table-header-grid",
            minWidth: 120, // A minimum width for this column. If there is extra room, column will flex to fill available space (up to the max-width, if set)
            maxWidth: 121,
            Cell: row => (
              <div>
              <span>
              
              <a onClick={() => this.handleEditOperation(row.original)}>Edit</a>
              
              </span>
              
              <span>
              <a onClick={() => this.handleDeleteOperation(row.original)}>Delete</a>
              </span>
                
                
              </div>
            )
          }
        ]
      };
    /***************************** Functions****************************************************** */
    handleClose = () => {
        this.setState({ show: false });
    }
    /************************************************************************************************ */
    handleShow = () => {
        this.setState({ show: true });
    }
    /************************************************************************************************* */
    handleDeleteAlert = () => {
        const status = !this.state.show_delete_alert;
        
        this.setState({show_delete_alert: status});
    }
    /************************************************************************************************* */
    handleDeleteOperation = (row) => {
        this.handleDeleteAlert();
        this.setState({selected_row: row,}, () => {
            
            console.log("Row to delete: " + this.state.selected_row);
        } );
        
    }
    handleEditModal = () => {
        const status = !this.state.show_edit_modal;
        
        this.setState({show_edit_modal: status});
    }
    /***************************************************************************************************** */
    handleEditOperation = (row) =>{
        this.handleEditModal();
       this.setState({selected_row: row}, () => {console.log("Selected Row: " + this.state.selected_row._id + "\n" + this.state.selected_row.name)});
      
    }
    /********************************************************************************************************** */
    fillValues = (event) => {
        
        const name = event.target.name;
        const value = event.target.value;
        switch(name){
            case "section-name":
                this.setState({section_name: value});
                
                break;
            case "questions-to-list":
                this.setState({question_to_list: value});
                break;
            case "description":
                this.setState({section_description: value});
                break;
            default:
        };
    }

    editValues  = (event) => {
        
        const name = event.target.name;
        const value = event.target.value;
        let updatedRow = this.state.selected_row
        switch(name){
            case "section-name":
                updatedRow.name = value;
                this.setState({selected_row: updatedRow});
                
                break;
            case "questions-to-list":
                updatedRow.question_to_list = value;
                this.setState({selected_row: updatedRow});
                break;
            case "description":
                 updatedRow.description = value;
                 this.setState({selected_row: updatedRow});
                break;
            default:
        };
    }
    /********************************************************************************************************* */
    saveSection = () => {
        console.log("Post Data Called");
        const section = {
            name: this.state.section_name,
            //question_to_list: this.state.question_to_list,
            description: this.state.section_description
        };
        axios.post('/api/sections', section)
            .then( response => {
                console.log(response);
                this.handleClose();


                axios.get('/api/sections')
                .then( response => {
                    this.setState({sections: response.data});
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
                });
                
    }
    /****************************************Update Function************************************************** */
    updateSection = () => {
        const selectedSection = this.state.selected_row;
        const id = selectedSection._id;
        const updatedSection = {
            name: selectedSection.name,
            description: selectedSection.description,
            question_to_list: selectedSection.question_to_list
        }
        axios.put(`/api/sections/${id}`, updatedSection)
        .then(response => {
            this.handleEditModal();            
            axios.get('/api/sections')
            .then( response => {
                this.setState({sections: response.data});
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
    deleteSection = () => {
        const selectedSection = this.state.selected_row;
        const id = selectedSection._id;
        
        console.log(id);
        axios.delete(`/api/sections/${id}`)
        .then(response => {
            
            
            axios.get('/api/sections')
            .then( response => {
                this.setState({sections: response.data});
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
    /***************************** End of Functions****************************************************** */
    render() {
        const fakeData = this.state.sections;
        return (
            <Aux>
                <Breadcrumb className="bread-crumb">
                    <Breadcrumb.Item href="/admin-portal/home/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item className="current-node" active href="/admin-portal/home/manage-sections">Manage Sections</Breadcrumb.Item>
                </Breadcrumb>
                <div className="content-body">
                    <div className="admin-tools">
                   
                             {/****************************************Search Bar*************************************/}
                    <div className="search-bar">
                    <form>
                        <input className="search-box" name="search" placeholder="Search..."/>
                        <button className="search-button">
                            <i className="fas fa-search"></i>
                        
                        </button>
                    </form>
                </div>
                {/****************************************Search Bar*************************************/}
                <div className="add-button">
                <span className="glyphicon glyphicon-plus"></span>
                <a onClick={this.handleShow}>  Add a new section</a>
                </div>
                </div>
                {/*************Show Add Modal/************************************************************/}
                            <Modal show={this.state.show} onHide={this.handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title><b>Add new section</b></Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    
                                        <Form>
                                            <FormGroup controlId="formBasicText">

                                                <div className="row admin-modal-fields">
                                                    <div className="col-md-6">
                                                        <div>
                                                            <ControlLabel>* Name</ControlLabel>{' '}
                                                        </div>
                                                        <FormControl
                                                            name="section-name"
                                                            type="text"
                                                            placeholder="Part Z"
                                                            onChange={this.fillValues}
                                                        />
                                                    </div>

                                                    <div className="col-md-6 admin-modal-fields">
                                                        <div>
                                                            <ControlLabel>* Number of Questions to list</ControlLabel>{' '}
                                                        </div>
                                                        <FormControl
                                                            name="questions-to-list"
                                                            type="number"
                                                            placeholder="10"
                                                            
                                                            onChange={this.fillValues}
                                                        />
                                                    </div>
                                                </div>


                                                <div className="row admin-modal-fields">

                                                    <div className="col-md-12">
                                                        <div>
                                                            <ControlLabel>Description</ControlLabel>
                                                            {"     "}
                                                        </div>
                                                        <FormControl
                                                            name="description"
                                                            componentClass="textarea"
                                                            placeholder="Please Specify"
                                                            onChange={this.fillValues}
                                                        />
                                                    </div>
                                                </div>

                                            </FormGroup>

                                        </Form>
                                        <div className="row">
                                        <div className="col-md-8">
                                        <section className="mandatory-note"><b>Note: All Fields marked with * are mandatory</b></section>
                                        </div>
                                        <div className="col-md-4">
                                        <Button bsClass="normal-style-small" onClick={this.handleClose}>Cancel</Button>
                                        <Button bsClass="xavor-style-small" onClick={this.saveSection}>Save</Button>
                                        </div>
                                        </div>
                                    





                                </Modal.Body>
                                
                            </Modal>
                            {/*************End of Show Add Modal/*********************************************/}
{/********************************************** Show Edit Modal*************************************************/}                            
                            <Modal show={this.state.show_edit_modal} onHide={this.handleEditModal}>
                                <Modal.Header closeButton>
                                    <Modal.Title><b>Edit section</b></Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    
                                        <Form>
                                            <FormGroup controlId="formBasicText">

                                                <div className="row admin-modal-fields">
                                                    <div className="col-md-6">
                                                        <div>
                                                            <ControlLabel>* Name</ControlLabel>{' '}
                                                        </div>
                                                        <FormControl
                                                            name="section-name"
                                                            type="text"
                                                            value={this.state.selected_row.name}
                                                            placeholder="Part Z"
                                                            onChange={this.editValues}
                                                        />
                                                    </div>

                                                    <div className="col-md-6 admin-modal-fields">
                                                        <div>
                                                            <ControlLabel>* Number of Questions to list</ControlLabel>{' '}
                                                        </div>
                                                        <FormControl
                                                            name="questions-to-list"
                                                            type="number"
                                                            placeholder="10"
                                                            value = {this.state.selected_row.question_to_list}
                                                            onChange={this.editValues}
                                                        />
                                                    </div>
                                                </div>


                                                <div className="row admin-modal-fields">

                                                    <div className="col-md-12">
                                                        <div>
                                                            <ControlLabel>Description</ControlLabel>
                                                            {"     "}
                                                        </div>
                                                        <FormControl
                                                            name="description"
                                                            componentClass="textarea"
                                                            placeholder="Please Specify"
                                                            value={this.state.selected_row.description}
                                                            onChange={this.editValues}
                                                        />
                                                    </div>
                                                </div>

                                            </FormGroup>

                                        </Form>
                                        <div className="row">
                                        <div className="col-md-8">
                                        <section className="mandatory-note"><b>Note: All Fields marked with * are mandatory</b></section>
                                        </div>
                                        <div className="col-md-4">
                                        <Button bsClass="normal-style-small" onClick={this.handleEditModal}>Cancel</Button>
                                        <Button bsClass="xavor-style-small" onClick={this.updateSection}>Save</Button>
                                        </div>
                                        </div>
                                </Modal.Body>
                                
                            </Modal>
{/**********************************************End Show Edit Modal*************************************************/}                                                        
{/**********************************************Confirm Delete Modal**************************************************/}
                    <Modal show={this.state.show_delete_alert} onHide={this.handleDeleteAlert}>
                                <Modal.Header closeButton>
                                    <Modal.Title><b>Confirm Delete?</b></Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    
                                    <div className="row">
                                        <div className="col-md-12">
                                        <p>Are you sure you want to delete <b>{this.state.selected_row.name}</b> Section?</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                    <div className="col-md-12">
                                    <Button bsClass="normal-style-small" onClick={this.handleDeleteAlert}>No</Button>
                                    <Button bsClass="xavor-style-small" onClick={this.deleteSection}>Yes</Button>
                                    </div>
                                    </div>
                                </Modal.Body>
                                
                            </Modal>
{/********************************************End of Confirm Delete Modal********************************************/}
                    
                    
                    
                    
                    
                    <div className="tabular-data">
                        <ReactTable 
                        className="table-grid"
                         data={fakeData}
                          minRows={0}
                           columns={this.state.columns} />
                    </div>
                </div>
            </Aux>
        );
    }
}

export default ManageSection;