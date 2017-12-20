import React from 'react'
import { Confirm, Icon, Image } from 'semantic-ui-react'
import clear from '../assets/images/control/clear.png'

class Clear extends React.Component {
    state = {
        open: false
    }

    show = () => this.setState({ open: true })

    handleConfirm = () => {
        this.clear()

        this.setState({ open: false })
    }

    handleCancel = () => this.setState({ open: false })

    close = () => this.setState({ open: false })

    clear = () => this.props.canvas.clear()

    render() {
        return (
            <div style={{ padding: '0 4px', width: '33px' }}>
                <Icon as={Image} style={{ width: '24px', height: '28px' }} src={clear} onClick={this.show} />
                <Confirm
                    open={this.state.open}
                    content={<div className="content"><h2>确定要清空画布吗?</h2></div>}
                    cancelButton='取消'
                    confirmButton='确定'
                    onCancel={this.handleCancel}
                    onConfirm={this.handleConfirm}
                />
            </div>
        )
    }
}

export default Clear