import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';

class DrawingMode extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isDrawingMode, drawingModeToggle } = this.props;

    return (
      <Icon.Group onClick={drawingModeToggle}>
        {isDrawingMode ? <Icon name="pencil" /> : <Icon name="hand pointer" />}
      </Icon.Group>
    );
  }
}

export default DrawingMode;
