import React, { Component } from 'react'
import ReactDOM from 'react-dom'
// var QRCode = require('qrcode-react')
import QRCode from 'qrcode.react'
import logo from '../assets/images/logo.jpeg'
import {
    Link
} from 'react-router-dom'


const size = 128;

export default class CustomQRCode extends Component {
    componentWillUnmount() {
        var link = ReactDOM.findDOMNode(this.link);
    }

    render() {
        return (
            <div style={{ marginTop: '50%' }}>
                <Link to={`/main${window.location.search}`}>
                    <h3>进入定制页面</h3>
                </Link>
                <QRCode
                    value={`http://kuto.gotoip1.com/custom/main${window.location.search}`}
                    size={size}
                    logo={logo}
                    logoWidth={size * 0.3}
                    logoHeight={size * 0.3}
                />
            </div>
        )
    }
}

                    // value={`http://kuto.gotoip1.com/custom/main${window.location.search}`}

