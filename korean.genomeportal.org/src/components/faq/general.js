import React from "react";

class FaqGeneral extends React.Component {
  state = {
    isShow: "none",
  };
  handleClick(e) {
    if (this.state.isShow === "none") {
      this.setState({ isShow: "" });
    } else {
      this.setState({ isShow: "none" });
    }
  }

  render() {
    this.handleClick = this.handleClick.bind(this);
    return (
      <div className="col-12">
        <ul>
          <FaqContents
            question="How many Korean genomes was used for the Korean genome project
                portal?"
            answer="Total 916 unrealted Korean genomes were used for the Korean genome project portal.
			We are going to update it to 4,000 Koreans."
          />

          <FaqContents
            question="How should I cite the Korean genome project portal?"
            answer='Please cite Jeon, Sungwon, et al. "Korean Genome Project: 1094 Korean personal genomes with clinical information." Science Advances 6.22 (2020): eaaz7835'
          />

          <FaqContents
            question="What are the restictions on data usage?"
            answer="A"
          />

          <FaqContents
            question="How can I get access to individual genotypes in the Korean genome
			project?"
            answer="A"
          />
        </ul>
      </div>
    );
  }
}

class FaqContents extends React.Component {
  state = {
    isShow: "none",
  };
  handleClick() {
    if (this.state.isShow === "none") {
      this.setState({ isShow: "" });
    } else {
      this.setState({ isShow: "none" });
    }
  }
  render() {
    this.handleClick = this.handleClick.bind(this);
    return (
      <div className="FaqContents">
        <li style={{ margin: "0 0 10px 0" }}>
          <a className="question" onClick={this.handleClick}>
            <strong>{this.props.question}</strong>
          </a>
          <div className="answer" style={{ display: this.state.isShow }}>
            {this.props.answer}
          </div>
        </li>
      </div>
    );
  }
}

export default FaqGeneral;
