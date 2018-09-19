import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import RegisterSignIn from './RegisterSignIn';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<RegisterSignIn />, document.getElementById('root'));

//class Index extends Component {
//    constructor() {
//        super();
//        this.state = {
//            loggedin : false
//        };
//    }
//
//    changeloggedin = () => {
//        this.setState({
//            loggedin : true
//        });
//    }
//
//    render() {
//        return(
//            <div>
//                {this.state.loggedin ? null : <RegisterSignIn siginvar={this.state.loggedin} changeloggedin={this.changeloggedin} />}
//            </div>
//        )
//    }
//
//}
//
//ReactDOM.render(<Index />, document.getElementById('root'));

registerServiceWorker();
