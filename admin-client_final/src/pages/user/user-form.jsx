import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Select,
  Input
} from 'antd'
import DepartmentTree from '../department/departmentTree'
const Item = Form.Item
const Option = Select.Option

/*
添加/修改用户的form组件
 */
class UserForm extends React.Component{

  static propTypes = {
    setForm: PropTypes.func.isRequired, // 用来传递form对象的函数
    //roles: PropTypes.array.isRequired,
    user: PropTypes.object
  }

  componentWillMount () {
    this.props.setForm(this.props.form)
    const {roles, user} = this.props
    this.setState({
      roles,
      user
    })
  }
  shouldComponentUpdate() {
   
    console.log('shouldComponentUpdate');
    return true
  }

  render() {

     const {roles, user} = this.props
    const { getFieldDecorator } = this.props.form
    // 指定Item布局的配置对象
    const formItemLayout = {
      labelCol: { span: 4 },  // 左侧label的宽度
      wrapperCol: { span: 15 }, // 右侧包裹的宽度
    }

    return (
      <Form {...formItemLayout}>

      {/* <Item label='部门'>
          {
            getFieldDecorator('deptname', {
              initialValue: user.name,
            })(
               <DepartmentTree 
                  text='所属部门'
                //  getDepartmentId={this.getDepartmentId}
                  />
              
            )
          }
        </Item> */}
        <Item label='用户名'>
          {
            getFieldDecorator('name', {
              initialValue: user.name,
            })(
              <Input placeholder='请输入用户名'/>
            )
          }
        </Item>
        <Item label='外号'>
          {
            getFieldDecorator('nickName', {
              initialValue: user.nickName,
            })(
              <Input placeholder='请输入外号'/>
            )
          }
        </Item>

        {
          user.id ? null : (
            <Item label='密码'>
              {
                getFieldDecorator('password', {
                  initialValue: user.password,
                })(
                  <Input type='password' placeholder='请输入密码'/>
                )
              }
            </Item>
          )
        }

        <Item label='手机号'>
          {
            getFieldDecorator('mobile', {
              initialValue: user.mobile,
            })(
              <Input placeholder='请输入手机号'/>
            )
          }
        </Item>
        <Item label='邮箱'>
          {
            getFieldDecorator('email', {
              initialValue: user.email,
            })(
              <Input placeholder='请输入邮箱'/>
            )
          }
        </Item>
       

        { <Item label='角色'>
          {
            getFieldDecorator('roleId', {
            initialValue: '请选择',
            })(
              <Select allowClear notFoundContent>
                {
                  roles.map(role => <Option key={role.id} value={role.id}>{role.name}</Option>)
                }
              </Select>
            )
          }
        </Item> }
      </Form>
    )
  }
}

export default Form.create()(UserForm)