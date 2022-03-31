import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import * as Constants from "../../global/constants.js";
import ContentWrapper from "../../components/Content";
import terms from './terms';

class TermsOfUse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      content: "",
    };
  }
  componentDidMount() {
    fetch("https://" + Constants.URL + "/api/website_footer/getone.php?id=1")
      .then((res) => res.json())
      .then(
        (result) => {
          result = result.records;
          this.setState({
            content: result[0].content,
          });
        },
        (error) => {
          this.setState({
            hasError: true,
            error: error,
          });
        }
      );
  }

  render() {
    return (
      <ContentWrapper contents={terms} title={<><span className="__primary-text">Defy Games</span> Terms of Use</>}>
        <section>
          <h2>Important Legal Notice Regarding Terms of Use of DEFY GAMES.</h2>
          <p>
            <b>
              <i>
                IMPORTANT! PLEASE CAREFULLY READ THESE TERMS OF USE BEFORE USING
              DEFY GAMES, AS THEY AFFECT YOUR LEGAL RIGHTS AND OBLIGATIONS.{" "}
                <br />
              IMPORTANT NOTICE: THIS AGREEMENT IS SUBJECT TO BINDING ARBITRATION
              AND A WAIVER OF CLASS ACTION RIGHTS AS DETAILED BELOW.
            </i>
            </b>
          </p>
        </section>
      </ContentWrapper>
    );
  }
}

export default withRouter(TermsOfUse);
