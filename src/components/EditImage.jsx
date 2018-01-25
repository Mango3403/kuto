import React, { Component } from 'react';
import { fabric } from 'fabric/dist/fabric';
import { Sidebar, Icon, Segment, List, Menu, Radio, Form, Input, Button } from 'semantic-ui-react';
// import eventProxy from '../eventProxy'

class EditImage extends Component {
  constructor() {
    super();
    this.state = {
      checked: false,
      distance: 0.00,
    };
  }

  componentDidUpdate() {
    const { editimage } = this.props;
    if (editimage) {
      this.changeDistance();
    }
  }

  setGray = () => {
    const { canvas, image } = this.props;

    if (!this.state.checked) {
      image.filters[0] = new fabric.Image.filters.Grayscale();
      image.filters[1] = new fabric.Image.filters.RemoveColor({
        color: '#fff',
        distance: 0,
      });
      this.setState({
        distance: image.filters[1].distance,
      });
    } else {
      image.filters = [];
    }

    image.applyFilters();
    canvas.renderAll();
  }

  toggle = () => {
    this.setState({ checked: !this.state.checked });
    this.setGray();
  }

  changeDistanceValue = e => this.setState({ distance: parseFloat(e.target.value) })
  handleDistancePlus = () => this.setState({ distance: this.state.distance + 0.01 })
  handleDistanceMinus = () => this.setState({ distance: this.state.distance - 0.01 })
  changeDistance = () => {
    const { canvas, image } = this.props;
    const { distance } = this.state;

    if (image && image.filters.length > 0) {
      image.filters[1].distance = distance.toFixed(2);
      image.applyFilters();
      canvas.renderAll();
    }
  }

  render() {
    const { editimage, closeEditImage, image } = this.props;
    const { distance } = this.state;

    return (
      <div>
        <Sidebar as={Segment} animation="push" direction="bottom" visible={editimage}>
          <Menu pointing secondary>
            <Menu.Item header>
              <h3>编辑图片</h3>
            </Menu.Item>
            <Menu.Item position="right">
              <Icon onClick={closeEditImage} name="close" bordered size="small" />
            </Menu.Item>
          </Menu>
          <List style={{ marginTop: '10px' }}>
            <List.Item style={{ display: 'flex' }}>
              <Radio toggle label="灰度化" checked={image ? image.filters.length > 0 ? true : false : this.state.checked} onChange={this.toggle} />
            </List.Item>
            <List.Item disabled={image ? (image.filters.length > 0 ? false : true) : !this.state.checked}>
              <Form>
                <p>过滤梯度值: {image ? image.filters.length > 0 ? parseFloat(image.filters[1].distance) : 0.00 : 0.00}</p>
                <Button.Group size="small" style={{ width: '100%' }}>
                  <Button disabled={distance === 0} icon="minus" onClick={this.handleDistanceMinus} />
                  <Button>
                    <Input
                      min={0}
                      max={1}
                      name="duration"
                      onChange={this.changeDistanceValue}
                      step={0.01}
                      type="range"
                      value={image ? image.filters.length > 0 ? parseFloat(image.filters[1].distance) : 0.00 : 0.00}
                      disabled={image ? image.filters.length > 0 ? false : true : !this.state.checked}
                      size="big"
                    />
                  </Button>
                  <Button disabled={distance === 1} icon="plus" onClick={this.handleDistancePlus} />
                </Button.Group>
              </Form>
            </List.Item>
          </List>
        </Sidebar>
      </div>
    );
  }
}

export default EditImage;
