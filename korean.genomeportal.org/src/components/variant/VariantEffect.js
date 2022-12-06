import React from "react";
import { Link } from "react-router-dom";
class VariantEffect extends React.Component {
  getVariantEffect(variant) {
    return (
      //TODO: change col-length by number of variants effect
      <div className="col-4">
        <h4>{variant.variantclass}</h4>
        <ul>
          <li>
            <Link to={"/gene/" + variant.genesymbol}>{variant.genesymbol}</Link>
          </li>
        </ul>
      </div>
    );
  }
  getTable(variants) {
    return (
      <div className="row">{variants.map((v) => this.getVariantEffect(v))}</div>
    );
  }
  render() {
    return (
      <div className="">
        <h2>Variant Effect Predictor</h2>
        {this.getTable(this.props.variants)}
      </div>
    );
  }
}

export default VariantEffect;
