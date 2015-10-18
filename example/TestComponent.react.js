import React from 'react';

export default class TestComponent extends React.Component {
  onNext() {
    console.log('onNext called');
    this.props.data.step = ++this.props.data.step;
    this.props.onNextEnded(this.props.data);
  }

  onPrev() {
    console.log('onPrev called');
    this.props.data.step = --this.props.data.step;
    this.props.onPrevEnded(this.props.data);
  }

  render() {
    return <div>Hello I am just a test component :). I am step {this.props.data.step}</div>;
  }
}