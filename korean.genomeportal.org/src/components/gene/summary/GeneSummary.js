import React from "react";
import GeneBasicInfo from "./GeneBasicInfo";
import GeneSummaryVariants from "./GeneSummaryVariants";
class GeneSummary extends React.Component {
  state = {
    //geneID:this.props.variants[0].genesymbol,
    //transcriptID:this.props.variants[0].Transcript_ID
  };
  componentDidMount() {}
  getVariantsCountByClass(variants) {
    var keys = [...new Set(variants.map((d) => d.variantclass))];
    var countVarClass = [];

    for (var i = 0; i < keys.length; i++) {
      let tmp = {};
      tmp.variantclass = keys[i];
      tmp.Count = variants.filter((variant) => {
        return variant.variantclass === keys[i];
      }).length;
      countVarClass.push(tmp);
    }
    return countVarClass;
  }
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-3">
            <GeneBasicInfo
              geneID={this.state.geneID}
              transcriptID={this.state.transcriptID}
            ></GeneBasicInfo>
          </div>
          <div className="offset-3 col-3">
            <GeneSummaryVariants
              countVarClass={this.getVariantsCountByClass(this.props.variants)}
            ></GeneSummaryVariants>
          </div>
        </div>
      </div>
    );
  }
}

export default GeneSummary;
