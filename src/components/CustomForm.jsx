import React, { Component } from 'react';
import { Header, Container, Button, Checkbox, Form } from 'semantic-ui-react';

export default class CustomForm extends Component {
	state = {
		id: '123***456',
		phone: '',
		username: '',
		address: ''
	}

	handleChange = (e, { name, value }) => this.setState({ [name]: value })

	handleSubmit = () => {
		const { id, phone, username, address } = this.state;

		if (/\b(\d{2})?[1][3456789][0-9]{9}\b/g.test(phone)) {
			console.log(`
			{
				id: ${id},
				phone: ${phone},
				username: ${username},
				address: ${address}
			}`);
		} else {
			alert(`请输入正确的手机号码`);
		}
	}

	render() {
		return (
			<Container text>
				<Header as='h2'>表单信息</Header>
				<Form onSubmit={this.handleSubmit}>
					<Form.Field>
						<Form.Input label='打印部 ID' name='id' value='123***456' disabled />
					</Form.Field>
					<Form.Field>
						<label>手机号</label>
						<Form.Input placeholder='' name='phone' required onChange={this.handleChange} />
					</Form.Field>
					<Form.Field>
						<label>姓名</label>
						<Form.Input placeholder='' name='username' required onChange={this.handleChange} />
					</Form.Field>
					<Form.Field>
						<label>地址</label>
						<Form.Input placeholder='' name='address' required onChange={this.handleChange} />
					</Form.Field>
					<Button href='/custom'>返回</Button>
					<Form.Button content='提交' />
				</Form>
			</Container>
		);
	}
}
