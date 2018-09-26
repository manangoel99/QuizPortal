import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Quiz from './AddQuiz';
import All_Quizes from './All_Quizes';
import LeaderBoard from './LeaderBoard';
import EditQuiz from './EditQuiz'; 
import AttemptedQuizzes from './AttemptedQuizzes';
import { Button } from '@material-ui/core';
import ViewPeople from './ViewPeople';

class App extends Component {

    HandleSignOut = () => {
        var user = {
            username : '',
            isadmin : false,
            isloggedin : false
        };

        localStorage.setItem('user', JSON.stringify(user));
        window.location.reload();
    }

    render() {
        return (
            <div>
                <Router>
                    <div>
                    <nav className="navbar navbar-default">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <Link className="navbar-brand" to={'/'}>Home</Link>
                            </div>
                            <ul className="nav navbar-nav">
                                {JSON.parse(localStorage.getItem('user')).isadmin ? <li><Link to={'/Quiz'}>Add Quiz</Link></li> : null}
                                <li><Link to={'/All_Quizes'}>All Quizes</Link></li>
                                <li><Link to={'/LeaderBoard'}>Leader Board</Link></li>
                                {JSON.parse(localStorage.getItem('user')).isadmin ? <li><Link to={'/EditQuiz'}>Edit Quiz</Link></li> : null}
                            
                                <li><Link to={'/AttemptedQuizzes'}>Attempted Quizzes</Link></li>
                                {JSON.parse(localStorage.getItem('user')).isadmin ? <li><Link to={'/ViewPeople'}>View People</Link></li> : null }
                                <li><Link to={'/'}><Button variant="contained" color="secondary" onClick={this.HandleSignOut}>Sign Out</Button></Link></li>
                            </ul>
                        </div>
                    </nav>
                    <Switch>
                        <Route exact path='/Quiz' component={Quiz} />
                        <Route exact path='/All_Quizes' component={All_Quizes} />
                        <Route exact path='/LeaderBoard' component={LeaderBoard} />
                        <Route exact path='/EditQuiz' component={EditQuiz} />
                        <Route exact path="/AttemptedQuizzes" component={AttemptedQuizzes}/>
                        <Route exact path='/ViewPeople' component={ViewPeople} />
                    </Switch>
                    </div>
                </Router>
            </div>
        )
    }
}

export default App;