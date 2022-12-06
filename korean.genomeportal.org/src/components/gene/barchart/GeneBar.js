import React from "react";
import Plot from "react-plotly.js";

class GeneBar extends React.Component {
  state = {
    variants: [],
  };
  componentDidMount() {}
  getText(variants) {
    return variants.map((v) => {
      return (
        "Pos: " +
        v.chr +
        ":" +
        v.pos +
        "<br>" +
        "Ref: " +
        v.ref +
        "<br>" +
        "Alt: " +
        v.alt +
        "<br>" +
        "Classification: " +
        v.variantclass
      );
    });
  }
  getColor(varClass) {
    let colorVarClass = {
      IGR: "#e6194b",
      Intron: "#3cb44b",
      "5'Flank": "#ffe119",
      "3'Flank": "#4363d8",
      "5'UTR": "#f158231",
      "3'UTR": "#911eb4",
      RNA: "#42d4f4",
      Splice_Region: "#f032e6",
      Splice_Site: "#bfef45",
      Targeted_Region: "#fabed4",
      Silent: "#469990",
      Missense_Mutation: "#dcbeff",
      Nonsense_Mutation: "#9a6324",
      Translation_Start_Site: "#fffac8",
      Nonstop_Mutation: "#800000",
      Frame_Shift_Ins: "#aaffc3",
      Frame_Shift_Del: "#808000",
      In_Frame_Ins: "#ffd8b1",
      In_Frame_Del: "#000075",
    };
    return varClass.map((v) => {
      return colorVarClass[v];
    });
  }
  render() {
    const variants = this.props.variants;

    return (
      <div>
        <h3>
          <strong>Allele frequency information</strong>
        </h3>
        <Plot
          data={[
            {
              x: variants.map((v) => v.pos),
              y: variants.map((v) => v.allelefrequency),
              text: this.getText(variants),
              type: "bar",
              width: 50,
              alpha: 0.5,
              marker: {
                color: this.getColor(variants.map((v) => v.variantclass)),
              },
              transforms: [
                {
                  type: "groupby",
                  groups: variants.map((v) => v.variantclass),
                  styles: [
                    { target: "IGR", value: { marker: { color: "#e6194b" } } },
                    {
                      target: "Intron",
                      value: { marker: { color: "#3cb44b" } },
                    },
                    {
                      target: "5'Flank",
                      value: { marker: { color: "#ffe119" } },
                    },
                    {
                      target: "3'Flank",
                      value: { marker: { color: "#4363d8" } },
                    },
                    {
                      target: "5'UTR",
                      value: { marker: { color: "#f15823" } },
                    },
                    {
                      target: "3'UTR",
                      value: { marker: { color: "#911eb4" } },
                    },
                    { target: "RNA", value: { marker: { color: "#42d4f4" } } },
                    {
                      target: "Splice_Region",
                      value: { marker: { color: "#f032e6" } },
                    },
                    {
                      target: "Splice_Site",
                      value: { marker: { color: "#bfef45" } },
                    },
                    {
                      target: "Targeted_Region",
                      value: { marker: { color: "#fabed4" } },
                    },
                    {
                      target: "Silent",
                      value: { marker: { color: "#469990" } },
                    },
                    {
                      target: "Missense_Mutation",
                      value: { marker: { color: "#dcbeff" } },
                    },
                    {
                      target: "Nonsense_Mutation",
                      value: { marker: { color: "#9a6324" } },
                    },
                    {
                      target: "Translation_Start_Site",
                      value: { marker: { color: "#fffac8" } },
                    },
                    {
                      target: "Nonstop_Mutation",
                      value: { marker: { color: "#800000" } },
                    },
                    {
                      target: "Frame_Shift_Ins",
                      value: { marker: { color: "#aaffc3" } },
                    },
                    {
                      target: "Frame_Shift_Del",
                      value: { marker: { color: "#808000" } },
                    },
                    {
                      target: "In_Frame_Ins",
                      value: { marker: { color: "#ffd8b1" } },
                    },
                    {
                      target: "In_Frame_Del",
                      value: { marker: { color: "#000075" } },
                    },
                  ],
                },
              ],
            },
          ]}
          layout={{ height: 450, width: 1500 }}
        />
      </div>
    );
  }
}

export default GeneBar;
