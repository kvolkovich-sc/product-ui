import React, { Component } from 'react';
import Types from 'prop-types';
import './DashboardWidget.less';
import { Button } from '@opuscapita/react-buttons';
import { Motion, spring, presets } from 'react-motion';
import sizeMe from 'react-sizeme';

import showSVG from '!raw-loader!!../../../../external_modules/oc-common-ui-indicators/Plus.svg';
import hideSVG from '!raw-loader!!../../../../external_modules/oc-common-ui-indicators/Minus.svg';

const motionPreset = { stiffness: 140, damping: 20 };

class DashboardWidgetChildren extends Component {
  onSize(size) {
    this.props.onSize();
  }

  render() {
    return this.props.children;
  }
};

DashboardWidgetChildren = sizeMe({ monitorWidth: false, monitorHeight: true, refreshRate: 128 })(DashboardWidgetChildren);

const propTypes = {
  className: Types.string,
  collapsed: Types.bool,
  title: Types.string,
  onToggle: Types.func
};
const defaultProps = {
  className: '',
  collapsed: false,
  title: '',
  onToggle: () => {}
};

export default
class DashboardWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      childHeight: 0,
      inMotion: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.collapsed !== nextProps.collapsed) {
      this.setState({ inMotion: true });
    }
  }

  handleChildHeightChange = (height) => {
    this.setState({
      childHeight: height
    });
  }

  handleHeaderButtonClick = (e) => {
    this.props.onToggle(e);
  }

  handleMotionRest = () => {
    this.setState({ inMotion: false });
  }

  render() {
    let {
      className,
      collapsed,
      title
    } = this.props;

    let { childHeight, inMotion } = this.state;
    let childrenContent = (
      <Motion
        defaultStyle={{ x: 0, y: collapsed ? 0 : 1 }}
        style={{
          x: collapsed ? spring(childHeight, motionPreset) : spring(0, motionPreset),
          y: collapsed ? spring(0, motionPreset) : spring(1, motionPreset)
        }}
        onRest={this.handleMotionRest}
        >
        {style => {
          let finishedMotionMarginTop = collapsed ? childHeight : 0;
          let marginTop = inMotion ? style.x : finishedMotionMarginTop;
          let position = childHeight ? 'relative' : 'absolute';

          return (
            <div
              className={`oc-collapsible__children`}
              style={{
                marginTop: `-${marginTop}px`,
                opacity: style.y,
                position: `${position}`
              }}
              >
              <DashboardWidgetChildren onSize={size => this.handleChildHeightChange(size.height)}>
                {this.props.children}
              </DashboardWidgetChildren>
            </div>
          )}}
      </Motion>
    );

    let content = (
      <div className={`oc-collapsible ${className}`}>
        <div className={`oc-collapsible__header`}>
          <div className={`oc-collapsible__header-title-container`} title={title}>
            <h5 className={`oc-collapsible__header-title-text`}>{title}</h5>
          </div>
          <div className={`oc-collapsible__header-button`}>
            <Button svg={collapsed ? showSVG : hideSVG} onClick={this.handleHeaderButtonClick} />
          </div>
        </div>
        <div className={`oc-collapsible__children-container`}>
          {childrenContent}
        </div>
      </div>
    );

    return (
      content
    );
  }
}

DashboardWidget.propTypes = propTypes;
DashboardWidget.defaultProps = defaultProps;