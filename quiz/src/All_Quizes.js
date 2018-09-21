import React, { Component } from 'react';

class All_Quizes extends Component {
    constructor() {
        super();
        this.state = {
            data : []
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
                            {this.state.data.map(function (item, key) {
                                return (
                                    <tr key={key}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.genre}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default All_Quizes;