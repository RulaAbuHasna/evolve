import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { SignIn } from './components/SignIn/SignIn'
import { Student } from './components/Student/Student'
import { Prof } from './components/Prof/Prof'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/students/:uid">
            <Student />
          </Route>
          <Route path="/profs/:uid">
            <Prof />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
