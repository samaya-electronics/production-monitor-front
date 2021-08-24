import classes from './message.css';
const Message = (props) => {
    const classType = "message "+props.message.type
  return (
    <article className={classType +" "+classes.notificatioMessage}>
      <div className="message-body">
            {props.message.val}
        </div>
    </article>
  );
};

export default Message;
