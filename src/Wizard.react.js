import React from 'react';
import {IconButton} from 'material-ui';
import pathval from 'pathval';

export default class Wizard extends React.Component {
  constructor(props) {
    super(props);
    this._originalData = props.initalData || {};

    this.state = {currentComponentIndex: 0,
                  maxComponentIndexReached: 0,
                  data: this._originalData};
  }

  _breadcrumbClicked(index) {
    this.state.currentComponentIndex = index;
    this.setState(this.state);
  }

  _getComponentsBreadcrumbs() {
    return this.props.components.slice(0, (this.state.maxComponentIndexReached + 1))
    .map(((component, index) => {
      let className =
        (this.props.components[this.state.currentComponentIndex] === 
         component) ? 'active' : 'inactive';
      
      let title = (component.breadcrumbNamePath &&
                   pathval.get(this.state, component.breadcrumbNamePath)) ||
                   component.name;

      return <li key={component.name} className={className}
                 onClick={this._breadcrumbClicked.bind(this, index)}>{title}</li>;
    }).bind(this));
  }

  onNextEnded(data) {
    if (this.state.currentComponentIndex === this.props.components.length - 1) {
      this.state = {currentComponentIndex: 0,
                    maxComponentIndexReached: 0,
                    data: this._originalData};
      this.props.onFinish(this.state.data);
      this.setState(this.state);
    } else {
      this.state.currentComponentIndex++;
      this.state.maxComponentIndexReached++;
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

    let currentActiveItem = this.props.components[this.state.currentComponentIndex];

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
          {currentActiveItem.name}
        </h3>
        <div className='component-wrapper'>
          <div className='current-component'>
            {currentComponent}
          </div>
          {(currentActiveItem.showButtons === undefined || // If undefined default to true
            currentActiveItem.showButtons) &&
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
          }
        </div>
      </div>
    );
  }
}

Wizard.propTypes = {
  components: React.PropTypes.arrayOf(React.PropTypes.shape({
                                        name: React.PropTypes.string.isRequired,
                                        component: React.PropTypes.func.isRequired,
                                        showButtons: React.PropTypes.bool,
                                        additionalProps: React.PropTypes.object,
                                        breadcrumbNamePath: React.PropTypes.string
                                      })).isRequired,
  onFinish: React.PropTypes.func.isRequired,
  initialData: React.PropTypes.object
};