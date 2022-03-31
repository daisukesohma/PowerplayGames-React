import React from "react";
import Terms from "./Terms";
import styles from "./terms.module.scss";

const TermsSection = () => {
  return (
    <section className={styles.root}>
      <h1 className={styles.title}>
        <span className="__primary-text">Defy Games</span> Terms of Use
      </h1>
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
      {Terms.map(({title, content}, index) => (
        <section key={index} id={title.toLowerCase().replaceAll(' ', '-')}>
          <h2 id={title}>{title}</h2>
          {content}
        </section>
      ))}
    </section>
  );
};

export default TermsSection;
