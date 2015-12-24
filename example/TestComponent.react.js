import React from 'react';

export default class TestComponent extends React.Component {
  _getData(step) {
    var dataToPass = Object.assign({}, this.props.data);
    dataToPass.step = step;

    return dataToPass;
  }

  onNext() {
    console.log('onNext called');
    this.props.onNextEnded(this._getData(++this.props.data.step));
  }

  onPrev() {
    console.log('onPrev called');    
    this.props.onPrevEnded(this._getData(--this.props.data.step));
  }

  render() {
    return <div>Hello I am just a test component :). I am step {this.props.data.step}</div>;
  }
}

