import React, { Component } from 'react';

import { Button, TextField } from '@material-ui/core';

class GiveQuiz extends Component {

    constructor() {
        super();

        this.state = {
            data : []
        };
    }

    componentDidMount() {
        let id = this.props.quizID

        fetch("http://localhost:8080/QuizQues/" + id, {
            method : 'GET'
        })
        .then((response) => response.json())
        .then((json) => {
            console.log(json.question_arr);
            this.setState({
                data : json.question_arr,
            });
        });
    }

    render() {
        return (
            <div>
                {this.state.data.map((item, key) => {
                    return (
                        <tr>{item.question}</tr>
                    )
                })}
            </div>
        )
    }
}

export default GiveQuiz;