import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

class EditQuiz extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            quiz_num: NaN,
            quiz_selected: false,
            spec_quiz_data: [],
            attempted: [],
            scores: []
        };
    }

    componentDidMount() {

        let username = JSON.parse(localStorage.getItem('user')).username;

        const request = new Request("http://localhost:8080/All_Quizes/" + username);
        fetch(request, {
            method : "GET"
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);

            let attempted_id = [];
            let score_dict = {};

            for (var i = 0; i < data.attempted.length; i++) {
                //console.log(data.attempted[i].QuizID);
                attempted_id.push(data.attempted[i].QuizID);
                score_dict[data.attempted[i].QuizID] = data.attempted[i].Score;
            }
            console.log(attempted_id);
            this.setState({
                data : data.quizes,
                attempted : attempted_id,
                scores : score_dict,
            });
        });
    }

    EditQuiz = (e) => {
        let id = e.target.id;

        fetch("http://localhost:8080/EditQuizFetch/" + id, {
            method : "GET"
        })
        .then(response => response.json())
        .then(json => {
            let arr = []
            this.setState({
                spec_quiz_data : json.question_arr,
            });
            //console.log(json);
            arr = json.question_arr;

            let body = document.getElementById("TableBody");
            console.log(arr);
            body.innerHTML = '';

            arr.map((item) => {
                var child = '<tr id="question' + item.id + '">' +
                    '<td><input name="prob_statement_' + item.id + '" value="' + item.question + '" /><br /></td>' +
                    '<td><input name="option1' + item.id + '" value="' + item.option1text + '"/></td>';

                if (item.option1ans === true) {
                    child += '<td><input type="checkbox" name="option1ans' + item.id + '" checked /></td>';
                } else {
                    child += '<td><input type="checkbox" name="option1ans' + item.id + '"/></td>';
                }

                child = child + '<td><input name="option2' + item.id + '" value="' + item.option2text + '"/></td>';

                if (item.option2ans === true) {
                    child += '<td><input type="checkbox" name="option2ans' + item.id + '" checked /></td>';
                } else {
                    child += '<td><input type="checkbox" name="option2ans' + item.id + '"/></td>';
                }

                child += '<td><input name="option3' + item.id + '" value="' + item.option3text + '"/></td>';

                if (item.option3ans === true) {
                    child += '<td><input type="checkbox" name="option3ans' + (item.id) + '" checked /></td>';
                } else {
                    child += '<td><input type="checkbox" name="option3ans' + (item.id) + '"/></td>';
                }

                child += '<td><input name="option4' + item.id + '" value="' + item.option4text + '"/></td>';

                if (item.option4ans === true) {
                    child += '<td><input type="checkbox" name="option4ans' + item.id + '" checked /></td>';
                } else {
                    child += '<td><input type="checkbox" name="option4ans' + item.id + '"/></td>';
                }

                child += '<td><input type="checkbox" name="Delete_' + item.id + '"></td>'
                //+ '<td><input type="checkbox" name="option4ans' + (this.state.question_num + 1) + '" checked="' + this.state.CorrectOption4 + '"></td>'
                child += '</tr>';

                body.innerHTML += child;

            });


        });
    }


    DeleteQuiz = (e) => {
        e.preventDefault();
        console.log(e.target.id);
        let id = e.target.id.replace("Delete_", "");
        const request = new Request("http://localhost:8080/DeleteQuiz/" + id);
        //console.log(id);
        fetch(request, {
          method: 'DELETE'
        })
        .then(response => response.json());
    }

    handleEdit = () => {
        this.state.spec_quiz_data.map((item) => {

            var obj = {}
            obj.id = item.id;
            obj.quizname = item.quizname;
            obj.genre = item.genre;
            obj.question = document.getElementsByName("prob_statement_" + item.id)[0].value;
            obj.option1text = document.getElementsByName('option1' + item.id)[0].value;
            obj.option2text = document.getElementsByName('option2' + item.id)[0].value;
            obj.option3text = document.getElementsByName('option3' + item.id)[0].value;
            obj.option4text = document.getElementsByName('option4' + item.id)[0].value;
            obj.question_number = item.question_number;
            obj.option1ans = document.getElementsByName('option1ans' + item.id)[0].checked;
            obj.option2ans = document.getElementsByName('option2ans' + item.id)[0].checked;
            obj.option3ans = document.getElementsByName('option3ans' + item.id)[0].checked;
            obj.option4ans = document.getElementsByName('option4ans' + item.id)[0].checked;

            console.log(obj);

            fetch("http://localhost:8080/EditQuestion", {
                method : "POST",
                body : JSON.stringify(obj)
            })
            .then(response => response.json())
            .then(json => {
                console.log(json);
            });
            //console.log(question);
        })

        this.state.spec_quiz_data.map((item) =>{
            let x = document.getElementsByName("Delete_" + item.id)[0];
            if (x.checked === true) {
                fetch("http://localhost:8080/DeleteQues/" + item.id, {
                    method: "DELETE",
                })
                .then(response => response.json())
                .then(json => {
                    console.log(json);
                });
            }
        });

        setTimeout(function() {
            window.location.reload();
        }, 5000);
        //window.location.reload();
    }

    render() {
        return (
            <div>
                <div className="container">
                    <header>
                        <h1>All Quizzes</h1>
                    </header>
                    <table className="table table-responsive table-dark table-hover">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Genre</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data.map((item, key) => {
                                    return (
                                        <tr key={key}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.genre}</td>
                                            <td><Button id={item.id} onClick={e => this.EditQuiz(e)} variant="raised" color="primary">Edit Quiz</Button></td>
                                            <td><Button id={'Delete_' + item.id} onClick={e => this.DeleteQuiz(e)} variant="extendedFab" color="secondary">Delete</Button></td>

                                        </tr>
                                    )
                            })}
                            
                        </tbody>
                    </table>
                    <div>
                        {/*(this.state.spec_quiz_data.length === 0) ? null : <Edit quizData={this.state.spec_quiz_data} /> */}
                        <table className="table table-responsive table-hover table-dark">
                            <thead>
                                <tr>
                                    <td>Questions</td>
                                    <td colSpan="8">Options</td>
                                    <td>Delete Question</td>
                                </tr>
                            </thead>
                            <tbody id="TableBody">

                            </tbody>
                        </table>
                        <center>
                            <Button onClick={this.handleEdit} variant="extendedFab" color="primary">Submit Changes</Button>
                        </center>
                    </div>
                </div>
            </div>
        )
    }
}


export default EditQuiz;