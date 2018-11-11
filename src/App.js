import React, { Component } from 'react';
// import logo from './logo.svg';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter, Switch } from 'react-router-dom';
import './App.css';

// Basic Routing
const Home = () => (
  <div>
    <h2> Home </h2>
  </div>
);

const Airport = () => (
  <div>
    <ul>
      <li>Jomo Kenyatta</li>
      <li>Tambo</li>
      <li>Muurtala Mohammed</li>
    </ul>
  </div>
)

const City = () => (
  <div>
    <ul>
      <li>San Francisco</li>
      <li>Istanbul</li>
      <li>Tokyo</li>
    </ul>
  </div>
)

// Nested Routing & URL Parameters
const Courses = ({ match }) => (
  <div>
     <ul>
        <li><Link to={`${match.url}/technology`}>Technology</Link></li>
        <li><Link to={`${match.url}/business`}>Business</Link></li>
        <li><Link to={`${match.url}/economics`}>Economics</Link></li>
    </ul>

    {/* <Route exact path={`${match.path}/technology`} render={() => (<div> This is technology </div>)}/>
    <Route path={`${match.path}/business`} component={() => (<div> This is business </div>)}/>
    <Route path={`${match.path}/economics`} component={() => (<div> This is economics </div>)}/> */}
    <Route exact path={`${match.path}/:course`} render={({match}) => (<div> This is {match.params.course} </div>)}/>
  </div>
);

// Route Protection and Authentication
const Public = () => (
  <div> This is a public page </div>
);

const Private = () => (
  <div> This is a private page </div>
);

// const Login = () => (
//   <div> Login Page <button>login</button> </div>
// );
class Login extends React.Component {
  state = {
    redirectToPreviousRoute: false
  };

  login = () => {
    AuthService.authenticate(() => {
      this.setState({ redirectToPreviousRoute: true });
    });
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToPreviousRoute } = this.state;

    if (redirectToPreviousRoute) {
      return <Redirect to={from} />;
    }

    return (
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <button onClick={this.login}>Log in</button>
      </div>
    );
  }
}

const AuthService = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100)
  },
  logout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
};

const SecretRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    AuthService.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }} />
  )} />
);

const AuthStatus = withRouter(({ history }) => (
  AuthService.isAuthenticated ? (
    <p>
      Welcome! <button onClick={() => {
        AuthService.logout(() => history.push('/'))
      }}>Sign out</button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  )
));

// Link Component Customization
const Contact = () => (
  <div>
    <h2>Contact Page</h2>
  </div>
)

const CustomLink = ({ children, to, exact }) => (
  <Route path={to} exact={exact} children={({ match }) => (
    <div className={match ? 'active' : ''}>
      {match ? '> ' : ''}
      <Link to={to}>
        {children}
      </Link>
    </div>
  )}/>
);

// SideBar Rendering
const routes = [
  { path: '/',
    exact: true,
    leftbar: () => <div>Home</div>,
    main: () => <h2>Home</h2>
  },
  { path: '/about',
    leftbar: () => <div>About</div>,
    main: () => <h2>About</h2>
  },
  { path: '/contact',
    leftbar: () => <div>Contact</div>,
    main: () => <h2>Contact</h2>
  }
]

class App extends Component {
  render() {
    return (
      <div>
        <ul>
          {/* <li><Link to="/">Home</Link></li> */}
          <li><Link to="airports">Airport</Link></li>
          <li><Link to="/cities">Cities</Link></li>
          <li><Link to="/courses">Courses</Link></li>
          <li><Link to="/cities">Cities</Link></li>
        </ul>

        {/* <Route path="/" exact component={Home} /> */}
        <Route path="/airports" component={Airport} />
        <Route path="/cities" component={City} />
        <Route path="/courses" component={Courses}/>

        {/* <Router> */}
          <div style={{width: 1000, margin: '0 auto'}}>
            <AuthStatus />
            <ul>
              <li><Link to='/public'> Public </Link></li>
              <li><Link to='/private'> Private </Link></li>
            </ul>

            <hr/>

            <Route path='/public' component={Public} />
            <Route path="/login" component={Login}/>
            {/* <Route path='/private' component={Private} /> */}
            <SecretRoute path='/private' component={Private} />

          </div>
        {/* </Router> */}

          <div>
            <CustomLink exact={true} to="/">
              Home
            </CustomLink>
            <CustomLink to="/contact">
              Contact
            </CustomLink>

            <hr/>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/contact" component={Contact}/>
              {/* Handling Non-existent Routes */}
              <Route render={() => (<div> Sorry, this page does not exist. </div>)} />
            </Switch>
          </div>

          <div style={{ display: 'flex' }}>
            <div style={{
              padding: '10px',
              width: '40%',
              background: '#FF6347'
            }}>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>

              {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                exact={route.exact}
                component={route.leftbar}
              />
            ))}
            </div>
            <div style={{ flex: 1, padding: '20px' }}>
              {routes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  exact={route.exact}
                  component={route.main}
                />
              ))}
            </div>
          </div>

      </div>

    );
  }
}

export default App;
