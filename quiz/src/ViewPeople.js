import React, { Component } from 'react';
import { Button } from '@material-ui/core';

class ViewPeople extends Component {

    constructor() {
        super();
        this.state = {
            user_list : []
        }
    }

    componentDidMount() {
        fetch("http://localhost:8080/FetchUsers", {
            method : "GET"
        })
        .then(response => response.json())
        .then(json => {
            console.log(json);
            this.setState({
                user_list : json.users,
            });
        });
    }

    handleClick = (e) => {
        e.preventDefault();
        
        let id = e.target.id;

        fetch("http://localhost:8080/DeleteUser/" + id, {
            method : "DELETE"
        })
        .then(response => response.json())
        .then(json => {
            console.log(json);
        });

        setTimeout(function () {
            window.location.reload();
        }, 500);
    }

    render() {
        return (
            <div className="container">
                <center><h1>Users</h1></center>
                <table className="table table-responsive table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.user_list.map((item, key) => {
                            return (
                                <tr key={key}>
                                    <td>{item.username}</td>
                                    <td>{item.firstname}</td>
                                    <td>{item.lastname}</td>
                                    <td>{item.email}</td>
                                    <td><Button onClick={(e) => this.handleClick(e)} id={item.id} color="secondary" variant="outlined">Delete</Button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ViewPeople;