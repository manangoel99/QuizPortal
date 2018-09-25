import React, { Component } from 'react';

class Board extends Component {
    constructor() {
        super();
        this.state = {
            genre : '',
            data : []
        }
    }

    componentWillReceiveProps() {

        fetch("http://localhost:8080/FetchLeaderBoard/" + this.props.genre, {
            method : "GET"
        })
        .then(response => response.json())
        .then(json => {
            console.log(json);
            this.setState({
                data : json.arr.sort(function (a, b) {
                    return -1 * (a.score - b.score)
                }),
            });
        });

        this.setState({
            genre : this.props.genre
        });
    }

    render() {
        return (
            <div className="container">
                <h1>{this.state.genre}</h1>
                <table className="table table-responsive table-striped table-hover table-dark">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map((item, key) => {
                            return (
                                <tr key={key}>
                                    <td>{item.username}</td>
                                    <td>{item.score}</td>
                                </tr>
                            )
                        })}
                    </tbody>

                </table>
            </div>
        )
    }
}

export default Board;