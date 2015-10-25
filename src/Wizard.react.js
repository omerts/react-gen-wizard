import React from 'react';
import {IconButton} from 'material-ui';

export default class Wizard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {currentComponentIndex: 0, 
                  data: props.initalData};
  }

  _getComponentsBreadcrumbs() {
    return this.props.components.map((component) => {
      let className = 
        (this.props.components[this.state.currentComponentIndex] === 
         component) ? 'active' : 'inactive';

      return <li className={className}>{component.name}</li>;
    });
  }

  onNextEnded(data) {
    if (this.state.currentComponentIndex === this.props.components.length - 1) {
      this.props.onFinish(this.state.data);
    } else {
      this.state.currentComponentIndex++;
      this.state.data = data;
      this.setState(this.state);
    }
  }

  onPrevEnded(data) {
    this.state.currentComponentIndex--;
    this.state.data = data;
    this.setState(this.state);
  }

  _callOnNext() {
    this.refs.currentComponent.onNext();
  }

  _callOnPrev() {
    this.refs.currentComponent.onPrev();
  }

  render () {
    let nextClass = 'fa fa-';
    nextClass += 
      (this.state.currentComponentIndex 
       !== this.props.components.length - 1) ? 'arrow-right' : 'paper-plane';

    let currentComponent = 
      React.createElement(this.props.components[this.state.currentComponentIndex].component, 
                          Object.assign(this.props.components[this.state.currentComponentIndex].additionalProps || {},
                                        {onNextEnded: this.onNextEnded.bind(this),
                                         onPrevEnded: this.onPrevEnded.bind(this),
                                         data: this.state.data,
                                         ref: 'currentComponent'}));

    return (
      <div className='react-gen-wizard'>
        <ul className='breadcrumbs'>
          {this._getComponentsBreadcrumbs()}
        </ul>
        <h3 className='component-title'>
          {this.props.components[this.state.currentComponentIndex].name}
        </h3>
        <div className='component-wrapper'>
          <div className='current-component'>
            {currentComponent}
          </div>
          <div className='buttons'>
            {(this.state.currentComponentIndex !== 0) &&
              <IconButton className='icon-prev'
                          iconClassName='fa fa-arrow-left'
                          mini={true}
                          onClick={this._callOnPrev.bind(this)} />
            }
            <IconButton className='icon-next'
                        iconClassName={nextClass}
                        mini={true}
                        onClick={this._callOnNext.bind(this)} />
          </div>
        </div>
      </div>
    );
  }
}

Wizard.propTypes = {
  components: React.PropTypes.arrayOf(React.PropTypes.shape({
                                        name: React.PropTypes.string.isRequired,
                                        component: React.PropTypes.object.isRequired,
                                        additionalProps: React.PropTypes.object
                                      })).isRequired,
  onFinish: React.PropTypes.func.isRequired,
  initialData: React.PropTypes.object
};