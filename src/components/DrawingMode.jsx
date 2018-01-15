import React, { Component } from 'react';
import { Popup, Icon } from 'semantic-ui-react';

const DrawingMode = (props) => (
  <Popup
    trigger={
      <Icon name="pencil" onClick={props.drawingModeToggle} />
    }
    on="click"
    content={props.isDrawingMode ? '控制模式' : '绘制模式'}
  />
);

export default DrawingMode;
