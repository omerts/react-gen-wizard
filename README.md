###Only React 0.14, and up, is supported.###

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

## Style ##
In order to use the default style, import the css/Wizard.css file into your page. 

##Using the wizard component##

```javascript
import Wizard from 'react-gen-wizard';

export default class TestWizard extends React.Component {
  render() {
    return <Wizard components={acquireComponents} onFinish={this.props.onFinish} />;
  }
}
```

- ***onFinish(data)*** - Will be raised once the last step raises the onNextEnded callback. It receives the data from the last step.
- ***components***     - Configuration of components that will be used as steps. See below.

###Configuring your steps components###
The Wizard component, has a property called components, which is an array of objects, that configure each wizard step.
Each component configuration object has the following shape:
```javascript
{
    name: 'Title',
    component: StepComponentName,
    additionalProps: {},
    showButtons: true,
    breadcrumbNamePath: 'prop.to.show'
  }
  ```
- ***name*** - Is used as the steps title, and in case breadcrumbNamePath doesn't exist, will be used in breadcrumbs.
- ***component*** - Your step component.
- ***additionalProps***(optional) - Props you can inject directly into the current step.
- ***showButtons*** (optional, default true) - Should the next and previous buttons be shown. This is used for cases your step, should automatically move to the next, or previous, step. The automatic move would occur by your component raising the onNextEnded() || onPrevEnded().
- ***breadcrumbNamePath***(optional) - Path to property in the passed around data object, that will be used as the breadcrumb title 

## Example Code ##
The example folder contains an example jspm project.

cd into the example folder

Install jspm & jspm-server
```
npm install jspm jspm-server
```

Install dependencies
```
jspm install
```

Run
```
jspm-server
```

