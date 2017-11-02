import React, { Component } from 'react';
import { Header, Container, Button, Checkbox, Form } from 'semantic-ui-react';
import {
	Link
} from 'react-router-dom';

export default class CustomForm extends Component {
	state = {
		id: '123***456',
		mobile: '',
		name: '',
		address: ''
	}

	handleChange = (e, { name, value }) => this.setState({ [name]: value })

	handleSubmit = () => {
		const { mobile, name, address } = this.state;

		if (/\b(\d{2})?[1][3456789][0-9]{9}\b/g.test(mobile)) {
			this.insertCustomer(name, mobile, address);
		} else {
			alert(`请输入正确的手机号码`);
		}
	}

	insertCustomer(name, mobile, address) {
		const xhr = new XMLHttpRequest();

		xhr.open("post", "/KutoAdmin/InsertCustomer", true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

		xhr.send(`name=${name}&mobile=${mobile}&LONG=0.00&lat=0.00&address=${address}`);
	}

	/**
	 * 
	 * 	const formData = new FormData();
        formData.append('image',file.files[0]);
	 * 
	 * function saveFile(image, CustomerID, BusinessUserID) {
		const xhr = new XMLHttpRequest();

		xhr.open("post", "/KutoAdmin/SaveFile", true);

		let formData = new FormData();
		formData.append('image', image);
		formData.append('draft', 'test');
		formData.append('CustomerID', CustomerID);
		formData.append('BusinessUserID', BusinessUserID);

		xhr.onload = function () {
			if (xhr.status == 200) {
				console.log('OK!');
			} else {
				console.log('Error: ' + xhr.status);
			}
		}

		xhr.send(formData);
	}
	 */

	render() {
		return (
			<Container text>
				<Header as='h2'>表单信息</Header>
				<Form action="/help" onSubmit={this.handleSubmit}>
					<Form.Field>
						<Form.Input label='打印部 ID' name='id' value='123***456' disabled />
					</Form.Field>
					<Form.Field>
						<label>手机号</label>
						<Form.Input placeholder='' name='mobile' required onChange={this.handleChange} />
					</Form.Field>
					<Form.Field>
						<label>姓名</label>
						<Form.Input placeholder='' name='name' required onChange={this.handleChange} />
					</Form.Field>
					<Form.Field>
						<label>地址</label>
						<Form.Input placeholder='' name='address' required onChange={this.handleChange} />
					</Form.Field>
					<Form.Button content='提交' />
				</Form>
			</Container>
		);
	}
}
