const Panel = (props) => {
  return (
    <article className={"message "+props.classes}>
      <div className="message-header">
        <p>{props.label}</p>
      </div>
      <div className="message-body">
          {props.children}
      </div>
    </article>
  );
};

export default Panel;
