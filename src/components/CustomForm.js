import React, { Component } from 'react'
import { Header, Container, Button, Checkbox, Form, Message } from 'semantic-ui-react'
import {
	Link
} from 'react-router-dom'

export default class CustomForm extends Component {
	constructor(props) {
		super(props)

		this.state = {
			id: '123***456',
			mobile: '',
			name: '',
			address: '',
			dataurl: null
		}
	}

	componentDidMount() {
		let dataurl = window.history.state.state.dataurl;

		this.setState({ dataurl })
	}

	handleChange = (e, { name, value }) => this.setState({ [name]: value })

	handleSubmit = () => {
		const { mobile, name, address } = this.state

		if (/\b(\d{2})?[1][3456789][0-9]{9}\b/g.test(mobile)) {
			this.insertCustomer(name, mobile, address)

			const link = document.getElementById('link')
			link.click()
		} else {
			alert(`请输入正确的手机号码`)
		}
	}

	// 调用asp.net端的SaveFile方法
	saveFile(image, CustomerID, BusinessUserID) {
		const xhr = new XMLHttpRequest()

		xhr.open("post", "/KutoAdmin/SaveFile", true)

		let formData = new FormData()
		formData.append("image", image, 'custom.png')
		formData.append('draft', null)
		formData.append('CustomerID', CustomerID)
		formData.append('BusinessUserID', BusinessUserID)

		xhr.send(formData)

		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					console.log(xhr.responseText)
				} else {
					alert('请求失败 ' + xhr.status)
				}
			}
		}
	}

	// 将dataURL转化为blob类型
	dataURLtoBlob(dataurl) {
		let
			arr = dataurl.split(','),
			mime = arr[0].match(/:(.*?)/)[1],
			bstr = atob(arr[1]),
			n = bstr.length,
			u8arr = new Uint8Array(n)
		while (n--) {
			u8arr[n] = bstr.charCodeAt(n)
		}
		return new Blob([u8arr], { type: mime })
	}

	insertCustomer(name, mobile, address) {
		const
			xhr = new XMLHttpRequest(),
			saveFile = this.saveFile;

		let blob = this.dataURLtoBlob(this.state.dataurl);

		xhr.open("post", "/KutoAdmin/InsertCustomer", true)
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")

		xhr.send(`name=${name}&mobile=${mobile}&LONG=1&lat=1&address=${address}`)

		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					console.log(xhr.response);
					let res = JSON.parse(xhr.responseText);
					let CustomerID = res[0].CustomerID;
					saveFile(blob, CustomerID, 1);
				} else {
					alert('请求失败 ' + xhr.status)
				}
			}
		}
	}

	render() {
		return (
			<Container text>
				<Header as='h2'>表单信息</Header>
				<Form warning onSubmit={this.handleSubmit}>
					<Form.Field>
						<Form.Input label='打印部 ID' name='id' value='123***456' disabled />
					</Form.Field>
					<Form.Field required>
						<label>手机号</label>
						<Form.Input placeholder='' name='mobile' required onChange={this.handleChange} />
					</Form.Field>
					<Message
						warning
						list={[
							'如果以前填写过此表单，只需输入手机号'
						]}
					/>
					<Form.Field>
						<label>姓名</label>
						<Form.Input placeholder='' name='name' required onChange={this.handleChange} />
					</Form.Field>
					<Form.Field>
						<label>地址</label>
						<Form.Input placeholder='' name='address' required onChange={this.handleChange} />
					</Form.Field>
					<Form.Button content='提交' />
					<Link id='link' to='/help' />
				</Form>
			</Container>
		)
	}
}
