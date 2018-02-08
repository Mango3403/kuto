import React from 'react';
import { Confirm } from 'semantic-ui-react';

class ClearWarning extends React.Component {
    handleConfirm = () => {
        this.props.clear();
        this.props.closeClearWarning();
    }

    render() {
        return (
            <div style={{ padding: '0 4px', width: '33px' }}>
                <Confirm
                    open={this.props.clearWarning}
                    content={<div className="content"><h2>确定要清空画布吗?</h2></div>}
                    cancelButton="取消"
                    confirmButton="确定"
                    onCancel={this.props.closeClearWarning}
                    onConfirm={this.handleConfirm}
                />
            </div>
        );
    }
}

export default ClearWarning;
