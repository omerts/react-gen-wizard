#!!!This is work in progress, and should not yet be used. This readme, is currently invalid.

# react-gen-wizard
Generic react component for creating wizards, and passing arbitrary data between the wizard's steps.

## Prerequisites ##
- React 0.13, and above

## Installation ##
```
npm install react-gen-wizard
```

## How to use ##
### Writing your component ###
Each step in the wizard is a react component. 
Your component needs to implement two methods, *onPrev()* & *onNext()*. These methods will be called if the previous, or next, button has been clicked while the component was active. These methods are used to add new, change, and/or reset data, for the next or previous step. Two callback props, *onPrevEnded(dataObj)* & *onNextEnded(dataObj)*, are injected into your component, and should be raised at the end of onPrev, and onNext. The dataObj parameter, will be passed to the next, or previous, component, depending on what the user clicked.

####Example step component:####
```javascript
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
```


