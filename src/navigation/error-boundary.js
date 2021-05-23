import React, { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
    this.reload.bind(this);
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  reload() {
    window.location.reload();
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="ui container">
          <div className="ui middle aligned stackable grid login-container">
            <div className="row">
              <div className="centered ten wide column text-center">
                <div className="ui segment">
                  <h1>Oop!</h1>
                  <p className="text-size-large">Something went wrong. Try Again.</p>
                  <p
                    className="text-color-primary cursor-pointer text-size-large"
                    onClick={this.reload}>
                    Click here to Reload.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
