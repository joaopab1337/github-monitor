import React from 'react';
import {
    Link, HashRouter as Router, Route, Switch,
} from 'react-router-dom';
import CommitsContainer from './containers/CommitsContainer';
import RepositoriesContainer from './containers/RepositoriesContainer';

export default (
    <Router>
        <div id="wrapper" className="toggled">

            <div id="sidebar-wrapper">
                <ul className="sidebar-nav">
                    <li className="sidebar-brand">
                        <Link to="/">
                            Github Monitor
                        </Link>
                    </li>
                    <li>
                        <Link to="/commits">
                            Commits
                        </Link>
                    </li>
                    <li>
                        <Link to="/repositories">
                            Repositories
                        </Link>
                    </li>
                    <li>
                        <a href="/logout">
                            Log out
                        </a>                            
                    </li>
                </ul>
            </div>

            <div id="page-content-wrapper">
                <div className="container-fluid">
                    <Switch>
                        <Route path="/" exact component={CommitsContainer} />
                        <Route path="/commits" exact component={CommitsContainer} />
                        <Route path="/repositories" exact component={RepositoriesContainer} />
                    </Switch>
                </div>
            </div>

        </div>
    </Router>
);
