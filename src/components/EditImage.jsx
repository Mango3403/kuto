import React, { Component } from 'react';
import { fabric } from 'fabric/dist/fabric';
import { Sidebar, Icon, Segment, List, Menu, Radio, Form, Button } from 'semantic-ui-react';
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
    const { imageVisible } = this.props;
    if (imageVisible) {
      this.changeDistance();
    }
  }

  setGray = () => {
    const { canvas } = this.props;
    const image = canvas.getActiveObject();

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
    const { canvas } = this.props;
    const { distance } = this.state;
    const obj = canvas.getActiveObject();
    if (obj && obj.filters.length > 0) {
      obj.filters[1].distance = distance.toFixed(2);
      obj.applyFilters();
      canvas.renderAll();
    }
  }

  render() {
    const { imageVisible, imageToggleVisibility } = this.props;
    const { distance } = this.state;

    return (
      <div>
        <Sidebar as={Segment} animation="push" direction="bottom" visible={imageVisible}>
          <Menu pointing secondary>
            <Menu.Item header>
              <h3>编辑图片</h3>
            </Menu.Item>
            <Menu.Item position="right">
              <Icon onClick={imageToggleVisibility} name="close" bordered size="small" />
            </Menu.Item>
          </Menu>
          <List style={{ marginTop: '10px' }}>
            <List.Item style={{ display: 'flex' }}>
              <Radio toggle label="灰度化" checked={this.state.checked} onChange={this.toggle} />
            </List.Item>
            <List.Item disabled={!this.state.checked}>
              <Form>
                <p>过滤梯度值: {distance.toFixed(2)}</p>
                <Button.Group style={{ width: '100%' }}>
                  <Button disabled={distance === 0} icon="minus" onClick={this.handleDistanceMinus} />
                  <Button>
                    <Form.Input
                      className="slider"
                      min={0}
                      max={1}
                      name="duration"
                      onChange={this.changeDistanceValue}
                      step={0.01}
                      type="range"
                      value={distance.toFixed(2)}
                      disabled={!this.state.checked}
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
