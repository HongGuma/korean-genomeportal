import React from "react";

class Contact extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="contact">
          <h1>Contact</h1>
          <div className="contact__context">
            <p>
              This portal system is beta version. So, there might be many bugs
              and strange things.
            </p>
            <span>
              Please contact{" "}
              <strong>Sungwon Jeon (jsw0061@unist.ac.kr) </strong> to report
              errors in the website.
            </span>
          </div>
        </div>
      </div>
    );
  }
}
export default Contact;
