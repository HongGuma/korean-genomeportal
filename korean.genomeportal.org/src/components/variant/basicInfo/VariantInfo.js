import React from "react";
import VariantReference from "./VariantReference";

class VariantInfo extends React.Component {
  render() {
    let variants = this.props.variants;
    const rsid = variants.map((v) => v.rsid)[0];
    const alleleCount = variants.map((v) => v.allelecount)[0];
    const alleleFrequency = variants.map((v) => v.allelefrequency)[0];
    const chromosome = variants.map((v) => v.chr)[0];
    const position = variants.map((v) => v.pos)[0];
    const referenceAllele = variants.map((v) => v.ref)[0];
    const alternativeAllele = variants.map((v) => v.alt)[0];
    //TODO: Add allele number
    const alleleNumber = Math.round(alleleCount / alleleFrequency);
    return (
      <div className="row">
        <div className="col-4">
          <h2>Variant infomation</h2>
          <div className="row">
            <div className="col-3">Chromosome</div>
            <div className="col-6">{chromosome}</div>
          </div>
          <div className="row">
            <div className="col-3">Position</div>
            <div className="col-6">{position}</div>
          </div>
          <div className="row">
            <div className="col-4">Reference Allele</div>
            <div className="col-6">{referenceAllele}</div>
          </div>
          <div className="row">
            <div className="col-4">Alternative Allele</div>
            <div className="col-6">{alternativeAllele}</div>
          </div>
          <div className="row">
            <div className="col-3">Allele Count</div>
            <div className="col-6">{alleleCount}</div>
          </div>
          <div className="row">
            <div className="col-4">Allele Number</div>
            <div className="col-6">{alleleNumber}</div>
          </div>
          <div className="row">
            <div className="col-4">Allele Frequency</div>
            <div className="col-6">{alleleFrequency}</div>
          </div>
        </div>
        <div className="col-6">
          {/* TODO: dbSNP link */}
          <h2>Reference</h2>
          {<VariantReference rsID={rsid}></VariantReference>}
        </div>
      </div>
    );
  }
}

export default VariantInfo;
