import React from "react";
import SearchForm from "./SearchForm";

class HomeDetail extends React.Component {
  state = {
    countVariants: 0,
    countGenes: 0,
  };

  componentDidMount() {
    this.fetchCounts();
  }

  fetchCounts = async () => {
    let countGenes = 0;
    let countVariants = 0;
    this.setState({ countGenes: countGenes, countVariants: countVariants });
  };

  render() {
    return (
      <div className="offset-1">
        <div className="row">
          <span>
            <br />
            <br />
          </span>
        </div>
        <div className="row">
          <div className="offset-3 col-8 bouncing">
            <img
              src="/images/home.png"
              width="340"
              height="300"
              alt="Korean Genome project"
            />
          </div>
          <div className="offset-1 col-6">
            <span>
              <br />
            </span>
            <h1>
              Korean Genome Project Portal <sup>beta</sup>
            </h1>

            <br />
            <div className="col-12">
              <p>
                Total genes: {this.state.countGenes} | Total variants:{" "}
                {this.state.countVariants}
              </p>
            </div>
            <div className="searchForm__Main col-8">
              <SearchForm placeholder="Search by gene, variant, or trait" />
            </div>
          </div>
          <div className="offset-1 col-10">
            <div className="col-12">
              <br />
              <p className="lead">
                The Korean Genome Project (KGP) is the largest Korean Genome
                Project which currently includes 4,000 human genomes sequenced
                in Korea.
              </p>
              <p className="lead">
                The initinal phase of the KGP data set (Korea1K) contains 1,094
                Korean whole-genome sequences which includes 916 unrealated and
                non-rare disease samples. The sequencing reads were mapped to
                GRCh38/hg38. This portal provides information of the variants
                and its association with clinical traits from the Korea1K
                project.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeDetail;
