import React from 'react';
import logo from '../static/images/logo.png';

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
    <h2 style={styles.message}>我们已经成功保存您的作品，请在店内扫码或现金支付，店小二会马上处理您的需求！</h2>
    <img src={logo} alt="酷兔" width={200} />
    <p>更多功能敬请期待。有问题发邮件: <a href="mailto:admin@kuto.shop">admin@kuto.shop</a></p>
  </div>
);

export default CustomHelp;
