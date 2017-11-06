import React, { Component } from 'react';
// var QRCode = require('qrcode-react');
import QRCode from "qrcode.react";
import logo from "../images/0.jpeg";

export default class CustomQRCode extends Component {
    size = 128;

    render() {
        return (
            <div style={{ marginTop: '50%' }}>
                <p>扫码进入定制页面</p>
                <QRCode
                    value={`/KutoAdmin/Custom/custom${window.location.search}`}
                    size={this.size}
                    logo={logo}
                    logoWidth={this.size * 0.3}
                    logoHeight={this.size * 0.3}
                />
            </div>
        );
    }
}
