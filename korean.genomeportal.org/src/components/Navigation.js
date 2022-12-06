import React from "react";
import { Link } from "react-router-dom";
import SearchForm from "./SearchForm";
class Navigation extends React.Component {
  render() {
    return (
      <div className="navbar navbar-expand-lg navbar-light bg-light">
        <img
          src="/images/KGP_logo.png"
          className="mainLogo"
          width="50"
          height="50"
          alt="Korean Genome project"
        />
        <Link className="navbar-brand nav-link" to="/">
          Korean Genome Project Portal <sup>beta</sup>
        </Link>
        <div className="navbar-nav">
          <SearchForm />

          <Link className="nav-item nav-link" to="/publications">
            Publications
          </Link>
          <Link className="nav-item nav-link" to="/contact">
            Contact
          </Link>
          <Link className="nav-item nav-link" to="/faq">
            FAQ
          </Link>
        </div>
      </div>
    );
  }
}

export default Navigation;
