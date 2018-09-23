import React, { Component } from 'react';

import { Button, TextField } from '@material-ui/core';

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