import React, { Component } from 'react';
import { Header, Container, Button, Checkbox, Form } from 'semantic-ui-react';

export default class CustomForm extends Component {
	render() {
		return (
			<Container text>
				<Header as='h2'>表单信息</Header>
				<Form>
					<Form.Field>
						<Form.Input label='打印部 ID' placeholder='123***456' disabled />
					</Form.Field>
					<Form.Field>
						<label>手机号</label>
						<input placeholder='' required />
					</Form.Field>
					<Form.Field>
						<label>姓名</label>
						<input placeholder='' required />
					</Form.Field>
					<Form.Field>
						<label>地址</label>
						<input placeholder='' required />
					</Form.Field>
					<Button href='/custom'>返回</Button>					
					<Button type='submit'>提交</Button>
				</Form>
			</Container>
		);
	}
}
