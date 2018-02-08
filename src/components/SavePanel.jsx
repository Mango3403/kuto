import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Checkbox, Modal, Button, Image } from 'semantic-ui-react';

class SavePanel extends Component {
    state = {
        checked: true,
        open: false,
        name: 'custom.png',
    };

    // 下载按钮选项是否被选中
    isChecked = () => this.setState({ checked: !this.state.checked })

    // 点击保存按钮
    clickSave = () => {
        const { checked } = this.state;

        if (checked) {
            this.download();
            localStorage.removeItem('myCanvas');
            window.onbeforeunload = null;
        }

        this.props.closeSave();
    }

    // 下载图片到本地
    download() {
        const a = document.createElement('a');
        a.setAttribute('href', this.props.dataurl);

        // 给下载图片命名
        a.setAttribute('download', this.state.name);
        a.click();
    }

    render() {
        const data = {
            dataurl: this.props.dataurl,
            businessUserID: this.props.businessUserID,
        };

        const path = {
            pathname: '/form',
            state: data,
        };

        return (
            <Modal
                closeOnDimmerClick={false}
                dimmer={this.state.dimmer}
                open={this.props.save}
                onClose={this.props.closeSave}
            >
                <Modal.Header>保存完毕</Modal.Header>
                <Modal.Content image>
                    <Image wrapped size="small" bordered src={this.props.dataurl} />
                    <span>微信端需要长按图片保存到本地</span>
                    <Modal.Description>
                        <Checkbox label="保存图片到本地?" onChange={this.isChecked} checked={this.state.checked} />
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button content="取消" color="black" onClick={this.props.closeSave} />
                    <Link to={path}>
                        <Button positive content="保存" onClick={this.clickSave} style={{ marginBottom: '10px' }} />
                    </Link>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default SavePanel;
