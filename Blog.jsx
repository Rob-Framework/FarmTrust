import React, { useState } from "react";

function Blog() {
  const [state, setState] = useState(false);

  let url = "";

  return (
    <div className="App">
      <a
        href={
          "https://medium.com/@artificial_leap/introducing-rob-the-farm-surveying-robot-7296d48546ef"
        }
      >
        Introducing Rob
      </a>
    </div>
  );
}
export default Blog;
