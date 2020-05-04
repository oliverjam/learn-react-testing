import React from "react";
import "whatwg-fetch"; // node has no fetch so we need to polyfill for the tests
import jadenCase from "../utils/jadenCase";

function Markdownifier() {
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("https://micro-marked-nqbbqbtkrq.now.sh/", {
      method: "POST",
      body: JSON.stringify({ markdown: input }),
    })
      .then((res) => res.text())
      .then(setOutput);
  };
  return (
    <section className="section section--markdown" id="markdownifier">
      <form onSubmit={handleSubmit}>
        <h2>Markdownifier</h2>
        <label htmlFor="markdown-input">
          Enter markdown
          <textarea
            id="markdown-input"
            className="form__input form__input--markdown"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows="6"
          />
        </label>
        <button type="submit" className="form__button form__button--markdown">
          Markdownify
        </button>
      </form>
      {output && <output dangerouslySetInnerHTML={{ __html: output }} />}
    </section>
  );
}

export default Markdownifier;
