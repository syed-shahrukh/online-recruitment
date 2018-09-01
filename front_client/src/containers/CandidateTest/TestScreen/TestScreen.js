import React, { Component } from 'react';
import Aux from '../../Auxilary/Auxilary';
import axios from 'axios';
import './TestScreen.css';
import { FormGroup, Checkbox, Button } from 'react-bootstrap';
import Backdrop from 'react-backdrop';
import Spinner from '../../../UI/Spinner/Spinner';
import ReactHtmlParser from 'react-html-parser';
import Navbar from '../../Navbar/Navbar';
import { Link } from 'react-router-dom';
import ReactCountdownClock from 'react-countdown-clock';


class TestScreen extends Component {


    constructor(props) {
        super(props);
        this.saveProgress = this.saveProgress.bind(this);
        this.answerCheck = this.answerCheck.bind(this);
    }


    state = {
        ...this.props.location.state,
        question: "",
        options: [],
        loading: true,
        candidatesQuestionsQueue: [],
        candidateName: 'Syed Muhammad Shahrukh',
        attemptedQuestion: {}, // Create object before saving it
        userChoice: [], //Answers that user Selects
    };


    componentWillMount() {
        
        if(this.state.candidatesQuestionsQueue.length === 0 ){
            this.getNextQuestion();
        }
        console.log(this.state);
        
    };

    getNextQuestion = () => {
        if(this.state.candidatesQuestionsQueue.length === this.state.sectionQuestions) {
            console.log("Change SECTION!!!!");
            this.props.history.push({
                pathname:"/candidate-test/break",
                state:{ activeUser: this.state.activeUser, currentSection: this.state.currentSection,
                    sections: this.state.sections,
                    masterTimer: this.state.masterTimer
                }
            });
        }
        const questionToGet = {
            sectionId: this.state.currentSection._id,
            questionQueue: this.state.candidatesQuestionsQueue
        }
        
        axios.post('/api/test', questionToGet ).then(response =>{
            let questionsQueue = this.state.candidatesQuestionsQueue;
            let attemptedQuestion = this.state.attemptedQuestion;
            attemptedQuestion.userId = this.state.activeUser;
            attemptedQuestion.sectionId = response.data.sectionId;
            attemptedQuestion.questionId = response.data._id;
            console.log(response.data);
            questionsQueue.push(response.data._id);
            this.setState({ 
                            candidatesQuestionsQueue: questionsQueue,
                            question: response.data.questionText,
                            options: response.data.answerdetails,
                            attemptedQuestion: attemptedQuestion,
                            loading: false

            
                            }, () => console.log(this.state));
            
        })
    }

    saveProgress() {
        this.setState({loading: true});
        const answers = this.state.options;
        const question = this.state.question;
        let attemptedQuestion = this.state.attemptedQuestion;
        let answerId = [];

        for (let i = 0; i < answers.length; i++) {
            if (answers[i].isCorrect) {
                console.log("Inside Correct");
                answerId.push(answers[i]._id);
            }
        };

        const userChoice = this.state.userChoice;
        const isCorrect = this.answerCheck(answerId, userChoice);
        attemptedQuestion.questionText = question;
        attemptedQuestion.options = answers;
        attemptedQuestion.answers = answerId;
        attemptedQuestion.userChoice = userChoice;
        attemptedQuestion.isCorrect = isCorrect;

        axios.post('/api/result/savequestion', attemptedQuestion).
        then(response => {
            const userChoice = [];
            this.setState({userChoice: userChoice});
            this.getNextQuestion();
        })
    }


    answerCheck = (answers, choices) => {
        let answerCount = 0;
        if (answers.length !== choices.length) {
            return false;
        }
        for (let i = 0; i < choices.length; i++) { //Outer Loop for Choices
            
            for (let j =0; j < answers.length; j++){
                if(choices[i] === answers[j]) {
                    answerCount++;
                }

            }
            // Check if array elements are equal
            
        }
        if(answerCount === answers.length){
            return true;
        }
        else{
            return false;
        }

    }
    timeOver = () => {
        this.props.history.push({
            pathname:"/candidate-test/test-completed"
        });
    }

    selectAnswer = (event) => {
        const answers = this.state.userChoice;
        const newOption = event.target.id;
        console.log(newOption);
        const exists = answers.findIndex(value => value === newOption);
        if (exists >= 0) {
            answers.splice(exists, 1); //Delete from array if option was previously selected
        }
        else {
            answers.push(newOption);
        }
        this.setState({ userChoice: answers }, () => {
            console.log(this.state.userChoice);
        });
    }


    render() {
        const timer = this.state.masterTimer;
        const question = ReactHtmlParser(this.state.question);
    
        const answers = this.state.options;
        
        const options = answers.map(answer => {
            return (
                <Checkbox key={answer.id} name="radioGroup" id={answer._id} checked={this.state.userChoice.findIndex(value => value === answer._id) >= 0 ? true : false} onClick={this.selectAnswer}>
                    {answer.ans_text}
                </Checkbox>);
        });
        
         const currentQuestion = this.state.candidatesQuestionsQueue.length;

        return (
            <Aux>
                {this.state.loading ? 
                <Backdrop>
                    <Spinner/>
                </Backdrop>    
            :
            <Aux>

            
                <Navbar title="">
                    <div className="greeting-statement">
                        <span><b>{this.state.candidateName}</b></span>
                        <Link to="/"><i className="fas fa-sign-out-alt"></i></Link>
                    </div>
                </Navbar>
                <div className="question-timer">
                    <div className="question-number">
                        <h3>Question {currentQuestion}/60</h3>


                    </div>

                    <div className="test-timer">
                    <ReactCountdownClock seconds={timer}
                     color="#f4c12b"
                     timeFormat="hms"
                     alpha={0.9}
                     size={70}
                     onComplete={this.timeOver} />
                    </div>
                </div>

                <div className="test-window">
                    <div className="statement-and-timer">
                        <div className="test-question-statement">
                            <h4>{question}</h4>
                        </div>
                    </div>
                    <div className="question-options">

                        <FormGroup>
                            {options}
                         
                        </FormGroup>
                    </div>
                    {/****************************************Next Question Button************************************************/}
                    <div className="next-question-button-container">
                        <Button onClick={this.saveProgress} bsClass="xavor-style">Next</Button>
                    </div>
                    {/*********************************End of Next Question Button************************************************/}
                </div>
                </Aux>
            }
            </Aux>

        );
    }
}

export default TestScreen;