import React from "react";

class PublicationList extends React.Component {
  render() {
    return (
      <div className="container publications">
        <h3> Publications of Korean genome project (KGP).</h3>
        <ol>
          <li>
            Jeon, Sungwon, et al. "Korean Genome Project: 1094 Korean personal
            genomes with clinical information." Science Advances 6.22 (2020):
            eaaz7835.
          </li>
          <li>
            Bhak, Youngjune, et al. "Polygenic risk score validation using
            Korean genomes of 265 early-onset acute myocardial infarction
            patients and 636 healthy controls." PloS one 16.2 (2021): e0246538.
          </li>
          <li>
            Jeon, Yeonsu, et al. "Welfare Genome Project: A Participatory Korean
            Personal Genome Project With Free Health Check-Up and Genetic Report
            Followed by Counseling." Frontiers in genetics 12 (2021).
          </li>
        </ol>
      </div>
    );
  }
}

export default PublicationList;
