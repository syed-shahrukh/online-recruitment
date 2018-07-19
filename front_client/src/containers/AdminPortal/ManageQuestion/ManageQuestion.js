import React, { Component } from 'react';
import Aux from '../../Auxilary/Auxilary';
import { Breadcrumb, Button, ButtonToolbar,DropdownButton, MenuItem, FormGroup ,ControlLabel,FormControl, Checkbox, Modal, Form } from 'react-bootstrap';
import RichTextEditor from '../../../components/TextEditor';
import ReactTable from 'react-table';
import './ManageQuestion.css';

const fakeData = [
    { statement: "Who are you?", section: 'Part A' },
    { statement: "What are you?", section: 'Part A' },
    { statement: "Why are you?", section: 'Part A' },
    { statement: "Who's the boss?", section: 'Part A' },
    { statement: "Do you like React?", section: 'Part B' },
    { statement: "Do you like Node Js?", section: 'Part B' },
    { statement: "When did something start out badly for you but\r in the end it was great?", section: 'Part C' },
    { statement: "What are some red flags to watch out for in daily life?", section: 'Part A' },
    { statement: "Where do you get your news?", section: 'Part A' },
    { statement: "What’s wrong but sounds right?", section: 'Part A' },
    { statement: "What’s the most epic way you’ve seen someone quit or be fired?", section: 'Part A' },
    { statement: "What food have you never eaten but would really like to try?", section: 'Part C' },
    { statement: "Which celebrity do you think is the most down to earth?", section: 'Part C' },
    { statement: "What’s the spiciest thing you’ve ever eaten?", section: 'Part B' },
    { statement: "What’s the most expensive thing you’ve broken?", section: 'Part B' },
    { statement: "What’s the most expensive thing you’ve broken?", section: 'Part B' }
  ];
  const add_answer_fakeData = [
    { statement: "Data Object Model", answer: 'false' },
    { statement: "Data Oriented Model", answer: 'false' }
  ];
class ManageQuestion extends Component{
    state = {
        parent_show: false,
        child_show: false,
        graphic_content: false,
        headerClassName: "table-header-grid",
        answer_columns: [
          {
            Header: "Answer Text",
            minWidth:300,
            maxWidth:500,
            accessor: "statement",
            headerClassName: "table-header-grid",
            show: true
          },
          {
            Header: "Is answer?",
            accessor: "answer",
            minWidth:80,
            maxWidth:100,
            headerClassName: "table-header-grid",
            show: true
          },
          {
            Header: "Action",
            minWidth:80,
            maxWidth:100,
            headerClassName: "table-header-grid",
            Cell: row => (
              <div>
                <span>
                <a onClick={this.handleEditOperation}>Edit</a>
                </span>
                <span>
                <a onClick={this.handleDeleteOperation}>Delete</a>
                </span>
              </div>
            )
          }
        ],
        columns: [
          {
            Header: "Question Statement",
            headerClassName: "table-header-grid",
            minWidth:500,
            maxWidth:501,
            accessor: "statement",
            show: true
          },
          {
            Header: "Section",
            accessor: "section",
            minWidth:50,
            maxWidth:100,
            headerClassName: "table-header-grid",
            show: true
          },
          {
            Header: "Details",
            headerClassName: "table-header-grid",
            minWidth:50,
            maxiWidth:60,
            Cell: row => (
                <div>
                  <a onClick={this.handleEditOperation}>View</a>             
                </div>
              )
          },
          {
            Header: "Action",
            headerClassName: "table-header-grid",
            minWidth:120,
            maxWidth:121,
            Cell: row => (
              <div>
              <span>
                <a onClick={this.handleEditOperation}>Edit</a>
              </span>

            <span>
                <a onClick={this.handleDeleteOperation}>Delete</a>
            </span>
                
              </div>
            )
          }
        ]
      };
    /***************************** Functions****************************************************** */
    handleClose = () => {
        this.setState({ parent_show: false });
    }
    
    handleShow = () => {
        this.setState({ parent_show: true });
    }
    handleChildShow = () => {
        this.setState({ child_show: true });
    }
    handleChildClose = () => {
        this.setState({ child_show: false });
    }
    handleDeleteOperation = () => {
        console.log("Delete operation function has been called!!!");
    }
    handleEditOperation = () =>{
        console.log("Edit operation function has been called!!!");
    }
    /***************************** End of Functions****************************************************** */
    /*********************Conditional rendering of Uploading Graphic Content*********************************/
    showGraphicalContent = (event) => {
        const show = event.target.value;
        if(show === "graphical"){
          this.setState({graphic_content: true});
        }
        else{
          this.setState({graphic_content: false});
        }
    }
    summerNote = (content) => {
      console.log(content);
    }
    
    render(){
        return(
            <Aux>
                
                    <Breadcrumb className="bread-crumb">
            
                    <Breadcrumb.Item href="/admin-portal/home/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="/admin-portal/home/manage-questions">Manage Questions</Breadcrumb.Item>
                    <Breadcrumb.Item className="current-node" active href="/admin-portal/home/manage-questions">Add Question</Breadcrumb.Item>
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
                    <div className="filterbysection-container">
                    <ButtonToolbar>
                            <DropdownButton
                            bsSize="small"
                            title="Filter by Section"
                            id="dropdown-size-small"
                            >
                            <MenuItem eventKey="1">Action</MenuItem>
                            <MenuItem eventKey="2">Another action</MenuItem>
                            <MenuItem eventKey="3">Something else here</MenuItem>
                            </DropdownButton>
                        </ButtonToolbar>
                    </div>
                    <div className="add-button">
                            <span className="glyphicon glyphicon-plus"></span>
                            <a onClick={this.handleShow}>  Add a new question</a>
                    </div>
                     
                    </div>
                   
                    <div className="tabular-data">
                        <ReactTable className="table-grid" data={fakeData} minRows={0} columns={this.state.columns} />
                    </div>
                </div>
{/******************************************Modals****************************************************************/}
{/**********************************Add Question Modal************************************************************/}            

<Modal show={this.state.parent_show} onHide={this.handleClose} >
          <Modal.Header closeButton>
            <Modal.Title>Add Question</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          {/*********************** Content Body***************************************/}
            <div className="content-body">
              
                <Form className="add-question">
                  <FormGroup controlId="formBasicText">
                  {/*********************** Question Statement***************************************/}
                    <div className="row fields">
                      <div className="col-md-12">
                        <div>
                          <ControlLabel>Statement</ControlLabel>{" "}
                        </div>
                        <RichTextEditor/>
                
                      
                      </div>
                      
                    </div>
    {/*********************** Which Section it belongs to***************************************/}
                  
    {/*********************** Whether question has some visual aid or not***************************************/}
                    <div className="row fields">
                    <div className="col-md-6">
                        <div>
                          <ControlLabel>Question Type</ControlLabel>
                          {"     "}
                        </div>
    
                        <FormControl onChange={this.showGraphicalContent} componentClass="select" placeholder="select">
                          <option value="textual">Textual</option>
                          <option value="graphical">Graphical</option>
                        </FormControl>
                      </div>
                      <div className="col-md-6">
                      
                        <div>
                          <ControlLabel>Section</ControlLabel>
                          {"     "}
                        </div>
    
                        <FormControl componentClass="select" placeholder="select">
                          <option value="section1">Section 1</option>
                          <option value="section2">Section 2</option>
                          <option value="section3">Section 3</option>
                        </FormControl>
                      </div>
                    </div>
    
                    {/*********************** Conditional Rendering of File upload*************************/}
                   { this.state.graphic_content ? <div className="row fields">
                    <div className="col-md-6">
                        <div>
                          <ControlLabel>Graphical Content</ControlLabel>
                          {"     "}
                        </div>
    
                        <input type="file" name="file" hidden/>
                      </div>
                      </div>: console.log("") }
                  </FormGroup>
                </Form>
                {/*********************** Add Answer Button***************************************/}
                <div className="row">
                  <div className="col-md-6">
                    Add answer options for above question.
                  </div>
                 <div className="col-md-6 add-answer">
                  <Button onClick={this.handleChildShow} bsClass="xavor-style">Add Answer</Button>
                </div>
                </div>
                 {/*********************** Answers Table***************************************/}
                 <div className="row ">
                 <div className="col-md-12 answer-table">
                 <ReactTable
                  data={add_answer_fakeData}
                   className="table-grid" 
                   minRows={5} 
                   showPagination={false}
                    columns={this.state.answer_columns} />
                 </div>
               
             </div>
             {/*********************** Save Button***************************************/}
             <div className="row">
              <div className="col-md-12 save-answer">
                <Button bsClass="xavor-style" onClick={this.handleClose}>Save</Button>
              </div>
             </div>
              
            </div>
            </Modal.Body>
            </Modal>


        {/*****************************End of Add Question Modal*************************************************/}
        {/****************************Add Answer Modal***********************************************************/}
            <Modal show={this.state.child_show} onHide={this.handleChildClose} >
              <Modal.Header closeButton>
                <Modal.Title>Add Answer</Modal.Title>
              </Modal.Header>
              <Modal.Body>
            
                <Form className="academic-info">
                <FormGroup controlId="formBasicText">
                
                    <div className="row">
                        <div className="col-md-8">
                            <div>
                                <ControlLabel>Description</ControlLabel>{' '}
                            </div>
                            <FormControl
                                name="answerstatement"
                                type="text"
                                placeholder="Please Specify"
                                onChange = {this.fillValues}
                            />    
                        </div>
                       </div>
                       <div className="row">
                       <div className="col-md-6 is-answer-checkbox">
                       <FormGroup>
                       <Checkbox inline>Is Answer?</Checkbox>
                     </FormGroup>
                       </div>
                       </div>
                </FormGroup>
                
            </Form>
                
                <div className="row">
                    <div className="col-md-12 save-answer">
                        <Button bsClass="xavor-style" onClick={this.handleChildClose}>Save</Button>
                    </div>
                </div>
              </Modal.Body>
            </Modal>
        {/*********************************End of Add Answer Modal*****************************************/}
</Aux>
        );
    }
}

export default ManageQuestion;