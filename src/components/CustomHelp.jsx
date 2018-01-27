import React from 'react';
import { Message, Card, Image, Icon, Grid } from 'semantic-ui-react';
import logo from '../static/images/logo.png';
import img from '../static/images/picture/3.jpeg';

const styles = {
  layout: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100vh',
    textAlign: 'center',
  },
  message: {
    marginLeft: '35px',
    marginRight: '35px',
    color: '#1ebc30',
  }
};

const CustomHelp = () => (
  <div style={styles.layout}>
    <Message positive style={styles.message}>
      <Message.Header>成功！</Message.Header>
      <p>我们已经成功保存您的作品，请在<a>店内</a>扫码或现金支付，店小二会马上处理您的需求！</p>
    </Message>
    {/* <h2 style={styles.message}>我们已经成功保存您的作品，请在店内扫码或现金支付，店小二会马上处理您的需求！</h2> */}
    {/* <img src={logo} alt="酷兔" width={200} /> */}
    <Card>
      <Image src={window.history.state.state.dataurl} />
      <Card.Content>
        <Grid columns="equal">
          <Grid.Column>
            <a>
              <Icon name="share alternate" />
            </a>
          </Grid.Column>
          <Grid.Column>
            <a>
              <Icon name="wechat" />
            </a>
          </Grid.Column>
          <Grid.Column>
            <a>
              <Icon name="qq" />
            </a>
          </Grid.Column>
        </Grid>
      </Card.Content>
    </Card>
    <p>更多功能敬请期待。有问题发邮件: <a href="mailto:admin@kuto.shop">admin@kuto.shop</a></p>
  </div>
);

export default CustomHelp;
