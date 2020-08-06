import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse,
    MDBIcon } from "mdbreact";
import { BrowserRouter as Router } from 'react-router-dom';
import '../styles/Navbarpage.css';

class NavbarPage extends Component {
    state = {
          isOpen: false
    };

    toggleCollapse = () => {
          this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
          return (
                  <Router>
                    <MDBNavbar className="navbar" fixed="top" color="light-blue lighten-2" dark expand="md">
                      <MDBNavbarBrand color="">
                        {/*<strong className="white-text">A hobby project by Nithin Senthil Kumar</strong>*/}
                        <strong className="text-dark" size="3x">A hobby project by Nithin Senthil Kumar</strong>
                      </MDBNavbarBrand>
                      <MDBNavbarToggler onClick={this.toggleCollapse} />
                      <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                        <MDBNavbarNav right>
                          <MDBNavItem>
                            
                            <a key="website" className="waves-effect waves-light" href="http://nithintsk.github.io">
                              <MDBIcon icon="globe-americas" size="3x" className="text-dark"/>
                            </a>
                          </MDBNavItem>
                          <div className="horizontalgap"></div>
                          <MDBNavItem>
                            <a key="linkedin" className="waves-effect waves-light" href="http://linkedin.com/in/nithintsk">
                              <MDBIcon fab icon="linkedin" size="3x" className="text-dark"/>
                            </a>
                          </MDBNavItem>
                          <div className="horizontalgap"></div>
                          <MDBNavItem>
                            <a key="github" className="waves-effect waves-light" href="http://github.com/nithintsk">
                              <MDBIcon fab icon="github" size="3x" className="text-dark"/>
                            </a>
                          </MDBNavItem>
                        </MDBNavbarNav>
                      </MDBCollapse>
                    </MDBNavbar>
                  </Router>
                  );
          }
}
export default NavbarPage;
