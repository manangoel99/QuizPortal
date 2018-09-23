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
            quiz_selected : false
        };
    }

    componentDidMount() {
        const request = new Request("http://localhost:8080/All_Quizes")
        fetch(request, {
            method : "GET"
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            this.setState({
                data : data
            });
        });
    }

    OpenQuiz = (e) => {
        console.log(e.target);
        this.setState({
            quiz_selected : true,
            quiz_num : e.target.id
        });
        console.log(this.state.quiz_num);
        this.forceUpdate();
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
                                return (
                                    <tr key={key}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.genre}</td>
                                        <td><Button id={item.id} onClick={this.OpenQuiz} variant="raised" color="primary">Open Quiz</Button></td>
                                    </tr>
                                )
                            })}
                            
                        </tbody>
                    </table>
                    <div>
                        {this.state.quiz_selected ? <GiveQuiz quizID={this.state.quiz_num} /> : null}
                    </div>
                </div>
            </div>
        )
    }
}

export default All_Quizes;