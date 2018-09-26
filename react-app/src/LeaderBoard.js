import React, { Component } from 'react';
import { FormControl, InputLabel, Select } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Board from './leaderboard';

class LeaderBoard extends Component {

    constructor() {
        super();
        //this.setState({
        //    genre : "all",
        //});
        this.state = {
            genre : "all",
            genre_list : []
        }
    }

    componentDidMount() {
        fetch("http://localhost:8080/GetGenres", {
            method : "GET"
        })
        .then(response => response.json())
        .then(data => {
            let genre_list = [];
            console.log(data.genres);
            for (var i = 0; i < data.genres.length; i++) {
                genre_list.push(data.genres[i].genre);
            }

            console.log(genre_list);

            this.setState({
                genre_list : genre_list,
            });
        });
    }

    handleChange = event => {
        this.setState({
            genre: event.target.value
        });
    };

    render() {
        return (
            <div className="container">
                <center>
                    <FormControl>
                        <InputLabel>Genre</InputLabel>
                        <Select 
                        value={this.state.genre} 
                        onChange={this.handleChange}
                        color="secondary"
                        >
                            <MenuItem value="all">
                              <em>All</em>
                            </MenuItem>
                            {this.state.genre_list.map((item, key) => {
                                return (
                                    <MenuItem key={key} name={item} value={item}>{item}</MenuItem>
                                )
                            })}
                          </Select>
                    </FormControl>
                    <Board genre={this.state.genre} />
                </center>
            </div>
        )
    }
}

export default LeaderBoard;