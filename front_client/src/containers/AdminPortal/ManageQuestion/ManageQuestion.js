import React, { Component } from 'react';
import Aux from '../../Auxilary/Auxilary';
import { Breadcrumb, Button, ButtonToolbar,DropdownButton, MenuItem, FormGroup ,ControlLabel,FormControl, Checkbox, Modal, Form } from 'react-bootstrap';
import ReactSummernote from 'react-summernote';
import 'react-summernote/dist/react-summernote.css'; // import styles
import Backdrop from 'react-backdrop';
import Spinner from '../../../UI/Spinner/Spinner';
import Alert from '../../../UI/Alerts/Alerts';
import 'bootstrap/dist/js/bootstrap.bundle';
import ReactTable from 'react-table';
import './ManageQuestion.css';
import axios from 'axios';

class ManageQuestion extends Component{
  componentWillMount(){
    axios.get('/api/sections/')
    .then(response => {
      const section = response.data;
      const newQuestion = {
    
        questionText: '',
        answerdetails:[],
        sectionId: ''
        };
      this.setState({sectionToList: section, newQuestion: newQuestion}, () => {console.log(this.state.sectionToList)});
      axios.get('/api/questions')
      .then(response => {
      this.setState({questionsToList:response.data, loading: false});
      })
        .catch((error) => {
          // Error
          if (error.response) {
            this.setState({alertShowStatus: true, alertMessage: error.response.data, alertStatus: error.response.status})
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
      });  
  }
  componentWillUnmount() {
    this.setState({newQuestion: {
      alertShowStatus: false,
    alertTitle: '',
    alertMessage:'',
    alertStatus: '',
      questionText: '',
      answerdetails:[],
      sectionId: ''
       }})
  }
    state = {
      loading: true,
      sectionToList:[],
        questionsToList: [],
        selectedAnswer: {},
        newQuestion: {
          questionText: '',
          answerdetails:[],
          sectionId: '',
          imagePath: null
           },
        answerToAdd: {
            ans_text: "",
            isCorrect: false
        },
        questionEditStatus: false,
        answerEditStatus: false,
       showAddQuestionModal: false,
       showAddAnswerModal:false,
        graphic_content: false,
        confirmDeleteAlert: false,
        modifiedAnswerIndex: null,
        deleteStatus: false,
        
        columns: [
          {
            Header: "Question Statement",
            headerClassName: "table-header-grid",
            minWidth:500,
            maxWidth:501,
            accessor: "questionText",
            show: true
          },
          {
            Header: "Section",
            accessor: "sectionId",
            minWidth:50,
            maxWidth:100,
            headerClassName: "table-header-grid",
            Cell: ({ value }) => {
              const sections = this.state.sectionToList;
              let name = null;
              sections.map(section => {
                  if(value === section._id){
                  name = section.name;
                  return;
                }
              })
              return name;
          },
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
                <a onClick={ () => this.handleQuestionEditOperation(row.original) }>Edit</a>
              </span>

            <span>
                <a onClick={() => this.handleDeleteAlert(row.original)}>Delete</a>
            </span>
                
              </div>
            )
          }
        ],
        answer_columns: [
          {
            Header: "Answer Text",
            minWidth:300,
            maxWidth:500,
            accessor: "ans_text",
            headerClassName: "table-header-grid",
            show: true
          },
          {
            Header: "Is answer?",
            accessor: "isCorrect",
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
                <a onClick={() => this.handleEditAnswer(row.original)}>Edit</a>
                </span>
                <span>
                <a onClick={() => this.handleDeleteAnswer(row.original)}>Delete</a>
                </span>
              </div>
            )
          }
        ],
        
        
      };
    
    
      /***************************** Functions****************************************************** */
    handleAddQuestionModal = () => {
      const status = !this.state.showAddQuestionModal;
      this.setState({showAddQuestionModal: status} );
    }
    handleAddAnswerModal = () => {
        const status = !this.state.showAddAnswerModal;
        
        this.setState({ showAddAnswerModal: status });
    }
   
    handleDeleteAlert = (row) => {
      const deleteStatus = !this.state.confirmDeleteAlert;
      this.setState({newQuestion: row, confirmDeleteAlert: deleteStatus}, () => console.log(this.state.newQuestion));
    }
    handleDeleteOperation = () => {
      const selectedQuestion = this.state.newQuestion;
      const id = selectedQuestion._id;
      this.setState({deleteStatus: true, loading: true});
      axios.delete(`/api/questions/${id}`)
      .then(response => {
          
          
          axios.get('/api/questions/')
          .then( response => {
            
            
              this.setState({questionsToList: response.data, deleteStatus: false, loading: false});
              this.handleDeleteAlert();
               });

      })
      .catch((error) => {
          // Error
          if (error.response) {
            this.setState({alertShowStatus: true, alertMessage: error.response.data, alertStatus: error.response.status})
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

    handleQuestionEditOperation = (row) =>{
        this.setState({newQuestion: row, questionEditStatus: true}, () => {
          console.log(this.state.newQuestion);
          console.log("\nThe value of State Edit Flag is: ");
          console.log(this.state.questionEditStatus);
        });
        this.handleAddQuestionModal();
    }
    endEditQuestion = () => {
      const newQuestion = {
    
                  questionText: '',
                  answerdetails:[],
                  sectionId: ''
                  }

      this.setState({newQuestion: newQuestion, questionEditStatus: false}, () => {
        console.log(this.state.newQuestion);
        console.log(this.state.questionEditStatus);
        this.handleAddQuestionModal();
        
      })
    }
    saveQuestion = () => {
      
      const questionToAdd = this.state.newQuestion;
      console.log(questionToAdd);
      axios.post('/api/questions', questionToAdd)
      .then(response =>{
        axios.get('/api/questions')
        .then (response => {
          const questionTemplate = {
            questionText: '',
            answerdetails:[],
            sectionId: '',
            imagePath: null
             }
          this.setState({questionsToList: response.data, newQuestion: questionTemplate});
                            this.handleAddQuestionModal();
                            });
      })
      .catch((error) => {
        // Error
        if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        this.setState({alertShowStatus: true, alertMessage: error.response.data, alertStatus: error.response.status})
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
    handleEditAnswer = (row) => {
      if(!this.state.questionEditStatus){
        const selectedAnswer = row; //Copy the answer to be edited in local variable
        let activeQuestion = this.state.newQuestion;
        const indexToDelete = activeQuestion.answerdetails.findIndex(function(element){
          return element === selectedAnswer;
        });
        // activeQuestion.answerdetails.splice(indexToDelete, 1);
      this.setState({selectedAnswer: selectedAnswer, answerEditStatus: true, modifiedAnswerIndex: indexToDelete}, () => {
        console.log(this.state.selectedAnswer);
        console.log("The index of selected answer is:  ");
        console.log(indexToDelete);
        console.log(this.state.answerEditStatus);
        this.handleAddAnswerModal();
      });
      }
      else{

      }
      return;
    }
    editSelectedAnswer = (event) => {
      const selectedAnswer = this.state.selectedAnswer;
      const name = event.target.name;
      switch(name){
        case "answerStatement":
        const description = event.target.value;
        selectedAnswer.ans_text = description;
        this.setState({answerToAdd: selectedAnswer}, () => console.log(this.state.answerToAdd));
        break;
        case "isAnswerCheckbox":
          selectedAnswer.isCorrect = !selectedAnswer.isCorrect;
          this.setState({answerToAdd: selectedAnswer}, () => console.log(this.state.answerToAdd));

        break;

        default:
      }
    }
    handleDeleteAnswer = (row) => {
      console.log(row);
    }
    /***************************** End of Functions****************************************************** */
    /*********************Conditional rendering of Uploading Graphic Content*********************************/
    showGraphicalContent = (event) => {
        const show = event.target.value;
        let question = this.state.newQuestion;
        if(show === "graphical"){
          this.setState({graphic_content: true});
        }
        else{
          question.imagePath = null;
          this.setState({graphic_content: false, newQuestion: question});
          
        }
    }
    
    fillValue = (event) => {
      const statement = event;
      const questionText = this.state.newQuestion;
      questionText.questionText = statement;
      this.setState({newQuestion: questionText}, () => {console.log(this.state.newQuestion);});
      
    }
    
    selectSection = (event) => {
      const section = event.target.value;
      const newQuestion = this.state.newQuestion;
      newQuestion.sectionId = section;
      this.setState({questionToAdd: newQuestion}, () => console.log(this.state.newQuestion));
    }
   
    addAnswerToQuestion = (event) => {
      let currentAnswer = this.state.answerToAdd;
      const name = event.target.name;
      switch(name){
        case "answerStatement":
        const description = event.target.value;
        currentAnswer.ans_text = description;
        this.setState({answerToAdd: currentAnswer}, () => console.log(this.state.answerToAdd));
        break;
        case "isAnswerCheckbox":
          currentAnswer.isCorrect = !currentAnswer.isCorrect;
          this.setState({answerToAdd: currentAnswer}, () => console.log(this.state.answerToAdd));

        break;

        default:
      }
      
    }
  
  submitNewAnswer = () => {
    const answerOption = this.state.answerToAdd;
    let question = this.state.newQuestion;
    question.answerdetails = [...question.answerdetails, answerOption];
   
    
    this.setState({questionToAdd: question,
                  answerToAdd:{ans_text: "", isCorrect:false}
                },
                () => {console.log(this.state.newQuestion.answerdetails)
                       console.log(this.state.answerToAdd)});
    
    this.handleAddAnswerModal();
  }
submitModifiedAnswer = () => {
  const answerOption = this.state.selectedAnswer;
    let question = this.state.newQuestion;
    question.answerdetails.splice(this.state.modifiedAnswerIndex,1);
    question.answerdetails = [...question.answerdetails, answerOption];
   
    
    this.setState({newQuestion: question,
                  selectedAnswer:{ans_text: "", isCorrect:false}, modifiedAnswerIndex: null
                },
                () => {console.log(this.state.newQuestion.answerdetails)
                       console.log(this.state.selectedAnswer)});
    
    this.handleAddAnswerModal();
}
  
  modifyQuestion = () => {
    const id = this.state.newQuestion._id;
    const modifiedQuestion = this.state.newQuestion;
    
    const updatedQuestion = {
      questionText: modifiedQuestion.questionText,
      answerdetails: modifiedQuestion.answerdetails.map(answer => {
                        return {ans_text: answer.ans_text,
                                isCorrect: answer.isCorrect}
                      }),
      sectionId: modifiedQuestion.sectionId,
      imagePath: modifiedQuestion.imagePath
    }
    console.log(updatedQuestion);
    axios.put(`/api/questions/${id}`, updatedQuestion)
    .then( response => {
      this.setState({questionEditStatus: false});
      this.handleAddQuestionModal();
      axios.get('/api/questions/')
      .then(response => this.setState({questionsToList: response.data}));
    })
    .catch((error) => {
      // Error
      if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      this.setState({alertShowStatus: true, alertMessage: error.response.data, alertStatus: error.response.status})
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
  addAnswerinEdit = () => {
    const answerOption = this.state.answerToAdd;
    let question = this.state.newQuestion;
    question.answer = [...question.answer, answerOption];
   
    
    this.setState({selectedQuestion: question,
                  answerToAdd:{answer: "", isCorrect:false}
                },
                () => {console.log(this.state.newQuestion.answerdetails)
                       console.log(this.state.answerToAdd)});
    
    this.handleAnswerModalInEdit();
  
  }
  handleAlertClose = () => {
    const status = !this.state.alertShowStatus;
    this.setState({alertShowStatus: status});
  }
  fileSelectedHandler = (event) => {
    let question = this.state.newQuestion;
    question.imagePath = event.target.files[0] ;
    this.setState({newQuestion: question}, () => {console.log(this.state.newQuestion);});
  }
    render(){
      const editStatus = this.state.questionEditStatus;
        return(
            <Aux>
                {this.state.loading ? 
                  <Backdrop>
                    <Spinner/>
                  </Backdrop>:
                  <Aux>
                    <Alert show= {this.state.alertShowStatus} handleClose= {this.handleAlertClose} status={this.state.alertStatus} message={this.state.alertMessage}/>
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
                            <a onClick={this.handleAddQuestionModal}>  Add a new question</a>
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

<Modal show={this.state.showAddQuestionModal} onHide={this.endEditQuestion} >
          <Modal.Header closeButton>
            <Modal.Title>{this.state.questionEditStatus ? "Edit Question" : "Add Question"}</Modal.Title>
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
                        value={this.state.deleteStatus ? "" : this.state.newQuestion.questionText}
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
                          <option value={""}>Select</option>
                          {this.state.sectionToList.map(section => {
                            return <option selected={editStatus ? section._id === this.state.newQuestion.sectionId ?
                            true : false : false } value={section._id}  key={section._id}>{section.name}</option>
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
    
                        <input type="file" name="file" onChange={this.fileSelectedHandler} hidden/>
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
                  <Button onClick={this.handleAddAnswerModal} bsClass="xavor-style">Add Answer</Button>
                </div>
                </div>
                 {/*********************** Answers Table***************************************/}
                 <div className="row ">
                 <div className="col-md-12 answer-table">
                 
                 <ReactTable
                  data={this.state.newQuestion.answerdetails}
                   className="table-grid" 
                   minRows={5} 
                   showPagination={false}
                    columns={this.state.answer_columns} />
                 </div>
               
             </div>
             {/*********************** Save Button***************************************/}
             <div className="row">
              <div className="col-md-12 save-answer">
              {editStatus ?
                <Button bsClass="xavor-style" onClick={this.modifyQuestion}>Modify</Button> :
                <Button bsClass="xavor-style" onClick={this.saveQuestion}>Save</Button>
              }
              </div>
             </div>
              
            </div>
            </Modal.Body>
            </Modal>


        {/*****************************End of Add Question Modal*************************************************/}


        {/****************************Add Add Answer Modal***********************************************************/}
            <Modal show={this.state.showAddAnswerModal} onHide={this.handleAddAnswerModal} >
              <Modal.Header closeButton>
                <Modal.Title>{this.state.answerEditStatus ? "Edit Answer" : "Add Answer"}</Modal.Title>
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
                                value= {this.state.answerEditStatus ? this.state.selectedAnswer.ans_text : 
                                        this.state.answerToAdd.ans_text}
                                placeholder="Please Specify"
                                onChange = {this.state.answerEditStatus ? this.editSelectedAnswer
                                             :  this.addAnswerToQuestion}
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
                    
                    
                      <Button bsClass="xavor-style" onClick={this.state.answerEditStatus ? this.submitModifiedAnswer: 
                                                              this.submitNewAnswer}>Save</Button>
                    
                        
                    </div>
                </div>
              </Modal.Body>
            </Modal>
        {/*********************************End of Add Answer Modal*****************************************/}


        {/**********************************************Confirm Delete Modal**************************************************/}
      <Modal show={this.state.confirmDeleteAlert} onHide={this.handleDeleteAlert}>
                                <Modal.Header closeButton>
                                    <Modal.Title><b>Confirm Delete?</b></Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    
                                    <div className="row">
                                        <div className="col-md-12">
                                        <p>Are you sure you want to delete this Question?</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                    <div className="col-md-12">
                                    <Button bsClass="normal-style-small" onClick={this.handleDeleteAlert}>No</Button>
                                    <Button bsClass="xavor-style-small" onClick={this.handleDeleteOperation}>Yes</Button>
                                    </div>
                                    </div>
                                </Modal.Body>
                                
                            </Modal>
{/**********************************************End of Confirm Delete Modal**************************************************/}
     
     </Aux>
                }
</Aux>
        );
    }
}

export default ManageQuestion;