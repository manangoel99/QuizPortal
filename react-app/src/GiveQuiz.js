import React, { Component } from 'react';

import { Button, Checkbox, FormControlLabel } from '@material-ui/core';

class GiveQuiz extends Component {

    constructor() {
        super();

        this.state = {
            data : [],
            score : 0
        };
    }

    componentWillReceiveProps() {
        this.setState({
            data : this.props.quizData,
            score : 0
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

    render() {
        return (
            <div className="container">
                <table className="table table-dark table-hover table-responsive">
                <thead>
                    <tr>
                        <th>
                            Question
                        </th>
                        <th>
                            Options
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