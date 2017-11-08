import React, { Component } from 'react'
// var QRCode = require('qrcode-react')
import QRCode from 'qrcode.react'
import logo from '../assets/images/logo.jpeg'

const size = 128;

export default class CustomQRCode extends Component {
    render() {
        return (
            <div style={{ marginTop: '50%' }}>
                <p>扫码进入定制页面</p>
                <QRCode
                    value={`/KutoAdmin/Custom/custom${window.location.search}`}
                    size={size}
                    logo={logo}
                    logoWidth={size * 0.3}
                    logoHeight={size * 0.3}
                />
            </div>
        )
    }
}
