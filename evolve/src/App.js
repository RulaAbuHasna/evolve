import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { SignIn } from './frontend/components/SignIn/SignIn'
import { Student } from './frontend/components/Student/Student'
import { Prof } from './frontend/components/Prof/Prof'
import { HomePage } from './frontend/components/Home/Home';
import { Profs } from './frontend/components/Profs/Profs';
import { Colleges } from './frontend/components/Collages/Colleges';
import { College } from './frontend/components/College/College';
import Rate from './frontend/components/Rate/Rate';
import CoursePage from './frontend/components/CoursePage/CoursePage';

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
          <Route exact path="/prof/:uid/colleges">
            <Colleges />
          </Route>
          <Route exact path="/prof/:profid/view">
            <Prof />
          </Route>
          <Route exact path="/prof/:uid/profs/:profid">
            <Prof />
          </Route>
          <Route exact path="/student/:uid/profs/:profid">
            <Prof isStudent={true} />
          </Route>
          <Route exact path="/student/:uid/course/:courseid">
            <CoursePage isStudent={true} isUser={true} />
          </Route>
          <Route exact path="/prof/:uid/course/:courseid">
            <CoursePage isUser={true} />
          </Route>
          <Route exact path="/course/:courseid">
            <CoursePage />
          </Route>
          <Route exact path="/student/:uid/course/:courseid/rate">
            <Rate isStudent={true} isUser={true} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
