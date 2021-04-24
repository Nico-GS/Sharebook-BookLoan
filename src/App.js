import React from "react";
import MyBooks from './component/MyBooks';
import ListBooks from './component/ListBooks';
import AddBook from "./component/AddBook";
import MyBorrows from "./component/MyBorrows";
import Login from "./component/Login";
import AddUser from "./component/AddUser";
import Header from "./component/Header";
import {BrowserRouter, Route, Redirect} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

    const [userInfo, setUserInfo] = React.useState('');

    return (
        <div>

            <BrowserRouter>
                <div className="App">
                    {!userInfo && <Redirect to="/login" />}
                    {userInfo && <Header userInfo={userInfo} setUserInfo={setUserInfo} />}
                    <Route path="/listBooks">
                        <ListBooks/>
                    </Route>
                    <Route path="/myBooks">
                        <MyBooks/>
                    </Route>
                    <Route exact path="/addBooks">
                        <AddBook/>
                    </Route>
                    <Route exact path="/addBooks/:bookId">
                        <AddBook/>
                    </Route>
                    <Route path="/myBorrows">
                        <MyBorrows/>
                    </Route>
                    <Route path="/login">
                        <Login setUserInfo={setUserInfo}/>
                    </Route>
                    <Route path="/addUser">
                        <AddUser setUserInfo={setUserInfo}/>
                    </Route>
                </div>
            </BrowserRouter>
        </div>

    );
}

export default App;
