import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Join = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleJoin = () => {
    if (!name) return alert("Enter name");
    navigate(`/chat/${name}`);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>ChatWeb</h1>
      <input
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br /><br />
      <button onClick={handleJoin}>Join</button>
    </div>
  );
};

export default Join;
