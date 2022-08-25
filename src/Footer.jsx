function Footer(props) {
  return (
    <div>
      <h1>
        Footer - {props.name} - {props.children}
      </h1>
    </div>
  );
}

export default Footer;
