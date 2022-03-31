import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Header from "../../components/Header/Header";
import PageHeader from "../../components/PageHeader";
import Footer from "../../components/Footer/Footer";
import "./index.css";
import * as Constants from "../../global/constants.js";
class FAQ extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      content: "",
    };
  }
  componentDidMount() {
    fetch("https://" + Constants.URL + "/api/website_footer/getone.php?id=3")
      .then((res) => res.json())
      .then(
        (result) => {
          result = result.records;
          this.setState({
            content: result[2].content,
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
      <div>
        <Header />

        <div className="container-fluid _faq_wrap">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1>FAQ</h1>
              </div>
              <div className="col-md-12">
                <div
                  className="_faq_cont"
                  // dangerouslySetInnerHTML={{ __html: this.state.content }}
                >
                  <p>
                    <strong>
                      <span data-contrast="auto">
                        <span
                          data-ccp-charstyle="faq-category-content"
                          data-ccp-charstyle-defn='{"ObjectId":"e7bf93fd-eef5-4b96-a00e-77577b1d11dc|40","ClassId":1073872969,"Properties":[134233614,"true",201340122,"1",469775450,"faq-category-content",469778129,"faq-category-content",469778324,"Default Paragraph Font"]}'
                        >
                          GENERAL
                        </span>
                      </span>
                    </strong>
                    <span data-ccp-props='{"201341983":0,"335559738":40,"335559739":0,"335559740":259}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <strong>
                      <span data-contrast="none">Is&nbsp;</span>
                    </strong>
                    <strong>
                      <span data-contrast="none">p</span>
                    </strong>
                    <strong>
                      <span data-contrast="none">laying&nbsp;</span>
                    </strong>
                    <strong>
                      <span data-contrast="none">on</span>
                    </strong>
                    <strong>
                      <span data-contrast="none">&nbsp;</span>
                    </strong>
                    <strong>
                      <span data-contrast="none">Defy Games</span>
                    </strong>
                    <strong>
                      <span data-contrast="none">&nbsp;</span>
                    </strong>
                    <strong>
                      <span data-contrast="none">l</span>
                    </strong>
                    <strong>
                      <span data-contrast="none">egal?</span>
                    </strong>
                    <span data-ccp-props='{"201341983":2,"335559739":75,"335559740":210}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="auto">
                      Legal residents physically located in&nbsp;
                    </span>
                    <span data-contrast="auto">Canada and&nbsp;</span>
                    <span data-contrast="auto">
                      any of the 50 states and Washington DC, excluding Arizona,
                      Hawaii, Idaho, Louisiana, Montana, Nevada, and Washington
                      are eligible to open an account and participate in paid
                      contests offered by the Website.
                    </span>
                    <span data-ccp-props='{"201341983":0,"335559739":160,"335559740":259}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="auto">
                      Legal residents of Arizona, Hawaii, Louisiana, Montana,
                      Nevada, and Washington (the "Excluded States") are
                      ineligible for prizes offered by the Website. Residents of
                      the Excluded States are eligible to open an account and
                      play in Free contests. 
                    </span>
                    <span data-ccp-props='{"201341983":0,"335559739":160,"335559740":259}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">
                          What are&nbsp;
                        </span>
                      </span>
                    </strong>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">Power Tokens</span>
                      </span>
                    </strong>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">?</span>
                      </span>
                    </strong>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":2,"335559739":75,"335559740":210}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="auto">Power Tokens are</span>
                    <span data-contrast="auto">&nbsp;earned playing</span>
                    <span data-contrast="auto">/participating</span>
                    <span data-contrast="auto">&nbsp;on&nbsp;</span>
                    <span data-contrast="auto">Defy Games</span>
                    <span data-contrast="auto">&nbsp;</span>
                    <span data-contrast="auto">and&nbsp;</span>
                    <span data-contrast="auto">can&nbsp;</span>
                    <span data-contrast="auto">
                      be used to enter contests with&nbsp;
                    </span>
                    <span data-contrast="auto">Power Token entr</span>
                    <span data-contrast="auto">y fees</span>
                    <span data-contrast="auto">
                      . These will be clearly identified in the Power Center.
                    </span>
                    <span data-ccp-props='{"201341983":0,"335559739":160,"335559740":259}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <strong>
                      <span data-contrast="auto">
                        <span data-ccp-charstyle="faq-category-content">
                          DEPOSITS AND WITHDRAWALS
                        </span>
                      </span>
                    </strong>
                    <span data-ccp-props='{"201341983":0,"335559738":40,"335559739":0,"335559740":259}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":2,"335559739":75,"335559740":210}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">
                          How can I deposit funds
                        </span>
                      </span>
                    </strong>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">?</span>
                      </span>
                    </strong>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":2,"335559739":75,"335559740":210}'>
                      &nbsp;
                    </span>
                  </p>
                  <ul>
                    <li
                      data-leveltext=""
                      data-font="Symbol"
                      data-listid="1"
                      data-aria-posinset="1"
                      data-aria-level="1"
                    >
                      <span data-contrast="none">
                        In jurisdictions where allowed,&nbsp;
                      </span>
                      <span data-contrast="none">Powerplay Systems</span>
                      <span data-contrast="none">
                        &nbsp;accepts all major credit/debit cards including
                        Visa, MasterCard, Discover and American Express.
                      </span>
                      <span data-ccp-props='{"201341983":2,"335559739":160,"335559740":240}'>
                        &nbsp;
                      </span>
                    </li>
                  </ul>
                  <ul>
                    <li
                      data-leveltext=""
                      data-font="Symbol"
                      data-listid="1"
                      data-aria-posinset="1"
                      data-aria-level="1"
                    >
                      <span data-contrast="none">
                        E-check/Interact &ndash; You may transfer funds directly
                        to your account using E-checks (US clients) or Interact
                        (Canadian clients)
                      </span>
                      <span data-ccp-props='{"201341983":2,"335559739":160,"335559740":240}'>
                        &nbsp;
                      </span>
                    </li>
                    <li
                      data-leveltext=""
                      data-font="Symbol"
                      data-listid="1"
                      data-aria-posinset="2"
                      data-aria-level="1"
                    >
                      <span data-contrast="none">Crytpo</span>
                      <span data-contrast="none">
                        &nbsp;Currency &ndash; You can transfer Bitcoin or
                        Ethereum directly to your personal Defy Games Address.
                      </span>
                      <span data-ccp-props='{"201341983":2,"335559739":160,"335559740":240}'>
                        &nbsp;
                      </span>
                    </li>
                    <li
                      data-leveltext=""
                      data-font="Symbol"
                      data-listid="1"
                      data-aria-posinset="3"
                      data-aria-level="1"
                    >
                      <span data-contrast="none">PayPal</span>
                      <span data-ccp-props='{"201341983":2,"335559739":160,"335559740":240}'>
                        &nbsp;
                      </span>
                    </li>
                  </ul>
                  <p>
                    <span data-contrast="auto">
                      **You may only deposit funds into your&nbsp;
                    </span>
                    <span data-contrast="auto">Powerplay Systems</span>
                    <span data-contrast="auto">
                      &nbsp;account with a payment method registered in
                      your&nbsp;
                    </span>
                    <span data-contrast="auto">name.*</span>
                    <span data-contrast="auto">*</span>
                    <span data-ccp-props='{"201341983":0,"335559739":160,"335559740":259}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">
                          What Is Your Withdrawal Policy?
                        </span>
                      </span>
                    </strong>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":2,"335559739":75,"335559740":210}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="auto">
                      All withdrawals will be processed either via wire transfer
                    </span>
                    <span data-contrast="auto">,&nbsp;</span>
                    <span data-contrast="auto">PayPay</span>
                    <span data-contrast="auto">,</span>
                    <span data-contrast="auto">&nbsp;or cheque.&nbsp;</span>
                    <span data-contrast="auto">
                      &nbsp;For confirmation of the final details of your
                      withdrawal request, you will receive an email from&nbsp;
                    </span>
                    <span data-contrast="auto">Powerplay Systems</span>
                    <span data-contrast="auto">
                      &nbsp;with the subject line &lsquo;Withdrawal
                      Request&nbsp;
                    </span>
                    <span data-contrast="auto">Completed.</span>
                    <span data-contrast="auto">&rsquo;</span>
                    <span data-ccp-props='{"201341983":0,"335559739":160,"335559740":259}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="auto">
                      Note: All checks under $2000 are sent via USPS
                    </span>
                    <span data-contrast="auto">&nbsp;or Canada Post</span>
                    <span data-contrast="auto">
                      . Checks $2000 and over will be sent via FedEx. The max
                      amount that can be processed to PayPal is $14,999.
                    </span>
                    <span data-ccp-props='{"201341983":0,"335559739":160,"335559740":259}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">
                          How do I submit a withdrawal request
                        </span>
                      </span>
                    </strong>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">?</span>
                      </span>
                    </strong>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":2,"335559739":75,"335559740":210}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="auto">If you click&nbsp;</span>
                    <span data-contrast="auto">here</span>
                    <span data-contrast="auto">
                      &nbsp;you will be directed to the withdrawal page. Please
                      follow the directions on the page.
                    </span>
                    <span data-ccp-props='{"201341983":0,"335559739":160,"335559740":259}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">
                          What is the withdrawal process
                        </span>
                      </span>
                    </strong>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">?</span>
                      </span>
                    </strong>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":2,"335559739":75,"335559740":210}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="auto">
                      Our Accounting Department processes withdrawals Monday -
                      Friday from 9 AM-5 PM. Any withdrawal requests that come
                      in after 5 PM on Friday will be processed in the order
                      that they were received starting the following Monday.
                      Once our Accounting Department processes your withdrawal
                      request (
                    </span>
                    <span data-contrast="auto">you'll</span>
                    <span data-contrast="auto">
                      &nbsp;receive a confirmation email), it typically takes
                      anywhere from 2-8 business days for you to receive your
                      prize.
                    </span>
                    <span data-ccp-props='{"201341983":0,"335559739":160,"335559740":259}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">
                          Why do I have to complete a W9 form&nbsp;
                        </span>
                      </span>
                    </strong>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">
                          prior to withdrawing a prize?
                        </span>
                      </span>
                    </strong>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":2,"335559739":75,"335559740":210}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="auto">
                      Our compliance and identity verification requirements
                      require PowerPlay Systems clients to complete a W-9 form
                      prior to withdrawing prizes for US citizens.
                    </span>
                    <span data-ccp-props='{"201341983":0,"335559739":160,"335559740":259}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <strong>
                      <span data-contrast="auto">
                        <span data-ccp-charstyle="faq-category-content">
                          ACCOUNT MANAGEMENT
                        </span>
                      </span>
                    </strong>
                    <span data-ccp-props='{"201341983":0,"335559738":40,"335559739":0,"335559740":259}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">What&nbsp;</span>
                      </span>
                    </strong>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">
                          information is required to open a Defy Games account
                        </span>
                      </span>
                    </strong>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">?</span>
                      </span>
                    </strong>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":2,"335559739":75,"335559740":210}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="auto">To</span>
                    <span data-contrast="auto">&nbsp;</span>
                    <span data-contrast="auto">open</span>
                    <span data-contrast="auto">&nbsp;an&nbsp;</span>
                    <span data-contrast="auto">a</span>
                    <span data-contrast="auto">ccount,</span>
                    <span data-contrast="auto">
                      &nbsp;you are required to provide your full name, address,
                      date of birth, email address and telephone number. If your
                      identity cannot be validated, you will be required to
                      submit additional information or documentation which may
                      include your valid state-issued ID.
                    </span>
                    <span data-ccp-props='{"201341983":0,"335559739":160,"335559740":259}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">How&nbsp;</span>
                      </span>
                    </strong>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">i</span>
                      </span>
                    </strong>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">s&nbsp;</span>
                      </span>
                    </strong>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">m</span>
                      </span>
                    </strong>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">y&nbsp;</span>
                      </span>
                    </strong>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">
                          information p
                        </span>
                      </span>
                    </strong>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">rotected?</span>
                      </span>
                    </strong>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":2,"335559739":75,"335559740":210}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="auto">All</span>
                    <span data-contrast="auto">&nbsp;</span>
                    <span data-contrast="auto">Powerplay Systems</span>
                    <span data-contrast="auto">
                      &nbsp;confidential information is safeguarded by SSL
                      (Secure Socket Layer), as represented by the padlock
                      visible on your browser&rsquo;s address tab. This ensures
                      the security of&nbsp;
                    </span>
                    <span data-contrast="auto">all</span>
                    <span data-contrast="auto">
                      &nbsp;private information provided by the website. We
                      encrypt all our private customer information, available to
                      our staff only when pertinent.
                    </span>
                    <span data-ccp-props='{"201341983":0,"335559739":160,"335559740":259}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">
                          Can I change my&nbsp;
                        </span>
                      </span>
                    </strong>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">Defy Games</span>
                      </span>
                    </strong>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">&nbsp;</span>
                      </span>
                    </strong>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">D</span>
                      </span>
                    </strong>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">isplay</span>
                      </span>
                    </strong>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">&nbsp;Name</span>
                      </span>
                    </strong>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">?</span>
                      </span>
                    </strong>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":2,"335559739":75,"335559740":210}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="auto">
                      You may change your display name one
                    </span>
                    <span data-contrast="auto">&nbsp;(1)</span>
                    <span data-contrast="auto">&nbsp;time. After&nbsp;</span>
                    <span data-contrast="auto">you make a</span>
                    <span data-contrast="auto">&nbsp;change,&nbsp;</span>
                    <span data-contrast="auto">
                      you display name is locked&nbsp;
                    </span>
                    <span data-contrast="auto">
                      you can not make any more changes.
                    </span>
                    <span data-ccp-props='{"201341983":0,"335559739":160,"335559740":259}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">
                          Can I create more than one account?
                        </span>
                      </span>
                    </strong>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":2,"335559739":75,"335559740":210}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="auto">Powerplay Systems</span>
                    <span data-contrast="auto">&nbsp;prohibits&nbsp;</span>
                    <span data-contrast="auto">participants</span>
                    <span data-contrast="auto">
                      &nbsp;from opening more than one account,&nbsp;
                    </span>
                    <span data-contrast="auto">in order to</span>
                    <span data-contrast="auto">
                      &nbsp;ensure fair play and uphold the integrity of our
                      contests. If for some reason you forget your password you
                      can reset it 
                    </span>
                    <a href="https://myaccount.draftkings.com/resetpassword">
                      <span data-contrast="auto">here</span>
                    </a>
                    <span data-contrast="auto">
                      :  If you forget your username or email used to register
                      please contact&nbsp;
                    </span>
                    <span data-contrast="auto">support@</span>
                    <span data-contrast="auto">Powerplay</span>
                    <span data-contrast="auto">&nbsp;Systems</span>
                    <span data-contrast="auto">
                      .com and an agent will be happy to assist you with
                      retrieving that information.
                    </span>
                    <span data-ccp-props='{"201341983":0,"335559739":160,"335559740":259}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="auto">
                      Please note: if the same individual sets up multiple
                      accounts,&nbsp;
                    </span>
                    <span data-contrast="auto">Powerplay Systems</span>
                    <span data-contrast="auto">
                      &nbsp;will deactivate all accounts except one, and any
                      potential winnings may not be honored from all accounts.
                      Any accounts that are set up illegitimately will be
                      deactivated and winnings will not be honored.
                    </span>
                    <span data-ccp-props='{"201341983":0,"335559739":160,"335559740":259}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">Can I&nbsp;</span>
                      </span>
                    </strong>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">p</span>
                      </span>
                    </strong>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">
                          ermanently&nbsp;
                        </span>
                      </span>
                    </strong>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">d</span>
                      </span>
                    </strong>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">elete</span>
                      </span>
                    </strong>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">&nbsp;</span>
                      </span>
                    </strong>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">m</span>
                      </span>
                    </strong>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">y&nbsp;</span>
                      </span>
                    </strong>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">a</span>
                      </span>
                    </strong>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">ccount?</span>
                      </span>
                    </strong>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":2,"335559739":75,"335559740":210}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="auto">Yes,&nbsp;</span>
                    <span data-contrast="auto">
                      use the Delete Account link in the My Account page
                    </span>
                    <span data-contrast="auto">.</span>
                    <span data-ccp-props='{"201341983":0,"335559739":160,"335559740":259}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">
                          What should I do if I believe my account as been
                          misallocated or compromised?
                        </span>
                      </span>
                    </strong>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":2,"335559739":75,"335559740":210}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="auto">
                      If you believe your account has been misallocated,&nbsp;
                    </span>
                    <span data-contrast="auto">compromised,</span>
                    <span data-contrast="auto">
                      &nbsp;or mishandled please contact
                      support@powerplaysystems.com for assistance. Please
                      provide all pertinent information related to your claim
                      and a dedicated member of our Customer Service team will
                      address your support ticket within 24 hours.
                    </span>
                    <span data-ccp-props='{"201341983":0,"335559739":160,"335559740":259}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">
                          How are prize claims handled for closed accounts
                        </span>
                      </span>
                    </strong>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">?</span>
                      </span>
                    </strong>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":2,"335559739":75,"335559740":210}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="auto">
                      If any consumer chooses to close his or her PowerPlay
                      Systems account, we will distribute all prizes in the
                      account before the close of business on the next full
                      business day. If an account is closed prior to the
                      conclusion of a customer&rsquo;s live contest(s)&nbsp;
                    </span>
                    <span data-contrast="auto">all</span>
                    <span data-contrast="auto">
                      &nbsp;prizes from the contest will be distributed to the
                      player within five business days after the contest ends.
                    </span>
                    <span data-ccp-props='{"201341983":0,"335559739":160,"335559740":259}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-ccp-props='{"201341983":0,"335559739":160,"335559740":259}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-ccp-props='{"201341983":0,"335559739":160,"335559740":259}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-ccp-props='{"201341983":0,"335559739":160,"335559740":259}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-ccp-props='{"201341983":0,"335559739":160,"335559740":259}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <strong>
                      <span data-contrast="auto">
                        <span data-ccp-charstyle="faq-category-content">
                          TEAM
                        </span>
                      </span>
                    </strong>
                    <strong>
                      <span data-contrast="auto">
                        <span data-ccp-charstyle="faq-category-content">
                          &nbsp;MANAGEMENT
                        </span>
                      </span>
                    </strong>
                    <span data-ccp-props='{"201341983":0,"335559738":40,"335559739":0,"335559740":259}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">When&nbsp;</span>
                      </span>
                    </strong>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">d</span>
                      </span>
                    </strong>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">o&nbsp;</span>
                      </span>
                    </strong>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">team</span>
                      </span>
                    </strong>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">&nbsp;</span>
                      </span>
                    </strong>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">e</span>
                      </span>
                    </strong>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">ntries&nbsp;</span>
                      </span>
                    </strong>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">and</span>
                      </span>
                    </strong>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">&nbsp;</span>
                      </span>
                    </strong>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">e</span>
                      </span>
                    </strong>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">dits&nbsp;</span>
                      </span>
                    </strong>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">c</span>
                      </span>
                    </strong>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">lose?</span>
                      </span>
                    </strong>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":2,"335559739":75,"335559740":210}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="auto">
                      Contest entry will close approximately one minute before
                      the start of the first game&nbsp;
                    </span>
                    <span data-contrast="auto">
                      among players you have selected
                    </span>
                    <span data-contrast="auto">.</span>
                    <span data-contrast="auto">
                      &nbsp;You may make changes to your team at any point up to
                      this point.
                    </span>
                    <span data-contrast="auto">&nbsp;</span>
                    <span data-ccp-props='{"201341983":0,"335559739":160,"335559740":259}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">
                          Can I change my&nbsp;
                        </span>
                      </span>
                    </strong>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">team</span>
                      </span>
                    </strong>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">
                          &nbsp;after submitting an entry?
                        </span>
                      </span>
                    </strong>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":2,"335559739":75,"335559740":210}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="auto">
                      You can edit your full roster as many times as you like
                      before the contest closes
                    </span>
                    <span data-contrast="auto">&nbsp;(No Powers required)</span>
                    <span data-contrast="auto">
                      . You can continue to swap any player&nbsp;
                    </span>
                    <span data-contrast="auto">
                      during the contest if you have&nbsp;
                    </span>
                    <span data-contrast="auto">P</span>
                    <span data-contrast="auto">owers remaining.&nbsp;</span>
                    <span data-ccp-props='{"201341983":0,"335559739":160,"335559740":259}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">
                          How do I withdraw from a contest?
                        </span>
                      </span>
                    </strong>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":2,"335559739":75,"335559740":210}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="auto">Participants</span>
                    <span data-contrast="auto">
                      &nbsp;can withdraw from any contest&nbsp;
                    </span>
                    <span data-contrast="auto">as long as</span>
                    <span data-contrast="auto">
                      &nbsp;they meet the following conditions:
                    </span>
                    <span data-ccp-props='{"201341983":0,"335559739":160,"335559740":259}'>
                      &nbsp;
                    </span>
                  </p>
                  <ul>
                    <li
                      data-leveltext=""
                      data-font="Symbol"
                      data-listid="3"
                      data-aria-posinset="1"
                      data-aria-level="1"
                    >
                      <span data-contrast="none">Participants</span>
                      <span data-contrast="none">&nbsp;may&nbsp;</span>
                      <span data-contrast="none">withdraw</span>
                      <span data-contrast="none">
                        &nbsp;from unfilled Head-to-Head or League contests at
                        any time.
                      </span>
                      <span data-ccp-props='{"201341983":2,"335559739":160,"335559740":240}'>
                        &nbsp;
                      </span>
                    </li>
                    <li
                      data-leveltext=""
                      data-font="Symbol"
                      data-listid="3"
                      data-aria-posinset="2"
                      data-aria-level="1"
                    >
                      <span data-contrast="none">Participants</span>
                      <span data-contrast="none">&nbsp;may&nbsp;</span>
                      <span data-contrast="none">withdraw&nbsp;</span>
                      <span data-contrast="none">
                        from Guaranteed games until&nbsp;
                      </span>
                      <span data-contrast="none">60</span>
                      <span data-contrast="none">
                        &nbsp;minutes before start time. 
                      </span>
                      <span data-ccp-props='{"201341983":2,"335559739":160,"335559740":240}'>
                        &nbsp;
                      </span>
                    </li>
                    <li
                      data-leveltext=""
                      data-font="Symbol"
                      data-listid="3"
                      data-aria-posinset="3"
                      data-aria-level="1"
                    >
                      <span data-contrast="none">Participants</span>
                      <span data-contrast="none">&nbsp;may NOT&nbsp;</span>
                      <span data-contrast="none">withdraw</span>
                      <span data-contrast="none">
                        &nbsp;from a filled&nbsp;
                      </span>
                      <span data-contrast="none">Head to Head</span>
                      <span data-contrast="none">&nbsp;contest.</span>
                      <span data-ccp-props='{"201341983":2,"335559739":160,"335559740":240}'>
                        &nbsp;
                      </span>
                    </li>
                  </ul>
                  <p>
                    <span data-ccp-props='{"201341983":2,"335559685":720,"335559739":160,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="auto">Go to the "My&nbsp;</span>
                    <span data-contrast="auto">Game Center</span>
                    <span data-contrast="auto">" page and click&nbsp;</span>
                    <span data-contrast="auto">
                      the &lsquo;X&rsquo; on the game card you wish to withdraw
                      from.
                    </span>
                    <span data-ccp-props='{"201341983":0,"335559739":160,"335559740":259}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="auto">
                      If you have any issues withdrawing an entry, please
                      email&nbsp;
                    </span>
                    <a href="mailto:support@Powerplaysystems.com">
                      <span data-contrast="none">
                        <span data-ccp-charstyle="Hyperlink">support@</span>
                      </span>
                      <span data-contrast="none">
                        <span data-ccp-charstyle="Hyperlink">
                          Powerplaysystems
                        </span>
                      </span>
                      <span data-contrast="none">
                        <span data-ccp-charstyle="Hyperlink">.com</span>
                      </span>
                    </a>
                    <span data-ccp-props='{"201341983":0,"335559739":160,"335559740":259}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-ccp-props='{"201341983":0,"335559739":160,"335559740":259}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="Normal (Web)"> </span>
                      </span>
                    </strong>
                    <strong>
                      <span data-contrast="auto">
                        <span data-ccp-charstyle="faq-category-content">
                          GAMEPLAY AND CONTEST RULES
                        </span>
                      </span>
                    </strong>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":2,"335559739":225,"335559740":240}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">
                          How Do I Enter Contests?
                        </span>
                      </span>
                    </strong>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":2,"335559739":75,"335559740":210}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="auto">A</span>
                    <span data-contrast="auto">ll available&nbsp;</span>
                    <span data-contrast="auto">games can be entered</span>
                    <span data-contrast="auto">&nbsp;directly from&nbsp;</span>
                    <span data-contrast="auto">the Power Center.</span>
                    <span data-contrast="auto">
                      &nbsp;Choose your game&nbsp;
                    </span>
                    <span data-contrast="auto">and&nbsp;</span>
                    <span data-contrast="auto">click&nbsp;</span>
                    <span data-contrast="auto">&lsquo;E</span>
                    <span data-contrast="auto">nter</span>
                    <span data-contrast="auto">&rsquo;</span>
                    <span data-contrast="auto">.</span>
                    <span data-ccp-props='{"201341983":0,"335559739":160,"335559740":259}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">
                          Is there a limit on the&nbsp;
                        </span>
                      </span>
                    </strong>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">number</span>
                      </span>
                    </strong>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">
                          &nbsp;of entries I can submit?
                        </span>
                      </span>
                    </strong>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":2,"335559739":75,"335559740":210}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="auto">
                      Yes, each contest has a maximum&nbsp;
                    </span>
                    <span data-contrast="auto">of one (1) entry.</span>
                    <span data-contrast="auto"> </span>
                    <span data-ccp-props='{"201341983":0,"335559739":160,"335559740":259}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">
                          What are Powers?
                        </span>
                      </span>
                    </strong>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":2,"335559739":75,"335559740":210}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="auto">
                      <span data-ccp-parastyle="heading 3">
                        Powers give you the ability to make changes to&nbsp;
                      </span>
                    </span>
                    <span data-contrast="auto">
                      <span data-ccp-parastyle="heading 3">
                        your team during the live game. Powers can be used to
                        swap players, boost points, or prevent scores against.
                        You can read more by clicking &rsquo;learn more&rsquo;
                        on any game card.
                      </span>
                    </span>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":2,"335559739":75,"335559740":210}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":2,"335559739":75,"335559740":210}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">
                          What happens if one of my players does not play or has
                          their game cancelled?
                        </span>
                      </span>
                    </strong>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":2,"335559739":75,"335559740":210}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="auto">If</span>
                    <span data-contrast="auto">
                      &nbsp;one of your players does not play,&nbsp;
                    </span>
                    <span data-contrast="auto">and you do not swap&nbsp;</span>
                    <span data-contrast="auto">them</span>
                    <span data-contrast="auto">
                      &nbsp;during the live game,&nbsp;
                    </span>
                    <span data-contrast="auto">
                      that player will receive 0 points.
                    </span>
                    <span data-contrast="auto">&nbsp;</span>
                    <span data-ccp-props='{"201341983":0,"335559739":160,"335559740":259}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">
                          What Happens If A Real-Life Game Is
                          Cancelled/Delayed/Postponed?
                        </span>
                      </span>
                    </strong>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":2,"335559739":75,"335559740":210}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="auto">
                      Please visit the respective 
                    </span>
                    <a href="https://www.draftkings.com/help/mlb">
                      <span data-contrast="auto">Contest Rules</span>
                    </a>
                    <span data-contrast="auto">
                       page for each sport offered to view the&nbsp;
                    </span>
                    <span data-contrast="auto">c</span>
                    <span data-contrast="auto">ancellation and&nbsp;</span>
                    <span data-contrast="auto">p</span>
                    <span data-contrast="auto">ostponement policies.</span>
                    <span data-ccp-props='{"201341983":0,"335559739":160,"335559740":259}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">
                          What happens if two participants tie in a contest?
                        </span>
                      </span>
                    </strong>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":2,"335559739":75,"335559740":210}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="auto">
                      If there is a tie at the end of the contest,&nbsp;
                    </span>
                    <span data-contrast="auto">participants</span>
                    <span data-contrast="auto">
                      &nbsp;included in the tie will evenly split the related
                      prize pool positions. 
                    </span>
                    <span data-ccp-props='{"201341983":0,"335559739":160,"335559740":259}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="auto">For example:</span>
                    <span data-ccp-props='{"201341983":0,"335559739":160,"335559740":259}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="auto">If two&nbsp;</span>
                    <span data-contrast="auto">participants</span>
                    <span data-contrast="auto">
                      &nbsp;tie for 1st place, and 1st place pays $20 and 2nd
                      place pays $10, we add the combined&nbsp;
                    </span>
                    <span data-contrast="auto">
                      places then split that among the tied parties. Each would
                      receive $15.00.
                    </span>
                    <span data-ccp-props='{"201341983":0,"335559739":160,"335559740":259}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <strong>
                      <span data-contrast="none">
                        <span data-ccp-parastyle="heading 3">
                          How do you determine the start time for in-game
                          contests?
                        </span>
                      </span>
                    </strong>
                    <span data-ccp-props='{"134233117":true,"134233118":true,"201341983":2,"335559739":75,"335559740":210}'>
                      &nbsp;
                    </span>
                  </p>
                  <p>
                    <span data-contrast="auto">
                      All game cards in the Power Center
                    </span>
                    <span data-contrast="auto">&nbsp;</span>
                    <span data-contrast="auto">
                      reflect the start times. Once you enter&nbsp;
                    </span>
                    <span data-contrast="auto">a contest,&nbsp;</span>
                    <span data-contrast="auto">the start time&nbsp;</span>
                    <span data-contrast="auto">countdown&nbsp;</span>
                    <span data-contrast="auto">
                      will show in My Game Center on the game card.
                    </span>
                    <span data-ccp-props='{"201341983":0,"335559739":160,"335559740":259}'>
                      &nbsp;
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(FAQ);
