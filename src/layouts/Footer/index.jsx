import styles from "./styles.module.css";

function Footer(props) {
  return (
    <div className={styles.footerContainer}>
      <h1>
        Footer - {props.name} - {props.children}
      </h1>
    </div>
  );
}

export default Footer;
