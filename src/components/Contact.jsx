import React, { Component } from 'react';
import { Button, Icon, Sidebar, Segment, Menu, Image } from 'semantic-ui-react';
import contactQQ from '../static/images/contactQQ.png';

const styles = {
    panel: {
        paddingTop: 0,
        zIndex: 310,
    },
    contact: {
        position: 'fixed',
        right: 0,
        top: '30px',
    },
};

export default class Contact extends Component {
    state = {
        rightButton: true,
        contact: false,
    };

    rightButtonVisibility = () => this.setState({ rightButton: !this.state.rightButton })
    contactVisibility = () => this.setState({ contact: !this.state.contact })
    closeContact = () => this.setState({ contact: false })

    render() {
        const { rightButton, contact } = this.state;

        return (
            <div>
                <div style={styles.contact}>
                    <Button basic color="hintyellow" icon attached="left" onClick={this.rightButtonVisibility}>
                        {rightButton ? <Icon name="right arrow" /> : <Icon name="left arrow" />}
                    </Button>
                    {rightButton && <Button color="hintyellow" basic attached="right" onClick={this.contactVisibility} content="门店网店免费加盟接入入口" />}
                </div>
                <Sidebar as={Segment} animation="push" direction="bottom" style={styles.panel} visible={contact}>
                    <Menu pointing secondary>
                        <Menu.Item header>
                            <h3>联系方式</h3>
                        </Menu.Item>
                        <Menu.Item position="right">
                            <Icon onClick={this.closeContact} name="close" bordered />
                        </Menu.Item>
                    </Menu>
                    <Image src={contactQQ} size='medium' centered />
                    <h3 style={{ textAlign: 'center', }}>邮箱：<a href="mailto:yewu@kuto.shop?subject=酷兔加盟&body=手机号:">yewu@kuto.shop</a></h3>
                </Sidebar>
            </div>
        );
    }
}
