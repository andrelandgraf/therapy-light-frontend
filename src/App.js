import React, { Component } from 'react';
import Therapy from './components/Therapy';
import { Navbar, MenuItem, Nav, NavItem, NavDropdown } from 'react-bootstrap';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInTherapy: true,
    }
  }

  render() {
    const { isInTherapy } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <Navbar>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="#home">Therapy Light</a>
              </Navbar.Brand>
            </Navbar.Header>
            <Nav>
              <NavItem eventKey={1} href="#">
                Therapists
    </NavItem>
              <NavItem eventKey={2} href="#">
                AI Therapy
    </NavItem>
              <NavDropdown eventKey={3} title="Settings" id="basic-nav-dropdown">
                <MenuItem eventKey={3.1}>Profile</MenuItem>
                <MenuItem eventKey={3.2}>Get Coins</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={3.4}>Log out</MenuItem>
              </NavDropdown>
            </Nav>
          </Navbar>
        </header>
        { isInTherapy ?
        <Therapy />
          :
          null
      } 
      </div>
    );
  }
}

export default App;
