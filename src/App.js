import React from 'react';
import './App.css';
import Header from './components/Header';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import styled from "styled-components";
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import {useAuthState} from "react-firebase-hooks/auth";
import { auth } from './firebase';
import Login from './components/Login';
import Spinner from "react-spinkit";

function App() {

  const [user , loading] = useAuthState(auth);
  if(loading){
   return( <AppLoading>
      <AppLoadingContents>
    <img src="https://yt3.googleusercontent.com/ytc/AL5GRJUyNSclWVdzjF267_EFUDHth4IXcUlcQCjEfNTvSw=s900-c-k-c0x00ffffff-no-rj" alt=""/>
      <Spinner name="ball-spin-fade-loader"
      color='purple' fadeIn='none'
      />
      </AppLoadingContents>
    </AppLoading>)
  }
  return (
    <div className="App">
      <Router>
        {!user ?( <Login/> ) : 
         <div>
         <Header />
         <AppBody>
           <Sidebar/>
           <Switch>
             <Route path="/" exact>
              <Chat/>
             </Route>
           </Switch>
           </AppBody>
         </div>}
       
      </Router>
    </div>
  );
}

export default App;

const AppBody = styled.div`
display: flex;
height: 100vh;
`;

const AppLoading = styled.div`
display: grid;
place-items: centre;
height: 100vh;
width: 100%;
`;

const AppLoadingContents = styled.div`

text-align: center;
padding-bottom: 100px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

>img{
height: 100px;
padding: 20px;
margin-bottom: 40px;
}
`;