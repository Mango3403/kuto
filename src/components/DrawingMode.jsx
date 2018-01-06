import React, { Component } from 'react';
import { Popup, Icon } from 'semantic-ui-react';

export default class DrawingMode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDrawingMode: props.isDrawingMode,
    };
  }

  render() {
    const { drawingModeToggle } = this.props;

    return (
      <Popup
        trigger={
          <Icon name="pencil" onClick={drawingModeToggle} />
        }
        on="click"
        content={`切换至${this.state.isDrawingMode}` ? '绘制模式' : '控制模式'}
      />
    );
  }
}
