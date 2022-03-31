import React from "react";
import { Link } from "react-router-dom";
const EasyPlayFooter = () => {
  return (
    <div className="easy_footer">
      <div className="block">
        <Link to="#">
          <span className="firstChild">My Account</span>
        </Link>{" "}
        <br />
        <Link to="#">
          <span className="lastChild">Power Center</span>
        </Link>
      </div>
      <div className="block">
        <Link to="#">
          <span className="firstChild">FAQs</span>
        </Link>{" "}
        <br />
        <Link to="#">
          <span className="firstChild">{`Trust & Safety`}</span>
        </Link>{" "}
        <br />
        <Link to="#">
          <span className="lastChild">Contact Us</span>
        </Link>
      </div>
      <div className="block">
        <Link to="#">
          <span className="firstChild">Terms of use</span>
        </Link>{" "}
        <br />
        <Link to="#">
          <span className="firstChild">Privacy</span>
        </Link>{" "}
        <Link to="#">
          <span className="firstChild">Account Security</span>
        </Link>{" "}
        <br />{" "}
        <Link to="#">
          <span>Responsible Gaming</span>
        </Link>
      </div>
      <div className="copyrights">
        <p>Copyright © 2021 PowerPlay Systems Inc. All Rights Reserved</p>
      </div>
    </div>
  );
};

export default EasyPlayFooter;
