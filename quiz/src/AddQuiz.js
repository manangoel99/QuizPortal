import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import Radio from '@material-ui/core/Radio'

class Quiz extends Component {
    constructor() {
        super();
        this.state = {
            EnterQuizName : '',
            EnterQuestion : '',
            CorrectOption1 : false,
            CorrectOption2 : false,
            CorrectOption3 : false,
            CorrectOption4 : false,
            EnterOption1Text : '',
            EnterOption2Text : '',
            EnterOption3Text : '',
            EnterOption4Text : '',
            answers : '',
            question_num : 0,
            genre : ''
        }
    }

    handleChange = (e) => {
        //this.setState({
        //    [e.target.name] : e.target.value
        //});
        //console.log(e.target.checked);
        if (e.target.name.startsWith('Correct')) {
            //console.log(e.target.checked);
            this.setState({
                [e.target.name] : e.target.checked
            });
        }
        else {
            this.setState({
                [e.target.name] : e.target.value
            });
        }
    }

    handleAdd = () => {
        this.setState({
            question_num : this.state.question_num + 1
        });
        var child = '<tr id="question' + (this.state.question_num + 1) + '">'
                    + '<td><input name="prob_statement_' + (this.state.question_num + 1) + '" value="' + this.state.EnterQuestion + '" /><br /></td>'
                    + '<td><input name="option1' + (this.state.question_num + 1) + '" value="' + this.state.EnterOption1Text + '"/></td>';

        if (this.state.CorrectOption1 === true) {
            child += '<td><input type="radio" name="option1ans' + (this.state.question_num + 1) + '" checked /></td>';
        }
        else {
            child += '<td><input type="radio" name="option1ans' + (this.state.question_num + 1) + '"/></td>';
        }

        child = child + '<td><input name="option2' + (this.state.question_num + 1) + '" value="' + this.state.EnterOption2Text + '"/></td>';
        
        if (this.state.CorrectOption2 === true) {
            child += '<td><input type="radio" name="option2ans' + (this.state.question_num + 1) + '" checked /></td>';
        } 
        else {
            child += '<td><input type="radio" name="option2ans' + (this.state.question_num + 1) + '"/></td>';
        }

        child += '<td><input name="option3' + (this.state.question_num + 1) + '" value="' + this.state.EnterOption3Text + '"/></td>';
        
        if (this.state.CorrectOption3 === true) {
            child += '<td><input type="radio" name="option3ans' + (this.state.question_num + 1) + '" checked /></td>';
        }
        else {
            child += '<td><input type="radio" name="option3ans' + (this.state.question_num + 1) + '"/></td>';
        }

        child += '<td><input name="option4' + (this.state.question_num + 1) + '" value="' + this.state.EnterOption4Text + '"/></td>';

        if (this.state.CorrectOption4 === true) {
            child += '<td><input type="radio" name="option4ans' + (this.state.question_num + 1) + '" checked /></td>';
        }
        else {
            child += '<td><input type="radio" name="option4ans' + (this.state.question_num + 1) + '"/></td>';
        }
                    //+ '<td><input type="radio" name="option4ans' + (this.state.question_num + 1) + '" checked="' + this.state.CorrectOption4 + '"></td>'
        child += '</tr>';

        //console.log(child);
        document.getElementById('question_list').innerHTML += child;
        console.log(document.getElementById('question_list').innerHTML);

        this.setState({
            EnterQuestion : '',
            CorrectOption1 : false,
            CorrectOption2 : false,
            CorrectOption3 : false,
            CorrectOption4 : false,
            EnterOption1Text : '',
            EnterOption2Text : '',
            EnterOption3Text : '',
            EnterOption4Text : '',
        });

    }

    render() {
        return (
            <div>
                <div className="container">
                    <TextField name="EnterQuizName" placeholder="Enter Quiz Name" label="Enter Quiz Name" onChange={this.handleChange}/><br />
                    <TextField name="genre" placeholder="Enter Genre" label="Enter Genre" onChange={this.handleChange}/><br />
                    <TextField name="EnterQuestion" placeholder="Enter Question" label="Enter Question" onChange={this.handleChange}/><br />
                    <TextField name="EnterOption1Text" placeholder="Enter Option 1" label="Enter Option 1" onChange={this.handleChange}/>
                    <Radio color="primary" name="CorrectOption1" onChange={this.handleChange} /><br />
                    <TextField name="EnterOption2Text" placeholder="Enter Option 2" label="Enter Option 2" onChange={this.handleChange}/>
                    <Radio color="primary" name="CorrectOption2" onChange={this.handleChange} /><br />
                    <TextField name="EnterOption3Text" placeholder="Enter Option 3" label="Enter Option 3" onChange={this.handleChange}/>
                    <Radio color="primary" name="CorrectOption3" onChange={this.handleChange} /><br />
                    <TextField name="EnterOption4Text" placeholder="Enter Option 4" label="Enter Option 4" onChange={this.handleChange}/>
                    <Radio color="primary" name="CorrectOption4" onChange={this.handleChange} /><br />
                    <Button variant="contained" color="secondary" onClick={this.handleAdd}>Add Question</Button>
                </div>
                <div className="container">
                    <table className="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th>Question</th>
                            <th>Option 1</th>
                            <th>Answer Or Not</th>
                            <th>Option 2</th>
                            <th>Answer Or Not</th>
                            <th>Option 3</th>
                            <th>Answer Or Not</th>
                            <th>Option 4</th>
                            <th>Answer Or Not</th>
                        </tr>
                    </thead>
                    <tbody id="question_list">

                    </tbody>

                    </table>

                </div>
            </div>
        )
    }
}

export default Quiz;