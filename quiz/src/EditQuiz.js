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
            this.setState({
                quiz_selected : true,
                quiz_num : [e.target.id],
                spec_quiz_data : json.question_arr,
            });
            console.log(json);
        });

        this.setState({
            quiz_selected: true,
            quiz_num: e.target.id
        });

        console.log(this.state.spec_quiz_data);
        console.log(this.state.quiz_num);
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
                        {/*this.state.quiz_selected ? <QuizTable quizID={this.state.quiz_num} quizData={this.state.spec_quiz_data} /> : null*/}
                    </div>
                </div>
            </div>
        )
    }
}

export default EditQuiz;