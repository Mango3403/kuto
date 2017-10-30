import React, { Component } from 'react';
import { Header, Container, Button, Checkbox, Form } from 'semantic-ui-react';
import {
	BrowserRouter as Router,
	Route,
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
			this.insertCustomer();
		} else {
			alert(`请输入正确的手机号码`);
		}
	}

	insertCustom() {
		const xhr = new XMLHttpRequest();

		xhr.open("post", "/KutoAdmin/InsertCustomer", true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

		xhr.send('name=RHM&mobile=13661279108&LONG=0.00&lat=0.00&address=aka');
	}

	render() {
		return (
			<Container text>
				<Header as='h2'>表单信息</Header>
				<Form action="/Kuto/Index/help" onSubmit={this.handleSubmit}>
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
