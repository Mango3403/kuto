import React, { Component } from 'react';
import { Sidebar, Icon, Segment, Menu } from 'semantic-ui-react';
import Panel from './Panel';
import img0 from '../static/images/picture/0.jpeg';
import img1 from '../static/images/picture/1.jpeg';
import img2 from '../static/images/picture/2.jpeg';
import img3 from '../static/images/picture/3.jpeg';
import img4 from '../static/images/picture/4.jpg';

class Image extends Component {
  state = {
    visible: false,
    image: [
      { key: 0, options: 'icon flower default', src: img4 },
      { key: 1, options: 'icon cartoon default', src: img0 },
      { key: 2, options: 'icon cartoon default', src: img1 },
      { key: 3, options: 'image cartoon default', src: img2 },
      { key: 4, options: 'image cartoon default', src: img3 },
    ],
  }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })
  closeVisibility = () => this.setState({ visible: false })

  render() {
    const { canvas } = this.props;

    return (
      <div>
        <Icon onClick={this.toggleVisibility} name="image" />
        <Sidebar as={Segment} animation="push" direction="bottom" visible={this.state.visible}>
          <Menu pointing secondary>
            <Menu.Item header>
              <h3>图片</h3>
            </Menu.Item>
            <Menu.Item position="right">
              <Icon onClick={this.toggleVisibility} name="close" bordered size="small" />
            </Menu.Item>
          </Menu>
          <Panel
            canvas={canvas}
            image={this.state.image}
            openEditImage={this.props.openEditImage}
            closeVisibility={this.closeVisibility}
          />
        </Sidebar>
      </div>
    );
  }
}

export default Image;

// var image = [
//     { key: 0, options: 'icon flower default', src: 'img4' },
//     { key: 1, options: 'icon cartoon default', src: 'img0' },
//     { key: 2, options: 'icon cartoon default', src: 'img1' },
//     { key: 3, options: 'image cartoon default', src: 'img2' },
//     { key: 4, options: 'image cartoon default', src: 'img3' },
// ];
