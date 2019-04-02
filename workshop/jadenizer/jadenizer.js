import React from "react";
import jadenCase from "../utils/jadenCase";

class Jadenizer extends React.Component {
  state = {
    input: "",
    output: ""
  };

  jadenize = event => {
    event.preventDefault();
    this.setState({ output: jadenCase(this.state.input) });
  };

  render() {
    const { input, output } = this.state;
    return (
      <section className="section section--jaden" id="jadenizer">
        <form onSubmit={this.jadenize}>
          <h2>Jadenizer</h2>
          <label htmlFor="jadenizer-input">
            Enter text for Jadenization
            <input
              id="jadenizer-input"
              className="form__input"
              value={input}
              onChange={e => this.setState({ input: e.target.value })}
            />
          </label>
          <button type="submit" className="form__button form__button--jaden">
            Jadenize
          </button>
        </form>
        {output && <output data-testid="output">{output}</output>}
      </section>
    );
  }
}

export default Jadenizer;
