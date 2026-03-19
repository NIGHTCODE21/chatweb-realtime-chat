interface Props {
  user: string;
  text: string;
}

const Message = ({ user, text }: Props) => {
  return (
    <p>
      <b>{user}:</b> {text}
    </p>
  );
};

export default Message;
