import React, { Component } from 'react';
import {
  Link,
} from 'react-router-dom';
import { Checkbox, Modal, Icon, Button, Image } from 'semantic-ui-react';

class Save extends Component {
  constructor() {
    super();
    this.state = {
      checked: false,
      open: false,
      valLeft: '0.0',
      valTop: '0.0',
      valWidth: '0.0',
      valHeight: '0.0',
      saveImages: {
        src: '',
        name: 'custom.png',
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    const that = this;
    const { canvas } = nextProps;

    canvas.on('after:render', () => {
      const lefts = [];
      const tops = [];
      const bottoms = [];
      const rights = [];

      canvas.forEachObject((obj) => {
        const bound = obj.getBoundingRect();
        bound.right = bound.left + bound.width;
        bound.bottom = bound.top + bound.height;

        lefts.push(bound.left);
        tops.push(bound.top);
        rights.push(bound.right);
        bottoms.push(bound.bottom);
      });

      const bottomMax = Math.max.apply(null, bottoms);
      const rightMax = Math.max.apply(null, rights);
      const leftMin = Math.min.apply(null, lefts);
      const topMin = Math.min.apply(null, tops);

      that.setState({
        valHeight: (bottomMax - topMin).toFixed(1),
        valWidth: (rightMax - leftMin).toFixed(1),
        valLeft: leftMin,
        valTop: topMin,
      });
    });
  }

  toggle = () => this.setState({ checked: !this.state.checked })

  show = dimmer => () => {
    this.saveImage();
    this.setState({
      dimmer,
      open: true,
    });
  }

  save = () => {
    const { checked } = this.state;

    if (checked) {
      this.download();
      localStorage.removeItem('myCanvas');
      window.onbeforeunload = null;
    }

    this.close();
  }

  close = () => this.setState({ open: false })

  saveImage = () => {
    const { canvas } = this.props;

    let dataurl = null;

    if (canvas.overlayImage !== null) {
      dataurl = canvas.toDataURL({
        format: 'png',
        left: canvas.overlayImage.left - (canvas.overlayImage.width / 2),
        top: canvas.overlayImage.top - (canvas.overlayImage.height / 2),
        height: canvas.overlayImage.height,
        width: canvas.overlayImage.width,
      });
    } else {
      dataurl = canvas.toDataURL({
        format: 'png',
        left: this.state.valLeft,
        top: this.state.valTop,
        height: this.state.valHeight,
        width: this.state.valWidth,
      });
    }

    this.setState({
      saveImages: {
        src: dataurl,
      },
    });
  }

  download() {
    const a = document.createElement('a');
    a.setAttribute('href', this.state.saveImages.src);
    a.setAttribute('download', this.state.saveImages.name);
    a.click();
  }

  render() {
    const data = { dataurl: this.state.saveImages.src };
    const path = {
      pathname: '/form',
      state: data,
    };

    return (
      <div>
        <Icon name="save" onTouchEnd={this.show(true)} />
        <Modal
          closeOnDimmerClick={false}
          dimmer={this.state.dimmer}
          open={this.state.open}
          onClose={this.close}
        >
          <Modal.Header>保存完毕</Modal.Header>
          <Modal.Content image>
            <Image wrapped size="small" bordered src={this.state.saveImages.src} />
            <Modal.Description>
              <Checkbox label="保存图片到本地?" onChange={this.toggle} checked={this.state.checked} />
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button content="取消" color="black" onClick={this.close} />
            <Link to={path}>
              <Button positive content="下一步" onClick={this.save} style={{ marginBottom: '10px' }} />
            </Link>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default Save;
