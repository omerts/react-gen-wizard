import React from 'react';
import Wizard from '../src/Wizard.react';
import TestComponent from './TestComponent.react';

// Component will get data from props.data, and will have to implement
// an onNext, and onBack, in both cases outputing data
let testdata = [{name: 'Step 1', component: TestComponent},
                {name: 'Step 2', component: TestComponent},
                {name: 'Step 3', component: TestComponent}];

React.render(<Wizard components={testdata} data={{step: 1}} />,
             document.getElementById('example'), () => {
               console.log('rendered');
             });