import React from 'react';

class Button extends React.Component {
  state = { clicked: false };

  render() {
    return (
      <button onClick={() => this.setState({ clicked: !this.state.clicked })}>
        {this.state.clicked ? 'Just clicked' : this.props.children}
      </button>
    );
  }
}

export default Button;
