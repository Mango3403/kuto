import React, { Component } from 'react';

export default class CustomHelp extends Component {
    render() {
        return (
            <div style={{ position: 'absolute', top: 'calc(50% - 1em)', left: 0, right: 0, bottom: 0 }}>
                <p>更多功能敬请期待。有问题发邮件: <a href="mailto:admin@kuto.shop">admin@kuto.shop</a></p>
            </div>
        );
    }
}