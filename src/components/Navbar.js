import React, { Component } from "react";
import bank from "../bank.png";

class Navbar extends Component {
  render() {
    return (
      <nav
        style={{ height: "60px", backgroundColor: "#daa520" }}
        className="navbar fixed-top flex-md-nowrap p-0 shadow"
      >
        <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">
          <img
            src={bank}
            width="40"
            height="40"
            className="d-inline-block align-top"
            alt=""
          />
          &nbsp;
        </a>
        <span style={{ color: "#fff", fontSize: "40px", textAlign: "center" }}>
          YA BANK
        </span>

        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small className="text-secondary">
              <small
                style={{
                  backgroundColor: "#000",
                  color: "white",
                  padding: "2px",
                }}
                id="account"
              >
                {this.props.account}
              </small>
            </small>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
