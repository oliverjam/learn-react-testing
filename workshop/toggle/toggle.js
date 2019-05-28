import React from "react";

function Toggle(props) {
  const [toggled, setToggled] = React.useState(false);
  return (
    <React.Fragment>
      <button onClick={() => setToggled(oldToggled => !oldToggled)}>
        {toggled ? "Hide" : "Show"}
      </button>
      {toggled && <div>{props.children}</div>}
    </React.Fragment>
  );
}

export default Toggle;
