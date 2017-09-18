import React from 'react';
import { Tab } from 'semantic-ui-react';
import GalleryBar from './GalleryBar';
import FontBar from './FontBar';
import Background from './Background';

class Test extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            activeItem: '',
            canvas: null,
            panes: [
                { menuItem: '字体', render: () => <Tab.Pane attached={false}><FontBar canvas={this.state.canvas} /></Tab.Pane> },
                { menuItem: '图片', render: () => <Tab.Pane attached={false}><GalleryBar canvas={this.state.canvas} /></Tab.Pane> },
                { menuItem: '背景', render: () => <Tab.Pane attached={false}><Background canvas={this.state.canvas} /></Tab.Pane> },
            ]
        }
    }

    render() {
        return (
            <Tab menu={{ pointer: true }} panes={this.state.panes} />
        );
    }
}

export default Test;