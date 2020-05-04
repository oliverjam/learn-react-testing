import React from "react";
import jadenCase from "../utils/jadenCase";

function Jadenizer() {
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const jadenizedString = jadenCase(input);
    setOutput(jadenizedString);
  };
  return (
    <section className="section jaden">
      <form onSubmit={handleSubmit}>
        <h2>Jadenizer</h2>
        <label htmlFor="jadenizer-input">
          Enter text for Jadenization
          <input
            id="jadenizer-input"
            className="form__input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </label>
        <button type="submit" className="form__button">
          Jadenize
        </button>
      </form>
      {output && <output>{output}</output>}
    </section>
  );
}

export default Jadenizer;
