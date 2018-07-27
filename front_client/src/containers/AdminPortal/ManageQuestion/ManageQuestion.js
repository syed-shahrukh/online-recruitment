import React, { Component } from 'react';
import Aux from '../../Auxilary/Auxilary';
import { Breadcrumb, Button, ButtonToolbar,DropdownButton, MenuItem, FormGroup ,ControlLabel,FormControl, Checkbox, Modal, Form } from 'react-bootstrap';
import ReactSummernote from 'react-summernote';
import 'react-summernote/dist/react-summernote.css'; // import styles
import 'bootstrap/dist/js/bootstrap.bundle';
import ReactTable from 'react-table';
import './ManageQuestion.css';
import axios from 'axios';

class ManageQuestion extends Component{
  componentDidMount(){
    
    axios.get('/api/sections/')
    .then(response => {
      const section = response.data
      this.setState({sectionToList: section}, () => {console.log(this.state.sectionToList)});
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
    state = {
      sectionToList:[],
        questionsToList: [],
        answersToShow: [],
        questionToAdd: {
          questionText: '',
          answer:[{statement: "This is your Boy L&P", isAnswer:false}, {statement:"This better should work!", isAnswer:true}],
          sectionId: '',
          imagePath: '',
          isDeleted: false },


        answerToAdd: {
            statement: "",
            isAnswer: false
        },


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
            accessor: "isAnswer",
            minWidth:80,
            maxWidth:100,
            headerClassName: "table-header-grid",
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

    fillValue = (event) => {
      const statement = event;
      const questionText = this.state.questionToAdd;
      questionText.questionText = statement;
      this.setState({questionToAdd: questionText}, () => {console.log(this.state.questionToAdd);});
      
    }
    selectSection = (event) => {
      const section = event.target.value;
      const newQuestion = this.state.questionToAdd;
      newQuestion.sectionId = section;
      this.setState({questionToAdd: newQuestion}, () => console.log(this.state.questionToAdd));
    }
    addAnswerToQuestion = (event) => {
      let currentAnswer = this.state.answerToAdd;
      const name = event.target.name;
      switch(name){
        case "answerStatement":
        const description = event.target.value;
        currentAnswer.statement = description;
        this.setState({answerToAdd: currentAnswer}, () => console.log(this.state.answerToAdd));
        break;
        case "isAnswerCheckbox":
          currentAnswer.isAnswer = !currentAnswer.isAnswer;
          this.setState({answerToAdd: currentAnswer}, () => console.log(this.state.answerToAdd));

        break;

        default:
      }
      
    }
  submitNewAnswer = () => {
    const answerOption = this.state.answerToAdd;
    let question = this.state.questionToAdd;
    question.answer = [...question.answer, answerOption];
   
    
    this.setState({questionToAdd: question,
                  answerToAdd:{statement: "", isAnswer:false}
                },
                () => {console.log(this.state.questionToAdd.answer)
                       console.log(this.state.answerToAdd)});
    
    this.handleChildClose();
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
                        <ReactTable className="table-grid"
                         showPagination={false}
                          data={this.state.questionsToList}
                          minRows={10}
                          columns={this.state.columns} />
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
                        
                        <ReactSummernote
                        value={this.state.statement}
                        options={{
                          height: 50,
                          dialogsInBody: true,
                          toolbar: [
                            ['style', ['style']],
                            ['font', ['bold', 'underline', 'clear']],
                            ['para', ['ul', 'ol', 'paragraph']],
                            ['view', [ 'codeview']]
                          ],
                          codemirror: {
                            theme: 'monokai'
                          }
                        
                        }}
                        onChange={this.fillValue}
                      />
                      
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
    
                        <FormControl onChange={this.selectSection} componentClass="select" placeholder="select">
                          {this.state.sectionToList.map(section => {
                            return <option value={section._id}  key={section._id}>{section.name}</option>
                          })}
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
                  data={this.state.questionToAdd.answer}
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
                                name="answerStatement"
                                type="text"
                                placeholder="Please Specify"
                                onChange = {this.addAnswerToQuestion}
                            />    
                        </div>
                       </div>
                       <div className="row">
                       <div className="col-md-6 is-answer-checkbox">
                       <FormGroup>
                       <Checkbox onChange={this.addAnswerToQuestion} name="isAnswerCheckbox" inline>Is Answer?</Checkbox>
                     </FormGroup>
                       </div>
                       </div>
                </FormGroup>
                
            </Form>
                
                <div className="row">
                    <div className="col-md-12 save-answer">
                        <Button bsClass="xavor-style" onClick={this.submitNewAnswer}>Save</Button>
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