interface Props {
  input: string;
  setInput: (val: string) => void;
  sendMessage: () => void;
  nextUser: () => void;
}

const Input = ({ input, setInput, sendMessage, nextUser }: Props) => {
  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type message..."
      />
      <button onClick={sendMessage}>Send</button>
      <button onClick={nextUser}>Next 🔀</button>
    </div>
  );
};

export default Input;
