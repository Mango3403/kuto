import React from 'react';

const styles = {
  layout: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100vh',
  },
};

const CustomHelp = () => (
  <div style={styles.layout}>
    <p>更多功能敬请期待。有问题发邮件: <a href="mailto:admin@kuto.shop">admin@kuto.shop</a></p>
  </div>
);

export default CustomHelp;
