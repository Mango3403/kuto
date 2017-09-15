import React from 'react';
import { Icon } from 'semantic-ui-react';

class Remove extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            canvas: {},
            text: []
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ 
            canvas: nextProps.canvas,
            text: nextProps.text
        })
    }

    remove() {
        const { text, canvas } = this.state;

        console.log(text);        

        if (canvas.getActiveObject()) {
            console.log(canvas.getActiveObject());
            
            // // 判断选中对象类型，删除数据再删除对象
            // switch (canvas.getActiveObject().get('type')) {
            //     case 'text':
            //         text.pop();
            //         this.setState({
            //             text: text
            //         });
            //         break;

            //     default:
            //         break;
            // }
            canvas.remove(canvas.getActiveObject());
        }
    }

    render() {
        return (
            <Icon name='trash' onClick={() => {this.remove()}} />
        );
    }
}

Remove.defaultProps = {
    canvas: {}
}

export default Remove;