import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Input
} from 'antd'

const Item = Form.Item

/*
添加分类的form组件
 */
class AddForm extends Component {

  static propTypes = {
    setForm: PropTypes.func.isRequired, // 用来传递form对象的函数
  }

  componentWillMount () {
    this.props.setForm(this.props.form)
  }

  render() {
    const { getFieldDecorator } = this.props.form
    // 指定Item布局的配置对象
    const formItemLayout = {
      labelCol: { span: 4 },  // 左侧label的宽度
      wrapperCol: { span: 15 }, // 右侧包裹的宽度
    }

    return (
      <Form>
        <Item label='角色名字' {...formItemLayout}>
          {
            getFieldDecorator('name', {
              initialValue: '',
              rules: [
                {required: true, message: '角色名字必须输入'}
              ]
            })(
              <Input placeholder='请输入角色名字'/>
            )
          }
        </Item>

        <Item label='角色描述' {...formItemLayout}>
          {
            getFieldDecorator('desc', {
              initialValue: '',
              // rules: [
              //   {required: true, message: '角色描述必须输入'}
              // ]
            })(
              <Input placeholder='请输入角色描述'/>
            )
          }
        </Item>
        <Item label='所属部门' {...formItemLayout}>
          {
            getFieldDecorator('departmentId', {
              initialValue: '',
              // rules: [
              //   {required: true, message: '角色描述必须输入'}
              // ]
            })(
              <Input placeholder='所属部门'/>
            )
          }
        </Item>
      </Form>
    )
  }
}

export default Form.create()(AddForm)