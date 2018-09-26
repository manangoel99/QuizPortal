import React, { Component } from 'react';

class AttemptedQuizzes extends Component {

    constructor() {
        super();
        this.state = {
            data : []
        };
    }

    componentDidMount() {
        fetch("http://localhost:8080/FetchAttemptedQuizzes/" + JSON.parse(localStorage.getItem('user')).username, {
            method : "GET"
        })
        .then(response => response.json())
        .then(json => {
            this.setState({
                data : json.quiz_arr,
            });
        });

    }

    render () {
        return (
            <div className="container">
                <table className="table table-dark table-responsive table-hover">
                    <thead>
                        <tr>
                            <th>Quiz Name</th>
                            <th>Genre</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data != null ? this.state.data.map((item, key) => {
                            return (
                                <tr key={key}>
                                    <td>{item.quiz_name}</td>
                                    <td>{item.genre}</td>
                                    <td>{item.score}</td>
                                </tr>
                            )
                        }) : null}
                    </tbody>
                    
                </table>
            </div>
        )
    }
}

export default AttemptedQuizzes;