import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import GiveQuiz from './GiveQuiz';
class All_Quizes extends Component {
    constructor() {
        super();
        this.state = {
            data : [],
            quiz_num : NaN,
            quiz_selected : false,
            spec_quiz_data : [],
            attempted : [],
            scores : []
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

    OpenQuiz = (e) => {
        console.log(e.target);
        let id = e.target.id;
        fetch("http://localhost:8080/QuizQues/" + id, {
            method : 'GET'
        })
        .then((response) => response.json())
        .then(json => {
            this.setState({
                spec_quiz_data : json.question_arr
            });
        });

        this.setState({
            quiz_selected : true,
            quiz_num : e.target.id
        });

        if (document.getElementById("Score")) {
            document.getElementById("Score").innerHTML = "";
        }

        console.log(this.state.spec_quiz_data);
        console.log(this.state.quiz_num);
        //this.forceUpdate();
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
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data.map((item, key) => {
                                //console.log(this.state.attempted.includes(item.id.toString()));
                                //console.log(item.id);
                                if (!this.state.attempted.includes(item.id.toString())) {
                                    return (
                                        <tr key={key}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.genre}</td>
                                            <td><Button id={item.id} onClick={this.OpenQuiz} variant="raised" color="primary">Open Quiz</Button></td>
                                        </tr>
                                    )
                                }

                                else {
                                    return (
                                        <tr key={key}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.genre}</td>
                                            <td>You Have attempted this quiz and your score is {this.state.scores[item.id]}</td>
                                        </tr>
                                    )
                                }
                            })}
                            
                        </tbody>
                    </table>
                    <div>
                        {this.state.quiz_selected ? <GiveQuiz quizID={this.state.quiz_num} quizData={this.state.spec_quiz_data} /> : null}
                    </div>
                </div>
            </div>
        )
    }
}

export default All_Quizes;