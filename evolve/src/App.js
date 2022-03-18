import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { SignIn } from './components/SignIn/SignIn'
import { Student } from './components/Student/Student'
import { Prof } from './components/Prof/Prof'
import { HomePage } from './components/Home/Home';
import { Profs } from './components/Profs/Profs';
import { Colleges } from './components/Collages/Colleges';
import { College } from './components/College/College';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <SignIn />
          </Route>
          <Route exact path="/student/:uid">
            <Student />
          </Route>
          <Route exact path="/prof/:uid">
            <Prof />
          </Route>
          <Route exact path="/student/:uid/home" >
            <HomePage isStudent={true} isCurrentUser={true} />
          </Route>
          <Route exact path="/prof/:uid/home" >
            <HomePage isCurrentUser={true} />
          </Route>
          <Route exact path="/home" >
            <HomePage />
          </Route>
          <Route exact path="/prof/:uid/profs">
            <Profs />
          </Route>
          <Route exact path="/student/:uid/profs">
            <Profs isStudent={true} />
          </Route>
          <Route exact path="/profs">
            <Profs />
          </Route>
          <Route exact path="/student/:uid/colleges">
            <Colleges isStudent={true} />
          </Route>
          <Route exact path="/colleges">
            <Colleges />
          </Route>
          <Route exact path="/student/:uid/colleges/:colid">
            <College isStudent={true} />
          </Route>
          <Route exact path="/prof/:uid/colleges/:colid">
            <College />
          </Route>
          <Route exact path="/colleges/:colid">
            <College />
          </Route>
          <Route exac path="/prof/:uid/colleges">
            <Colleges />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
