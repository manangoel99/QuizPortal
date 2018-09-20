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
                    + '<td>' + (this.state.question_num + 1) + '</td>'
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

        this.clearall();

    }

    handleAddQuiz = () => {

        let quiz_name = document.getElementsByName('EnterQuizName')[0].value;

        let genre = document.getElementsByName('genre')[0].value;

        for (var i = 1; i <= this.state.question_num; i++) {

            var obj = {};
            obj.question = document.getElementsByName('prob_statement_' + i)[0].value;
            obj.option1text = document.getElementsByName('option1' + i)[0].value;
            obj.option2text = document.getElementsByName('option2' + i)[0].value;
            obj.option3text = document.getElementsByName('option3' + i)[0].value;
            obj.option4text = document.getElementsByName('option4' + i)[0].value;

            obj.option1ans = document.getElementsByName('option1ans' + i)[0].checked;
            obj.option2ans = document.getElementsByName('option2ans' + i)[0].checked;
            obj.option3ans = document.getElementsByName('option3ans' + i)[0].checked;
            obj.option4ans = document.getElementsByName('option4ans' + i)[0].checked;
            obj.quizname = quiz_name;
            obj.genre = genre;
            obj.question_number = i;

            console.log(obj);

            fetch('http://localhost:8080/AddQuestion', {
                method : 'POST',
                body : JSON.stringify(obj)
            }).then(response => {
                console.log(response);
                if (response.status == 404) {
                    alert('Quiz With Same Name Exists. Please Change The Name');
                } 
            });
            
        }
    }

    clearall = () => {
        document.getElementById('EnterQuestion').value = '';
        document.getElementById('EnterOption1Text').value = '';
        document.getElementById('EnterOption2Text').value = '';
        document.getElementById('EnterOption3Text').value = '';
        document.getElementById('EnterOption4Text').value = '';
        document.getElementById('CorrectOption1').checked = false;
        document.getElementById('CorrectOption2').checked = false;
        document.getElementById('CorrectOption3').checked = false;
        document.getElementById('CorrectOption4').checked = false;
    }

    render() {
        return (
            <div>
                <div className="container">
                    <TextField name="EnterQuizName" placeholder="Enter Quiz Name" label="Enter Quiz Name" onChange={this.handleChange}/><br />
                    <TextField name="genre" placeholder="Enter Genre" label="Enter Genre" onChange={this.handleChange}/><br />
                    <TextField id="EnterQuestion" name="EnterQuestion" placeholder="Enter Question" label="Enter Question" onChange={this.handleChange}/><br />
                    <TextField id="EnterOption1Text" name="EnterOption1Text" placeholder="Enter Option 1" label="Enter Option 1" onChange={this.handleChange}/>
                    <Radio color="primary" id="CorrectOption1" name="CorrectOption1" onChange={this.handleChange} /><br />
                    <TextField name="EnterOption2Text" id="EnterOption2Text" placeholder="Enter Option 2" label="Enter Option 2" onChange={this.handleChange}/>
                    <Radio color="primary" id="CorrectOption2" name="CorrectOption2" onChange={this.handleChange} /><br />
                    <TextField name="EnterOption3Text" id="EnterOption3Text" placeholder="Enter Option 3" label="Enter Option 3" onChange={this.handleChange}/>
                    <Radio color="primary" name="CorrectOption3" id="CorrectOption3" onChange={this.handleChange} /><br />
                    <TextField name="EnterOption4Text" id="EnterOption4Text" placeholder="Enter Option 4" label="Enter Option 4" onChange={this.handleChange}/>
                    <Radio color="primary" id="CorrectOption4" name="CorrectOption4" onChange={this.handleChange} /><br />
                    <Button variant="contained" color="secondary" onClick={this.handleAdd}>Add Question</Button>
                </div>
                <br />
                <div className="container">
                    <table className="table table-responsive table-striped table-dark">
                    <thead>
                        <tr>
                            <th>Question Number</th>
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
                    <Button color="primary" variant="contained" onClick={this.handleAddQuiz}>Add Quiz</Button>
                </div>
            </div>
        )
    }
}

export default Quiz;