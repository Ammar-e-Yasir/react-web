import React, { useEffect, useContext, useState } from "react";
import { GlobalContext } from "../context/context";
import { useHistory } from "react-router";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import SignIn from '../screens/signin';
import { auth, onAuthStateChanged, db, doc, getDoc } from './firebase';
import Nav from "../screens/navbar"
import Rejected from "../screens/rejected";
import Home from "../screens/accepted";


export default function App() {
    const { state, dispatch } = useContext(GlobalContext);
    let history = useHistory();

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                fetchUserInfo(user.uid);
                console.log('user found !');
            }
            else {
                console.log('user not found');
                dispatch({ type: "AUTH_USER", payload: null });
            }
        });

    }, []);

    const fetchUserInfo = async (uid) => {
        let userRef = doc(db, 'users', uid);
        let userInfo = await getDoc(userRef);
        userInfo = userInfo.data();
        // console.log(userInfo.userRole)
        dispatch({ type: "AUTH_USER", payload: userInfo });


    }






    return (
        <Router>
            <div>
                <Nav />
                <Switch>

                    {state?.authUser ?
                        null : <>
                            <Route exact path='/' component={SignIn} />
                            
                        </>}
                    {state.authUser?.role === 'admin' ?
                        <>
                            <Route path='/' exact component={Home} />
                            


                        </> : null
                    }

                  









                </Switch>
            </div>
        </Router>
    );
}