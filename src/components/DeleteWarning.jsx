import React from 'react';
import { Confirm } from 'semantic-ui-react';

class DeleteWarning extends React.Component {
    handleConfirm = (e) => {
        e.preventDefault();
        this.props.delete();
        this.props.closeDeleteWarning();
    }

    render() {
        return (
            <div style={{ padding: '0 4px', width: '33px' }}>
                <Confirm
                    open={this.props.deleteWarning}
                    content={<div className="content"><h2>确定要删除吗?</h2></div>}
                    cancelButton="取消"
                    confirmButton="确定"
                    closeOnDimmerClick={false}
                    onCancel={this.props.closeDeleteWarning}
                    onConfirm={this.handleConfirm}
                />
            </div>
        );
    }
}

export default DeleteWarning;
