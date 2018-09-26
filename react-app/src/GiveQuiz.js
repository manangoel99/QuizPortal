import React, { Component } from 'react';

import { Button, Checkbox, FormControlLabel } from '@material-ui/core';

class GiveQuiz extends Component {

    constructor() {
        super();

        this.state = {
            data : [],
            score : 0,
            lifelineused : false
        };
    }

    componentWillReceiveProps() {
        this.setState({
            data : this.props.quizData,
            score : 0,
            lifelineused : false
        });

        let lis = document.getElementsByClassName("checkboxes");

        for (var i = 0; i < lis.length; i++) {
            lis[i].checked = false;
        }
    }

    checkAnswers = () => {

        let score = 0;
        let max_score = 0

        let arr = this.state.data;
        for (var i = 0; i < arr.length; i++) {
            max_score += 1
            let ans1 = document.getElementById("opt1_" + arr[i].id);
            let ans2 = document.getElementById("opt2_" + arr[i].id);
            let ans3 = document.getElementById("opt3_" + arr[i].id);
            let ans4 = document.getElementById("opt4_" + arr[i].id);

            var correct = false;

            if (ans1.checked === arr[i].option1ans && ans2.checked === arr[i].option2ans && ans3.checked === arr[i].option3ans && ans4.checked === arr[i].option4ans)
            {
                correct = true;
                score += 1
            }
        }

        this.setState({
            score : score
        });

        document.getElementById("Score").innerHTML = "Your Score is " + score + " out of " + max_score;

    }

    handleSubmit = () => {

        let user = JSON.parse(localStorage.getItem("user")).username;

        fetch ("http://localhost:8080/SubmitQuiz/" + this.props.quizID + '/' + user + '/' + this.state.score, {
            method : "POST"
        })
        .then(response => response.json())
        .then(json => {
            console.log(json);
        });

        window.location.reload();
    }

    UseExpert = (e) => {
        if (this.state.lifelineused === false) {

            let question = {};

            for (var i = 0; i < this.state.data.length; i++) {
                if (this.state.data[i].id == e.target.id) {
                    question = this.state.data[i];
                }
            }
            //console.log(question);

            let correctans = 0;

            if (question.option1ans === true) {
                correctans = 1;
            }
            else if (question.option2ans === true) {
                correctans = 2;
            }
            else if (question.option3ans === true) {
                correctans = 3;
            }
            else if (question.option4ans === true) {
                correctans = 4;
            }

            document.getElementById('opt' + correctans + '_' + e.target.id).click();
            
            this.setState({
                lifelineused : true,
                score : this.state.score - 0.5
            });

        }
        else {
            alert("Life Line Used");
        }
    }

    handle50 = (e) => {
        let id = e.target.id.replace('50_', '')

        if(this.state.lifelineused === false) {
            let question = {};

            for (var i = 0; i < this.state.data.length; i++) {
                if (this.state.data[i].id == id) {
                    question = this.state.data[i];
                }
            }
            //console.log(question);
            if ((question.option1ans === true 
                && question.option2ans === false 
                && question.option3ans === false 
                && question.option4ans === false)) {
                    document.getElementById("opt" + 2 + "_" + id).style.display = "none";
                    document.getElementById("opt" + 4 + "_" + id).style.display = "none";

                    alert(question['option' + 2 + 'text'] + ' and ' + question['option' + 4 + 'text'] + " are incorrect");
            } 
            else if (question.option2ans === true &&
                question.option1ans === false &&
                question.option3ans === false &&
                question.option4ans === false) {
                    alert(question['option' + 1 + 'text'] + ' and ' + question['option' + 4 + 'text'] + " are incorrect");
            }
            else if (question.option3ans === true &&
                question.option2ans === false &&
                question.option1ans === false &&
                question.option4ans === false) {
                    alert(question['option' + 1 + 'text'] + ' and ' + question['option' + 2 + 'text'] + " are incorrect");
            }

            else if (question.option4ans === true &&
                question.option2ans === false &&
                question.option3ans === false &&
                question.option1ans === false) {
                    alert(question['option' + 1 + 'text'] + ' and ' + question['option' + 3 + 'text'] + " are incorrect");
            }
            else {
                alert("50 : 50 can't be used on this question but you've lost the lifeline and the score :P");
            }

            this.setState({
                lifelineused : true,
                score : this.state.score - 0.25
            });

        }
        else {
            alert("Life Line Used");
        }

    }

    render() {
        return (
            <div className="container">
            <h5>
                Expert Advice will give you one of the correct options but 0.5 will be deducted from the total score. Use Wisely!
            </h5>
            <br />
            <h5>
                50 : 50 is applicable to only questions with one option correct and will cause a deduction of 0.25 from the total score. Use Wisely!
            </h5>
            <br />
            <h5>
                Only <strong>One</strong> LifeLine can be used in the quiz
            </h5>
                <table className="table table-dark table-hover table-responsive">
                <thead>
                    <tr>
                        <th>
                            Question
                        </th>
                        <th>
                            Options
                        </th>
                        <th>
                            Expert Advice
                        </th>
                        <th>
                            50 : 50
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.data.map((item, key) => {
                        return (
                            <tr id={'ques_row_' + item.id} key={key}>
                                <td>{item.question}</td>
                                <td className={'answers' + item.id}>
                                <FormControlLabel control={
                                    <Checkbox className="checkboxes" id={'opt1_' + item.id } />
                                } label={item.option1text} />
                                <FormControlLabel control={
                                    <Checkbox className="checkboxes" id={'opt2_' + item.id } />
                                } label={item.option2text} />
                                <FormControlLabel control={
                                    <Checkbox className="checkboxes" id={'opt3_' + item.id } />
                                } label={item.option3text} />
                                <FormControlLabel control={
                                    <Checkbox className="checkboxes" id={'opt4_' + item.id } />
                                } label={item.option4text} />
                                </td>
                                <td><Button onClick={(e) => this.UseExpert(e)} variant="raised" color="primary" id={item.id}>Use Expert Advice</Button></td>
                                <td><Button onClick={(e) => this.handle50(e)} variant="raised" color="primary" id={'50_' + item.id}>Use 50:50</Button></td>

                            </tr>
                        )
                    })}
                    <tr>
                        <td></td>
                        <td>
                            <Button onClick={this.checkAnswers} variant="extendedFab" color="secondary">Check Answers</Button>
                            <Button onClick={this.handleSubmit} variant="extendedFab" color="secondary">Submit</Button>
                        </td>
                        <td></td>
                    </tr>
                </tbody>
                </table>
                <div id="Score"></div>
                
            </div>
        )
    }
}

export default GiveQuiz;