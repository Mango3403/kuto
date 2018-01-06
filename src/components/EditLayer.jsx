import React from 'react';
import { Icon, Sidebar, Segment, Popup, Image, Menu } from 'semantic-ui-react';
import order from '../static/images/control/order.png';

class EditLayer extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      visible: false,
    };
  }

  handleOpen = () => {
    const { canvas } = this.props;
    if (canvas.getActiveObject()) {
      this.toggleVisibility();
    } else {
      this.setState({ isOpen: true });
    }
  }

  handleClose = () => this.setState({ isOpen: false })

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  sendToBack = () => {
    const { canvas } = this.props;
    canvas.sendToBack(canvas.getActiveObject());
  }

  bringToFront = () => {
    const { canvas } = this.props;
    canvas.bringToFront(canvas.getActiveObject());
  }

  bringForward = () => {
    const { canvas } = this.props;
    canvas.bringForward(canvas.getActiveObject());
  }

  sendBackwards = () => {
    const { canvas } = this.props;
    canvas.sendBackwards(canvas.getActiveObject());
  }

  center = () => {
    const { canvas } = this.props;
    canvas.getActiveObject().center().setCoords();
  }

  render() {
    return (
      <div>
        <Popup
          trigger={
            <Icon as={Image} style={{ width: '1.3em' }} src={order} />
          }
          on="click"
          open={this.state.isOpen}
          onOpen={this.handleOpen}
          onClose={this.handleClose}
          content="请选中一个对象"
        />
        <Sidebar as={Segment} animation="push" direction="bottom" visible={this.state.visible}>
          <Menu pointing secondary>
            <Menu.Item header>
              <h3>编辑图层</h3>
            </Menu.Item>
            <Menu.Item position="right">
              <Icon onTouchEnd={this.toggleVisibility} name="close" bordered />
            </Menu.Item>
          </Menu>
          <Menu compact>
            <Menu.Item style={{ paddingRight: '5px', paddingLeft: '5px' }} fitted="horizontally" name="置顶" onTouchEnd={this.bringToFront} />

            <Menu.Item style={{ paddingRight: '5px', paddingLeft: '5px' }} fitted="horizontally" name="向上一层" onTouchEnd={this.bringForward} />

            <Menu.Item style={{ paddingRight: '5px', paddingLeft: '5px' }} fitted="horizontally" name="向下一层" onTouchEnd={this.sendBackwards} />

            <Menu.Item style={{ paddingRight: '5px', paddingLeft: '5px' }} fitted="horizontally" name="置底" onTouchEnd={this.sendToBack} />

            <Menu.Item style={{ paddingRight: '5px', paddingLeft: '5px' }} fitted="horizontally" name="中心对齐" onTouchEnd={this.center} />
          </Menu>
        </Sidebar>
      </div>
    );
  }
}

export default EditLayer;
