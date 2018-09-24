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
        this.setState({
            genre : this.props.genre
        });
    }

    render() {
        return (
            <h1>Hola</h1>
        )
    }
}

export default Board;