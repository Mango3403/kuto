import React, { Component } from 'react'
import { Message, Button, Icon } from 'semantic-ui-react';

const { Header } = Message;
export default class Record extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      width: 0
    }
  }

  componentDidMount() {
    this.setState({
      width: (window.getComputedStyle(this.body)['width'].split('px'))[0]
    })
  }

  setOpen(value) {
    this.setState({ open: value })
  }

  render() {
    const { open, width } = this.state;

    let right = open ? 0 : -width;

    return (
      <div
        style={{
          position: 'fixed',
          right,
          top: '60%',
          display: 'flex',
          transition: 'right 0.2s linear'
        }}
      >
        <div>
          {!open && <Button onClick={() => this.setOpen(true)}>备案</Button>}
        </div>
        <div ref={node => this.body = node}>
          <Message onDismiss={() => this.setOpen(false)}>
            <Header>备案</Header>
            <p>
              版权信息：酷图工作组
            </p>
            <p>
              备案号：
              <a href="http://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">京ICP备19031245号-2</a>
            </p>
          </Message>
        </div>
      </div>
    )
  }
}
