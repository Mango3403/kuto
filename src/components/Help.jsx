import React from 'react';
import { Icon } from 'semantic-ui-react';

const WINDOW_WIDTH = window.innerWidth;

const styles = {
  help: {
    position: 'absolute',
    width: WINDOW_WIDTH,
    bottom: '50px',
    left: '0'
  },
  p: {
    writingMode: 'vertical-lr',
  },
  li: {
    display: 'inline-block',
    marginRight: '25px',
  },
  ulHorizontal: {
    margin: '0',
    marginBottom: '10px',
    paddingLeft: '35px',
    listStyle: 'none',
  },
  ulVertical: {
    margin: '0',
    listStyle: 'none',
    position: 'absolute',
    right: '50px',
    bottom: '160px',
    textAlign: 'right',
  },
};

const listHorizonal = [
  { value: '添加图形', key: 1 },
  { value: '添加文字', key: 2 },
  { value: '添加图片', key: 3 },
  { value: '添加背景\\遮罩', key: 4 },
  { value: '保存', key: 5 },
  { value: '清空', key: 6 },
  { value: '隐藏工具栏', key: 7 },
];

const Help = () => (
  <div style={styles.help}>
    <ul
      style={styles.ulHorizontal}
    >
      {
        listHorizonal.map(item => (
          <li key={item.key} style={styles.li}>
            <p style={styles.p}>{item.value}</p>
          </li>
        ))
      }
    </ul>
    <ul
      style={styles.ulVertical}
    >
      <li style={{ marginBottom: '10px' }}>
        <p>绘制\控制模式</p>
      </li>
      <li>
        <p>帮助</p>
      </li>
    </ul>
  </div>
);

export default Help;
