import React from "react";

class Footer extends React.Component {
  render() {
    return (
      //Refers to : https://mdbootstrap.com/docs/jquery/navigation/footer/
      <footer className="page-footer fixed-bottom bg-light text-dark">
        <div className="footer-copyright text-center">
          © 2020 Copyright: SungwonJeon, Korean Genomics Center
        </div>
      </footer>
    );
  }
}
export default Footer;
