import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Input,
  TreeSelect
} from 'antd'
import { getDepartmentList} from '../../api'
const Item = Form.Item

/*
添加分类的form组件
 */
class UpdateForm extends Component {

  state = {
    departmentList:[],
    value: undefined, 
    isShow: false, // 是否显示确认框
  }
  static propTypes = {
    setForm: PropTypes.func.isRequired, // 用来传递form对象的函数
   
  }
  onChange = value => {
    const {  getDepartmentId} = this.props;
    getDepartmentId(value)
    this.setState({ value });
  };

  componentWillMount () {
    this.props.setForm(this.props.form)
    this.getDepartmentTree()
  }
  getDepartmentTree = async () => {
    const result = await getDepartmentList()
    if (result.code===200) {
      const departmentList = result.data
      this.setState({
        departmentList:departmentList
      })
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const { departmentList} = this.state
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
            
              // rules: [
              //   {required: true, message: '角色描述必须输入'}
              // ]
            })(
              <Input placeholder='请输入角色描述'/>
            )
          }
        </Item>
        <div><span>所属部门</span><TreeSelect
          style={{ width: '62.5%' ,marginLeft:17}}
          value={this.state.value}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          treeData={departmentList}
         // defaultValue='Please select'
          placeholder="Please select"
          treeDefaultExpandAll
          onChange={this.onChange}
        /></div>
      </Form>
    )
  }
}

export default Form.create()(UpdateForm)