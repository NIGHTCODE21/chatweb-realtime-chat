import React, { useState } from "react";
import { Link } from "react-router-dom";

function Join() {

  const [name, setName] = useState("");

  return (
    <div>

      <h2>ChatWeb</h2>

      <input
        type="text"
        placeholder="Enter name"
        onChange={(e) => setName(e.target.value)}
      />

      <Link to={`/chat/${name}`}>
        <button>Join</button>
      </Link>

    </div>
  );
}

export default Join;
