import React from 'react';
import { SketchField, Tools } from 'react-sketch';
import { Sidebar, Segment, Icon, Menu, Button, Dropdown } from 'semantic-ui-react';

const styles = {
  sketchField: {
    boxShadow: 'inset 0 0 2px 1px black',
    borderRadius: '5px',
  },
  sidebarPusher: {
    overflow: 'hidden',
  },
  shapeDropdown: {
    position: 'absolute',
    bottom: '0',
    left: '0',
    visibility: 'none',
  },
};

export default class SketchFieldDemo extends React.Component {
  state = {
    visible: true,
    open: false,
    controlledSize: false,
    sketchWidth: 600,
    sketchHeight: 600,
    tool: Tools.Pencil,
  }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  toggleOpen = () => this.setState({ open: !this.state.open })

  render() {
    const { visible } = this.state;

    return (
      <Sidebar.Pushable style={styles.sidebarPusher}>
        <Sidebar as={Menu} animation="overlay" direction="bottom" visible={visible} inverted>
          <Menu.Item name="home" onClick={this.toggleOpen}>
            <Icon name="home" />
            Home
          </Menu.Item>
          <Menu.Item name="gamepad">
            <Icon name="gamepad" />
            Games
          </Menu.Item>
          <Menu.Item name="camera">
            <Icon name="camera" />
            Channels
          </Menu.Item>
        </Sidebar>
        <Sidebar.Pusher>
          <div style={{ height: '100%' }}>
            <div id="ruler" />
            <SketchField
              name="sketch"
              ref={(c) => { this._sketch = c; }}
              width={this.state.controlledSize ? this.state.sketchWidth : null}
              height={this.state.controlledSize ? this.state.sketchHeight : null}
              tool={this.state.tool}
              style={styles.sketchField}
            />
            <Button onClick={this.toggleVisibility}>Toggle Visibility</Button>
            <Dropdown
              open={this.state.open}
              upward
              button
              inverted
              floating
              pointing="top left"
              style={styles.shapeDropdown}
            >
              <Dropdown.Menu>
                <Dropdown.Item>圆形</Dropdown.Item>
                <Dropdown.Item>直线</Dropdown.Item>
                <Dropdown.Item>三角形</Dropdown.Item>
                <Dropdown.Item>矩形</Dropdown.Item>
                <Dropdown.Item>五边形</Dropdown.Item>
                <Dropdown.Item>五角星形</Dropdown.Item>
                <Dropdown.Item>六边形</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
}
