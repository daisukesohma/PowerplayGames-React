import React from "react";
import styles from "./content.module.scss";
import Section from "./Section";

const Content = ({contents, title, children}) => {
  return (
    <section className={styles.root}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.optionals}>{children}</div>
      {contents.map((content, index) => (
        <Section key={index} {...content} pageTitle={title} />
      ))}
    </section>
  );
};

export default Content;
