import React, { Component } from 'react';
import { Dropdown, Icon } from 'semantic-ui-react';

const styles = {
    dropDown: {
        margin: 0,
        padding: 0,
        minWidth: '3em',
    },
    dropDownMenu: {
        right: '100%',
    },
    dropDownItem: {
        textAlign: 'center',
        minWidth: '3.5em',
    },
};

class PaintMenu extends Component {
    state = {
        open: true,
    }

    componentDidMount() {
        // 调整画笔粗细按钮的样式
        let circles = document.querySelectorAll('.circle.icon.brush-width');
        let scale = 1;

        for (let i = 1, len = circles.length; i < len; i++) {
            const circle = circles[i];
            scale += .3;
            circle.style.setProperty('font-size', `${scale}em`, 'important');
        }
    }

    handleClose = () => this.setState({ open: false })

    render() {
        const { open } = this.state;
        const { setDrawingBrushWidth } = this.props;

        return (
            <Dropdown trigger={<Icon name="paint brush" />} item icon={null} button pointing="right" style={styles.dropDown} open={open} onClick={open ? null : this.props.drawingModeToggle}>
                <Dropdown.Menu style={styles.dropDownMenu}>
                    <Dropdown.Item style={styles.dropDownItem} onClick={(e) => { setDrawingBrushWidth(5); this.handleClose() }}>
                        <Icon name="circle" className="brush-width" />
                    </Dropdown.Item>
                    <Dropdown.Item style={styles.dropDownItem} onClick={(e) => { setDrawingBrushWidth(8); this.handleClose() }}>
                        <Icon name="circle" className="brush-width" />
                    </Dropdown.Item>
                    <Dropdown.Item style={styles.dropDownItem} onClick={(e) => { setDrawingBrushWidth(12); this.handleClose() }}>
                        <Icon name="circle" className="brush-width" />
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        );
    }
}

export { PaintMenu };
