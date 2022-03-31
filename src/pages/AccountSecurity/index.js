import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Header from '../../components/Header/Header'
import PageHeader from '../../components/PageHeader'
import Footer from '../../components/Footer/Footer'
import "./index.css";
import * as Constants from "../../global/constants.js";
class AccountSecurity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      content: ""
    };
  }
  componentDidMount() {
    fetch("https://" + Constants.URL + "/api/website_footer/getone.php?id=5")
      .then(res => res.json())
      .then(
        result => {
          result = result.records;
          this.setState({
            content: result[4].content
          });
        },
        error => {
          this.setState({
            hasError: true,
            error: error
          });
        }
      );
  }
  render() {
    return (
      <div>
        <Header />

        <div className="container-fluid _faq_wrap">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1>ACCOUNT SECURITY</h1>
              </div>
              <div className="col-md-12">
                <div
                  className="_faq_cont"
                  dangerouslySetInnerHTML={{ __html: this.state.content }}
                />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(AccountSecurity);
