import React from 'react';
import ReactDOM from 'react-dom';
import Wizard from 'react-gen-wizard';
import TestComponent from './TestComponent.react';

// Component will get data from props.data, and will have to implement
// an onNext, and onBack, in both cases outputing data
let testdata = [{name: 'Step 1', component: TestComponent},
                {name: 'Step 2', component: TestComponent},
                {name: 'Step 3', component: TestComponent}];

ReactDOM.render(<Wizard components={testdata} data={{step: 1}} onFinish={() => {location.reload();}} />,
                 document.getElementById('example'), () => {
                   console.log('rendered');
                 });

