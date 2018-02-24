import React, { Component } from 'react';
import { Sidebar, Icon, Segment, Menu, Dropdown, TextArea } from 'semantic-ui-react';
import reactCSS from 'reactcss';
import { SketchPicker } from 'react-color';

const fontFamily = [
    { key: 'Arial', value: 'Arial', text: 'Arial' },
    { key: 'LiDeBiao-Xing3efdf0dc8b19aca', value: 'LiDeBiao-Xing3efdf0dc8b19aca', text: '德彪钢笔' },
    { key: 'maozedongziti106091f26a19aca', value: 'maozedongziti106091f26a19aca', text: '草檀斋毛泽东字体' },
    { key: 'winmantun23001efe02015619aca', value: 'winmantun23001efe02015619aca', text: '浪漫原体' },
    { key: 'GoodVibrationsRf33e9f42419aca', value: 'GoodVibrationsRf33e9f42419aca', text: 'GoodVibrationsROB(英文)' },
    { key: 'Helvetica-Neue-f33f1506b19aca', value: 'Helvetica-Neue-f33f1506b19aca', text: 'Helvetica-Neue-LT-Std(英文)' },
];

const stylesMain = {
    panel: {
        padding: 8,
        paddingTop: 0,
        zIndex: 310,
        maxHeight: 300,
    },
    group: {
        margin: 10,
        minHeight: 130,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignContent: 'space-between',
    },
    textarea: {
        width: '100%', 
        minWidth: '100%',
        minHeight: 80,
    },
    iconClose: {
        width: '2em',
    },
};

// “双击文字编辑”提示延迟时间 ms
const timeoutLength = 2500;

class TextPanel extends Component {
    state = {
        picker: false,
        fill: {
            r: '211',
            g: '212',
            b: '213',
            a: '1',
        },
    };

    // 颜色选择器开关
    colorPickerOpen = () => this.setState({ picker: true })
    colorPickerClose = () => this.setState({ picker: false })

    // 颜色选择器更换颜色
    colorPickerChange = (color) => {
        this.setState({ fill: color.rgb });
        this.props.setTextFill(`rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`);
    }

    render() {
        const { closeTextPanel, textpanel, text } = this.props;
        const { fill, picker } = this.state;
        const styles = reactCSS({
            default: {
                color: {
                    width: '28px',
                    height: '28px',
                    borderRadius: '2px',
                    background: text ? text.fill : `rgba(${fill.r}, ${fill.g}, ${fill.b}, ${fill.a})`,
                },
                swatch: {
                    padding: '5px',
                    background: '#fff',
                    borderRadius: '1px',
                    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                    display: 'inline-block',
                    cursor: 'pointer',
                },
                popover: {
                    position: 'absolute',
                    bottom: 0,
                    zIndex: 311,
                },
                cover: {
                    position: 'fixed',
                    top: '0px',
                    right: '0px',
                    bottom: '0px',
                    left: '0px',
                },
            },
        });

        return (
            <div>
                <Sidebar as={Segment} animation="push" direction="bottom" style={stylesMain.panel} visible={textpanel}>
                    <Menu pointing secondary>
                        <Menu.Item header>
                            <h3>文字</h3>
                        </Menu.Item>
                        <Menu.Item position="right">
                            <Icon onClick={closeTextPanel} name="close" bordered size="small" style={stylesMain.iconClose} />
                        </Menu.Item>
                    </Menu>
                    <div style={stylesMain.group}>
                        <TextArea
                            placeholder={text ? text.text : '你的内容'}
                            onInput={(e) => {this.props.setText(e.target.value);}}
                            style={stylesMain.textarea}
                        />
                        <label>添加回车，可创建竖排文字</label>
                        <Dropdown
                            selection
                            options={fontFamily}
                            pointing="bottom"
                            value={text ? text.fontFamily : null}
                            placeholder="字体"
                            onChange={this.props.setFontFamily}
                        />
                        <div style={styles.swatch} onKeyPress={this.colorPickerOpen} onClick={this.colorPickerOpen}>
                            <div style={styles.color} />
                        </div>
                    </div>
                </Sidebar>
                {
                    picker &&
                    <div style={styles.popover}>
                        <div style={styles.cover} onKeyPress={this.colorPickerClose} onClick={this.colorPickerClose} />
                        <SketchPicker color={fill} onChangeComplete={this.colorPickerChange} />
                    </div>
                }
            </div>
        );
    }
}

export { TextPanel };
