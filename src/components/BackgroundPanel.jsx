import React, { Component } from 'react';
import { Button, Segment, Image, Sidebar, Icon, Menu, Container, Grid, List } from 'semantic-ui-react';
import bg1 from '../static/images/background/bg1.png';
import bg2 from '../static/images/background/bg2.png';
import ol1 from '../static/images/overlay/ol1.png';
import ol2 from '../static/images/overlay/ol2.png';
import ol3 from '../static/images/overlay/ol3.png';
import blank from '../static/images/blank.png';
import upload from '../static/images/upload.png';

const styles = {
    panel: {
        padding: 8,
        paddingTop: 0,
        overflowX: 'hidden',
        maxHeight: 300,
        zIndex: 310,
    },
    listItem: {
        padding: '0',
        display: 'inline-block',
    },
    image: {
        marginLeft: '3.5px',
        marginRight: '3.5px',
    },
    inputFileButton: {
        position: 'absolute',
        left: 1000,
        top: 0,
        opacity: 0,
    },
};

class BackgroundPanel extends Component {
    state = {
        control: false,
        visible: false,
        scaleY: 1.00,
        scaleX: 0.50,
        left: 182.5,
        top: 250,
        overlay: [
            { key: 1, src: ol1 },
            { key: 2, src: ol2 },
            { key: 3, src: ol3 },
        ],
    };

    // 设置背景色（未使用）
    setColor = (e, { value }) => {
        const { canvas } = this.props;
        canvas.setBackgroundColor(value).renderAll();
    }

    // 设置网格线背景
    setCrossGrid = () => {
        this.props.removeGrid();
        this.props.createCrossGrid();
    }

    // 设置齐分格线背景
    setHorizontalGrid = () => {
        this.props.removeGrid();
        this.props.createHorizontalGrid();
    }

    checkOverlayImage = () => {
        const { canvas } = this.props;

        if (!canvas.overlayImage) {
            this.controlClose();
        } else {
            this.controlOpen();
        }
    }

    setOverlayImage = (e) => {
        const { canvas } = this.props;

        canvas.setOverlayImage(e.target.src, canvas.renderAll.bind(canvas), {
            scaleX: 0.5,
            left: canvas.width / 2,
            top: canvas.height / 2,
        });

        this.controlOpen();
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

    removeOverlayImage = () => {
        const { canvas } = this.props;

        canvas.setOverlayImage(null, canvas.renderAll.bind(canvas));

        this.controlClose();
    }

    toggleVisibility = () => {
        this.setState({ visible: !this.state.visible });
        this.checkOverlayImage();
    }

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

    controlOpen = () => this.setState({ control: true })
    controlClose = () => this.setState({ control: false })

    clickFileInput = () => {
        const fileInput = document.getElementById('upload1');
        fileInput.click();
    }

    uploadImage = (e) => {
        const { overlay } = this.state;
        const file = e.target.files[0];
        const reader = new FileReader();
        const obj = { key: overlay.length + 1 };

        reader.readAsDataURL(file);
        reader.onload = () => {
            obj.src = reader.result;
            overlay.unshift(obj);
            this.setState({ overlay });
        };
    }

    render() {
        const { backgroundpanel } = this.props;
        const { scaleY, scaleX, left, top, control, overlay } = this.state;

        return (
            <Sidebar as={Segment} animation="push" direction="bottom" visible={backgroundpanel} style={styles.panel}>
                <Menu pointing secondary style={{ marginBottom: 0 }}>
                    <Menu.Item header>
                        <h3>编辑遮罩</h3>
                    </Menu.Item>
                    <Menu.Item position="right">
                        <Icon onClick={this.props.closeBackgroundPanel} name="close" bordered size="small" />
                    </Menu.Item>
                </Menu>
                <span>背景图</span>
                <Container style={{ overflowX: 'auto' }}>
                    <Image floated="left" bordered height={60} src={blank} onClick={this.props.removeGrid} style={styles.image} />
                    <Image.Group style={{ width: 1000 }}>
                        <Image floated="left" bordered height={60} width={60} src={bg1} onClick={this.setCrossGrid} />
                        <Image floated="left" bordered height={60} width={60} src={bg2} onClick={this.setHorizontalGrid} />
                    </Image.Group>
                </Container>
                <span>遮罩层</span>
                <Container style={{ overflowX: 'auto' }}>
                    <Image floated="left" bordered height={60} src={blank} onClick={this.removeOverlayImage} style={styles.image} />
                    <div>
                        <Image floated="left" bordered height={60} src={upload} onClick={this.clickFileInput} style={styles.image} />
                        <input style={styles.inputFileButton} type="file" id="upload1" accept="image/*" onChange={this.uploadImage} />
                    </div>
                    <Image.Group style={{ width: 1000 }}>
                        {
                            overlay.map(ol => (
                                <Image floated="left" bordered height={60} key={ol.key} src={ol.src} onClick={this.setOverlayImage} />
                            ))
                        }
                    </Image.Group>
                </Container>
                {
                    control ?
                        <Grid style={{ margin: '0 auto', justifyContent: 'space-around' }}>
                            <Grid.Row>
                                <List.Item style={styles.listItem}>
                                    <span>高度比</span>
                                    <br />
                                    <Button.Group>
                                        <Button icon="plus" onClick={this.plusHeight} />
                                        <Button>{scaleY}</Button>
                                        <Button icon="minus" onClick={this.minusHeight} />
                                    </Button.Group>
                                </List.Item>
                                <List.Item style={styles.listItem}>
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
                                <List.Item style={styles.listItem}>
                                    <span>上边距</span>
                                    <br />
                                    <Button.Group>
                                        <Button icon="plus" onClick={this.plusTop} />
                                        <Button>{top}</Button>
                                        <Button icon="minus" onClick={this.minusTop} />
                                    </Button.Group>
                                </List.Item>
                                <List.Item style={styles.listItem}>
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
                        :
                        null
                }
            </Sidebar>
        );
    }
}

export default BackgroundPanel;
