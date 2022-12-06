import React from "react";
import Axios from "axios";
import { Typeahead } from "react-bootstrap-typeahead";
import { withRouter } from "react-router-dom";

class SearchForm extends React.Component {
  //TODO: Add set state for placeholder
  //Refers to: https://www.npmjs.com/package/react-bootstrap-typeahead
  state = {
    placeholder: "Search",
    example: ["ACE2", "TMPRSS2", "FURIN"],
    selected: [],
    selectedGene: "",
  };

  componentDidMount() {
    this.fetchGeneList();
    if (this.props.placeholder) {
      this.setState({ placeholder: this.props.placeholder });
    }
  }

  fetchGeneList = async () => {
    //TODO: need to change the URL
    const response = await Axios.get("http://api.genomeportal.org/genelist");
    let geneList = response.data;
    let genes = [];
    for (let index = 0; index < geneList.length; index++) {
      genes.push(geneList[index].geneSymbol);
    }
    this.setState({ example: genes });
  };
  moveToGene(selected) {
    console.log(selected.selected);
    this.props.history.push("/gene/" + selected.selected);
  }
  moveToGeneByEnter(selected) {
    console.log(selected.selected);
    this.props.history.push("/gene/" + selected);
  }
  typeEnter(e) {
    if (e.keyCode === 13) {
      console.log(this.state.selectedGene);
      this.moveToGeneByEnter(this.state.selectedGene);
    }
  }
  changeSelectedGene(text) {
    console.log(text);
    this.setState({ selectedGene: text });
  }
  render() {
    const { placeholder, example } = this.state;
    return (
      //TODO: onSubmit
      <Typeahead
        ref="searchTerm"
        name="searchTerm"
        id="form__search"
        options={example}
        placeholder={placeholder}
        onChange={(selected) => this.moveToGene({ selected })}
        onInputChange={(text) => this.changeSelectedGene(text)}
        selected={this.state.selected}
        onKeyDown={(e) => this.typeEnter(e)}
      ></Typeahead>
    );
  }
}

export default withRouter(SearchForm);
