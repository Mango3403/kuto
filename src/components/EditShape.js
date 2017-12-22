import React, { Component } from 'react'
import { Icon, Popup, Sidebar, Segment, Menu, Grid } from 'semantic-ui-react'

class EditShape extends Component {
  state = {
    isOpen: false,
    visible: false
  }

  handleOpen = () => {
    const { canvas } = this.props;
    if (canvas.getActiveObject() && (canvas.getActiveObject().type === 'line' || canvas.getActiveObject().type === 'circle' || canvas.getActiveObject().type === 'rect' || canvas.getActiveObject().type === 'polygon')) {
      this.toggleVisibility()
    } else {
      this.setState({ isOpen: true })
    }
  }

  handleClose = () => this.setState({ isOpen: false })

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  render() {
    return (
      <div>
        <Popup
          trigger={
            <Icon name="edit" />
          }
          on="click"
          open={this.state.isOpen}
          onOpen={this.handleOpen}
          onClose={this.handleClose}
          content="请选中一个基本图形"
        />
        <Sidebar as={Segment} animation="push" direction="bottom" visible={this.state.visible}>
          <Menu pointing secondary>
            <Menu.Item header>
              <h3>编辑基本图形</h3>
            </Menu.Item>
            <Menu.Item position="right">
              <Icon onClick={this.toggleVisibility} name="close" bordered size="small" />
            </Menu.Item>
          </Menu>

        </Sidebar>
      </div>
    )
  }
}

export default EditShape;
