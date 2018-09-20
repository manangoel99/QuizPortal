import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Quiz from './AddQuiz';

class App extends Component {
    render() {
        return (
            <div>
                <Router>
                    <div>
                    <nav className="navbar navbar-default">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <Link className="navbar-brand" to={'/'}>React App</Link>
                            </div>
                            <ul className="nav navbar-nav">
                            {JSON.parse(localStorage.getItem('user')).isadmin ? <li><Link to={'/Quiz'}>Add Quiz</Link></li> : null}
                                {/*<li><Link to={'/NewPerson'}>Create Person</Link></li>
                                <li><Link to={'/EditPerson'}>Edit Person</Link></li>
                                <li><Link to={'/DeletePerson'}>Delete People</Link></li>
                                <li><Link to={'/ViewPeople'}>View People</Link></li>*/}
                            </ul>
                        </div>
                    </nav>
                    <Switch>
                        <Route exact path='/Quiz' component={Quiz} />
                        {/*<Route exact path='/NewPerson' component={NewPerson} />
                        <Route exact path='/EditPerson' component={EditPerson} />
                        <Route exact path='/DeletePerson' component={DeletePerson} />
                        <Route exact path='/ViewPeople' component={ViewPeople} />*/}
                    </Switch>
                    </div>
                </Router>
            </div>
        )
    }
}

export default App;