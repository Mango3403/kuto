import React, { Component } from 'react';
import { Button, Segment, Image, Sidebar, Icon, Menu, Container, Grid, List } from 'semantic-ui-react';
import bg1 from '../static/images/background/bg1.jpg';
import ol1 from '../static/images/overlay/ol1.png';
import ol2 from '../static/images/overlay/ol2.png';
import ol3 from '../static/images/overlay/ol3.png';
import ol4 from '../static/images/overlay/ol4.png';
import ol5 from '../static/images/overlay/ol5.png';
import white from '../static/images/white.jpg';

const overlay = [
  { key: 0, src: ol1 },
  { key: 1, src: ol2 },
  { key: 2, src: ol3 },
  { key: 3, src: ol4 },
  { key: 4, src: ol5 },
];
const background = [
  { key: 0, src: bg1 },
];

class Background extends Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      scaleY: 1.00,
      scaleX: 0.50,
      left: 182.5,
      top: 250,
    };
  }

  setColor = (e, { value }) => {
    const { canvas } = this.props;
    canvas.setBackgroundColor(value).renderAll();
  }

  setBackgroundImage = (e) => {
    const { canvas } = this.props;

    canvas.setBackgroundImage(e.target.src, canvas.renderAll.bind(canvas), {
      width: canvas.getWidth(),
      height: canvas.getHeight(),
      opacity: 0.5,
      originX: 'left',
      originY: 'top',
    });
  }

  setOverlayImage = (e) => {
    const { canvas } = this.props;

    canvas.setOverlayImage(e.target.src, canvas.renderAll.bind(canvas), {
      scaleX: 0.5,
      left: canvas.width / 2,
      top: canvas.height / 2,
    });
  }

  setHeight = (e) => {
    const { canvas } = this.props;

    canvas.overlayImage.scaleY = parseInt(e.target.value, 10);

    canvas.renderAll();

    this.setState({
      scaleY: canvas.overlayImage.scaleY.toFixed(2),
    });
  }

  setWidth = (e) => {
    const { canvas } = this.props;

    canvas.overlayImage.scaleX = parseInt(e.target.value, 10);

    canvas.renderAll();

    this.setState({
      scaleX: canvas.overlayImage.scaleX.toFixed(2),
    });
  }


  setTop = (e) => {
    const { canvas } = this.props;

    canvas.overlayImage.top = parseInt(e.target.value, 10);

    canvas.renderAll();

    this.setState({
      top: canvas.overlayImage.top,
    });
  }

  setLeft = (e) => {
    const { canvas } = this.props;

    canvas.overlayImage.left = parseInt(e.target.value, 10);

    canvas.renderAll();

    this.setState({
      left: canvas.overlayImage.left,
    });
  }

  plusWidth = () => {
    const { canvas } = this.props;

    canvas.overlayImage.scaleX += 0.01;

    canvas.renderAll();

    this.setState({
      scaleX: canvas.overlayImage.scaleX.toFixed(2),
    });
  }

  minusWidth = () => {
    const { canvas } = this.props;

    canvas.overlayImage.scaleX -= 0.01;

    canvas.renderAll();

    this.setState({
      scaleX: canvas.overlayImage.scaleX.toFixed(2),
    });
  }

  plusLeft = () => {
    const { canvas } = this.props;

    canvas.overlayImage.left += 1;

    canvas.renderAll();

    this.setState({
      left: canvas.overlayImage.left,
    });
  }

  minusLeft = () => {
    const { canvas } = this.props;

    canvas.overlayImage.left -= 1;

    canvas.renderAll();

    this.setState({
      left: canvas.overlayImage.left,
    });
  }

  removeBackgroundImage = () => {
    const { canvas } = this.props;

    canvas.setBackgroundImage(null, canvas.renderAll.bind(canvas));
  }

  removeOverlayImage = () => {
    const { canvas } = this.props;

    canvas.setOverlayImage(null, canvas.renderAll.bind(canvas));
  }

  clear = () => {
    const { canvas } = this.props;

    canvas.setBackgroundColor(null).setBackgroundImage(null).renderAll();
  }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  openInputColor = () => {
    document.getElementById('color').click();
  }

  minusHeight = () => {
    const { canvas } = this.props;

    canvas.overlayImage.scaleY -= 0.01;

    canvas.renderAll();

    this.setState({
      scaleY: canvas.overlayImage.scaleY.toFixed(2),
    });
  }

  plusHeight = () => {
    const { canvas } = this.props;

    canvas.overlayImage.scaleY += 0.01;

    canvas.renderAll();

    this.setState({
      scaleY: canvas.overlayImage.scaleY.toFixed(2),
    });
  }

  plusTop = () => {
    const { canvas } = this.props;

    canvas.overlayImage.top += 1;

    canvas.renderAll();

    this.setState({
      top: canvas.overlayImage.top,
    });
  }

  minusTop = () => {
    const { canvas } = this.props;

    canvas.overlayImage.top -= 1;

    canvas.renderAll();

    this.setState({
      top: canvas.overlayImage.top,
    });
  }

  render() {
    const { canvas } = this.props;
    const {
      visible, scaleY, scaleX, left, top,
    } = this.state;

    return (
      <div>
        <Icon onClick={this.toggleVisibility} name="delicious" />
        <Sidebar as={Segment} animation="push" direction="bottom" visible={visible} style={{ overflowX: 'hidden', maxHeight: '300px' }}>
          <Menu pointing secondary>
            <Menu.Item header>
              <h3>背景</h3>
            </Menu.Item>
            <Menu.Item position="right">
              <Icon onClick={this.toggleVisibility} name="close" bordered size="small" />
            </Menu.Item>
          </Menu>
          <span>背景图</span>
          <Container style={{ overflowX: 'auto' }}>
            <Image floated="left" bordered height={60} src={white} onClick={this.removeBackgroundImage} />
            <Image.Group style={{ width: 1000 }}>
              {
                background.map(bg => (
                  <Image floated="left" bordered height={60} key={bg.key} src={bg.src} onClick={this.setBackgroundImage} />
                ))
              }
            </Image.Group>
          </Container>
          <span>遮罩层</span>
          <Container style={{ overflowX: 'auto' }}>
            <Image floated="left" bordered height={60} src={white} onClick={this.removeOverlayImage} />
            <Image.Group style={{ width: 1000 }}>
              {
                overlay.map(ol => (
                  <Image floated="left" bordered height={60} key={ol.key} src={ol.src} onClick={this.setOverlayImage} />
                ))
              }
            </Image.Group>
          </Container>
          <Grid style={{ margin: '0 auto', display: canvas && canvas.overlayImage ? 'flex' : 'none', justifyContent: 'space-around' }}>
            <Grid.Row>
              <List.Item style={{ padding: '0', display: 'inline-block' }}>
                <span>高度比</span>
                <br />
                <Button.Group>
                  <Button icon="plus" onClick={this.plusHeight} />
                  <Button>{scaleY}</Button>
                  <Button icon="minus" onClick={this.minusHeight} />
                </Button.Group>
              </List.Item>
              <List.Item style={{ padding: '0', display: 'inline-block' }}>
                <span>宽度比</span>
                <br />
                <Button.Group>
                  <Button icon="plus" onClick={this.plusWidth} />
                  <Button>{scaleX}</Button>
                  <Button icon="minus" onClick={this.minusWidth} />
                </Button.Group>
              </List.Item>
            </Grid.Row>
            <Grid.Row>
              <List.Item style={{ padding: '0', display: 'inline-block' }}>
                <span>上边距</span>
                <br />
                <Button.Group>
                  <Button icon="plus" onClick={this.plusTop} />
                  <Button>{top}</Button>
                  <Button icon="minus" onClick={this.minusTop} />
                </Button.Group>
              </List.Item>
              <List.Item style={{ padding: '0', display: 'inline-block' }}>
                <span>左边距</span>
                <br />
                <Button.Group>
                  <Button icon="plus" onClick={this.plusLeft} />
                  <Button>{left}</Button>
                  <Button icon="minus" onClick={this.minusLeft} />
                </Button.Group>
              </List.Item>
            </Grid.Row>
          </Grid>
        </Sidebar>
      </div >
    );
  }
}

export default Background;
