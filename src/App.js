import React from 'react';
import Main from './main';
import {Switch, BrowserRouter, Route} from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Switch>
                    <Route path="/" component={Main} exact/>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
