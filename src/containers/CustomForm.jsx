import React, { Component } from 'react';
import { Header, Container, Form, Message } from 'semantic-ui-react';
import {
  Link,
} from 'react-router-dom';

class CustomForm extends Component {
  constructor() {
    super();
    this.state = {
      // id: '123***456',
      mobile: '',
      name: '',
      address: '',
      dataurl: null,
    };
  }

  componentDidMount() {
    // const dataurl = window.history.state.state.dataurl;
    // this.setState({ dataurl });
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  handleSubmit = () => {
    const { mobile, name, address } = this.state;

    if (/\b(\d{2})?[1][3456789][0-9]{9}\b/g.test(mobile)) {
      this.insertCustomer(name, mobile, address);
      const link = document.getElementById('link');
      link.click();
    } else {
      alert('请输入正确的手机号码');
    }
  }

  // 调用asp.net端的SaveFile方法
  saveFile = (image, CustomerID, BusinessUserID) => {
    const xhr = new XMLHttpRequest();

    xhr.open('post', '/KutoAdmin/SaveFile', true);

    const formData = new FormData();
    formData.append('image', image, 'custom.png');
    formData.append('draft', null);
    formData.append('CustomerID', CustomerID);
    formData.append('BusinessUserID', BusinessUserID);

    xhr.send(formData);

    xhr.onreadystatechange = function stateChange() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log(xhr.responseText);
        } else {
          alert(`请求失败 ${xhr.status}`);
        }
      }
    };
  }

  // 将dataURL转化为blob类型
  dataURLtoBlob = (dataurl) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?)/)[1];
    const bstr = atob(arr[1]);
    const n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n - 1 > 0) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  insertCustomer(name, mobile, address) {
    const xhr = new XMLHttpRequest();
    const { saveFile } = this;

    const blob = this.dataURLtoBlob(this.state.dataurl);

    xhr.open('post', '/KutoAdmin/InsertCustomer', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.send(`name=${name}&mobile=${mobile}&LONG=1&lat=1&address=${address}`);

    xhr.onreadystatechange = function stateChange() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const res = JSON.parse(xhr.responseText);
          const { CustomerID } = res[0];
          saveFile(blob, CustomerID, 1);
        }
      }
    };
  }

  render() {
    return (
      <Container text>
        <Header as="h2">表单信息</Header>
        <Form warning onSubmit={this.handleSubmit}>
          <Form.Field>
            <Form.Input label="打印部 ID" name="id" value="123***456" disabled />
          </Form.Field>
          <Form.Field required>
            <span>手机号</span>
            <Form.Input placeholder="" name="mobile" required onChange={this.handleChange} />
          </Form.Field>
          <Message
            warning
            list={[
              '如果以前填写过此表单，只需输入手机号',
            ]}
          />
          <Form.Field>
            <span>姓名</span>
            <Form.Input placeholder="" name="name" required onChange={this.handleChange} />
          </Form.Field>
          <Form.Field>
            <span>地址</span>
            <Form.Input placeholder="" name="address" required onChange={this.handleChange} />
          </Form.Field>
          <Form.Button content="提交" />
          <Link id="link" to="/help" />
        </Form>
      </Container>
    );
  }
}

export default CustomForm;
