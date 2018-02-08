import React from 'react';
import { Icon, Sidebar, Segment, Menu } from 'semantic-ui-react';

const styles = {
    panel: {
        paddingTop: 0,
        zIndex: 310,
    },
    menuItem: {

    },
};

class LayerPanel extends React.Component {
    render() {
        const { layerpanel } = this.props;

        return (
            <Sidebar as={Segment} animation="push" direction="bottom" style={styles.panel} visible={layerpanel}>
                <Menu pointing secondary>
                    <Menu.Item header>
                        <h3>编辑图层</h3>
                    </Menu.Item>
                    <Menu.Item position="right">
                        <Icon onClick={this.props.closeLayerPanel} name="close" bordered size="small" />
                    </Menu.Item>
                </Menu>
                <Menu compact widths={5} style={{ marginTop: '10px' }}>
                    <Menu.Item style={styles.menuItem} fitted="horizontally" name="置顶" onClick={this.props.bringToFront} />

                    <Menu.Item style={styles.menuItem} fitted="horizontally" name="向上一层" onClick={this.props.bringForward} />

                    <Menu.Item style={styles.menuItem} fitted="horizontally" name="向下一层" onClick={this.props.sendBackwards} />

                    <Menu.Item style={styles.menuItem} fitted="horizontally" name="置底" onClick={this.props.sendToBack} />

                    <Menu.Item style={styles.menuItem} fitted="horizontally" name="中心对齐" onClick={this.props.center} />
                </Menu>
            </Sidebar>
        );
    }
}

export default LayerPanel;
