import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { SignIn } from './components/SignIn/SignIn'
import { Student } from './components/Student/Student'
import { Prof } from './components/Prof/Prof'
import { HomePage } from './components/Home/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/signin">
            <SignIn />
          </Route>
          <Route exact path="/students/:uid">
            <Student />
          </Route>
          <Route exact path="/profs/:uid">
            <Prof />
          </Route>
          <Route exact path="/students/:uid/home" >
            <HomePage isStudent={true} />
          </Route>
          <Route exact path="/profs/:uid/home" >
            <HomePage isCurrentUser={true} />
          </Route>
          <Route exact path="/home" >
            <HomePage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
