import logo from "../../assets/new-logo-2.png";
import { Link } from "react-router-dom";
import styles from "./index.module.scss";
import { useMediaQuery } from "react-responsive";

const Footer = (props) => {
  const isMobile = useMediaQuery({ query: "(max-width: 414px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <footer
      className={`${styles.root} ${props.className} ${
        props.isBlack ? styles.style_2 : ""
      }`}
    >
      <div className={styles.container}>
        {isMobile || isTablet ? (
          <>
            <div className={styles.linksWrapper}>
              <span>Essentials</span>
              <span>Legal Privacy</span>
              <span>Company</span>
              <Link to="/my-account">My Account</Link>
              {/* <Link to="/my-account">Sponsor a contest</Link> */}
              <hr className={styles.__hr_styles} />

              <Link to="/faqs">FAQs</Link>
              <Link to="/trust-and-safety">Trust & Safety</Link>
              <Link to="/trust-and-safety">About Us</Link>
              <hr className={styles.__hr_styles} />

              <Link to="/terms">Terms of use</Link>
              <Link to="/privacy">Privacy</Link>
              <Link to="/account-security">Account Security</Link>
              <hr className={styles.__hr_styles} />
            </div>
            <p className={styles.copyWriteSection}>
              Copyright © 2021 PowerPlay Systems Inc. - All Rights Reserved
            </p>
          </>
        ) : (
          <>
            <Link to="/">
              <img src={logo} alt="" className={styles.logo} />
            </Link>
            <div className={styles.linksWrapper}>
              <span>Essentials</span>
              <span>Legal Privacy</span>
              <span>Company</span>
              <Link to="/my-account">My Account</Link>
              <Link to="/terms">Terms of use</Link>
              <Link to="/faqs">FAQs</Link>
              <Link to="/power-center">Power Center</Link>
              <Link to="/privacy">Privacy</Link>
              <Link to="/trust-and-safety">Trust & Safety </Link>
              <Link to="/responsible-gaming">Responsible Gaming</Link>
              <Link to="/account-security">Account Security</Link>
              <Link to="/contact-us">Contact Us</Link>
            </div>
            <p className={styles.copyWriteSection}>
              Copyright © 2021 PowerPlay Systems Inc. - All Rights Reserved{" "}
              <br /> 140 Yonge St., S.200, Toronto, ON, M5C 1X6 |
              info@powerplaysystems.com | 1-888-808-7697
            </p>
          </>
        )}
      </div>
    </footer>
  );
};

export default Footer;
