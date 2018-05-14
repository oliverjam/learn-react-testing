import React from 'react';

class Toggle extends React.Component {
  state = { toggled: false };
  render() {
    return (
      <div>
        <button
          onClick={() =>
            this.setState(prevState => ({ toggled: !prevState.toggled }))
          }
        >
          {this.state.toggled ? 'Hide' : 'Show'}
        </button>
        <div>this.props.children</div>
      </div>
    );
  }
}

export default Toggle;
