import React from 'react';

class Toggle extends React.Component {
  state = { toggled: false };
  render() {
    return (
      <React.Fragment>
        <button
          onClick={() =>
            this.setState(prevState => ({ toggled: !prevState.toggled }))
          }
        >
          {this.state.toggled ? 'Hide' : 'Show'}
        </button>
        <div>{this.props.children}</div>
      </React.Fragment>
    );
  }
}

export default Toggle;
