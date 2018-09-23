import React, { Component } from 'react';

import { Button, TextField, Checkbox, FormControlLabel } from '@material-ui/core';

class GiveQuiz extends Component {

    constructor() {
        super();

        this.state = {
            data : []
        };
    }

    componentWillReceiveProps() {
        this.setState({
            data : this.props.quizData
        });
    }

    checkAnswers = () => {
        let arr = this.state.data;
        for (var i = 0; i < arr.length; i++) {
            //console.log(arr[i]);
            let ans1 = document.getElementById("opt1_" + arr[i].id);
            let ans2 = document.getElementById("opt2_" + arr[i].id);
            let ans3 = document.getElementById("opt3_" + arr[i].id);
            let ans4 = document.getElementById("opt4_" + arr[i].id);
            //console.log(ans1.checked, ans2.checked, ans3.checked, ans4.checked);

            var correct = false;

            if (ans1.checked === arr[i].option1ans && ans2.checked === arr[i].option2ans && ans3.checked === arr[i].option3ans && ans4.checked === arr[i].option4ans)
            {
                correct = true;
            }

            console.log(correct);
        }
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
                            <tr key={key}>
                                <td>{item.question}</td>
                                <td className={'answers' + item.id}>
                                <FormControlLabel control={
                                    <Checkbox id={'opt1_' + item.id } />
                                } label={item.option1text} />
                                <FormControlLabel control={
                                    <Checkbox id={'opt2_' + item.id } />
                                } label={item.option2text} />
                                <FormControlLabel control={
                                    <Checkbox id={'opt3_' + item.id } />
                                } label={item.option3text} />
                                <FormControlLabel control={
                                    <Checkbox id={'opt4_' + item.id } />
                                } label={item.option4text} />
                                </td>

                            </tr>
                        )
                    })}
                    <tr>
                        <td></td>
                        <td><Button onClick={this.checkAnswers} variant="extendedFab" color="secondary">Check Answers</Button></td>
                        <td></td>
                    </tr>
                </tbody>
                </table>
                
            </div>
        )
    }
}

export default GiveQuiz;