import React from 'react';
import {Switch, BrowserRouter, Route} from 'react-router-dom';
import Main from './main';
import Login from './login';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Switch>
                    <Route path="/" component={Main} exact/>
                    <Route path="/login" component={Login} exact/>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
