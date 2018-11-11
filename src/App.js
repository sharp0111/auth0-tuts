import React, { Component } from 'react';
// import logo from './logo.svg';
import { Route, Link } from 'react-router-dom';
import './App.css';

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

class App extends Component {
  render() {
    return (
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="airports">Airport</Link></li>
          <li><Link to="/cities">Cities</Link></li>
        </ul>

        <Route path="/" exact component={Home} />
        <Route path="/airports" component={Airport} />
        <Route path="/cities" component={City} />
      </div>
    );
  }
}

export default App;
