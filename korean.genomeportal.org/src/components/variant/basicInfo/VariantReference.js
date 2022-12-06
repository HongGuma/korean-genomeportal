import React from "react";
import { Link } from "react-router-dom";
class VariantReference extends React.Component {
  state = {
    rsID: "",
  };
  componentDidMount() {}
  componentDidUpdate() {}
  render() {
    console.log(this.props.rsID);
    if (
      this.props.rsID !== undefined &&
      this.props.rsID.substring(0, 2) === "rs"
    ) {
      return (
        <div>
          <ul>
            <li>
              <a
                href={"https://www.ncbi.nlm.nih.gov/snp/" + this.props.rsID}
                target="_blank"
              >
                dbSNP ({this.props.rsID})
              </a>
            </li>
          </ul>
        </div>
      );
    } else {
      return (
        <div>
          <ul>
            <li>No reference</li>
          </ul>
        </div>
      );
    }
  }
}

export default VariantReference;
