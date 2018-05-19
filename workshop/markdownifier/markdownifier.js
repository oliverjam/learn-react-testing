import React from 'react';
import jadenCase from '../utils/jadenCase';

class Markdownifier extends React.Component {
  state = { input: '', output: '' };

  markdownifier = event => {
    event.preventDefault();
    const res = fetch('https://micro-marked-owlpwusnbx.now.sh', {
      method: 'POST',
      body: JSON.stringify({ markdown: this.state.input }),
    })
      .then(res => res.text())
      .then(html => this.setState({ output: html }));
  };

  render() {
    const { input, output } = this.state;
    return (
      <section className="section section--markdown" id="markdownifier">
        <form onSubmit={this.markdownifier}>
          <h2>Markdownifier</h2>
          <label htmlFor="markdown-input">
            Enter markdown
            <textarea
              id="markdown-input"
              className="form__input form__input--markdown"
              value={input}
              onChange={e => this.setState({ input: e.target.value })}
              rows="6"
            />
          </label>
          <button type="submit" className="form__button form__button--markdown">
            Markdownify
          </button>
        </form>
        {output && <div dangerouslySetInnerHTML={{ __html: output }} />}
      </section>
    );
  }
}

export default Markdownifier;
