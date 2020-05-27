import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Select,
  Input,
  TreeSelect,
  Divider 
} from 'antd'

const Item = Form.Item
const Option = Select.Option

/*
添加/修改用户的form组件
 */
class DepartmentForm  extends PureComponent{

  static propTypes = {
    setForm: PropTypes.func.isRequired, // 用来传递form对象的函数
    department: PropTypes.object
  }

  state = {
    value: undefined,
  };

  componentWillMount () {

    this.props.setForm(this.props.form)
  }

  onChange = value => {
    const {  getSupDepartmentId } = this.props;
    getSupDepartmentId(value)
    this.setState({ value });
  };
  render() {

    const {department,departmentList} = this.props

    
    
    const { getFieldDecorator } = this.props.form
    // 指定Item布局的配置对象
    const formItemLayout = {
      labelCol: { span: 4 },  // 左侧label的宽度
      wrapperCol: { span: 15 }, // 右侧包裹的宽度
    }

    return (
      <Form {...formItemLayout}>
        {
          department.id ? 
         (
            <Item label='所属部门'>
            {
              getFieldDecorator('parentId', {
                initialValue: department.parentName,
              })
              (
                <Input disabled />
              )
            }
          </Item>)
          :
          <div><span>上级部门</span><TreeSelect
          style={{ width: '62.5%' ,marginLeft:17}}
          value={this.state.value}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          treeData={departmentList}
         // defaultValue='Please select'
          placeholder="Please select"
          treeDefaultExpandAll
          onChange={this.onChange}
        /></div>
        }
         <Divider dashed />
        <Item label='部门名称'>
          {
            getFieldDecorator('name', {
              initialValue: department.name,
            })(
              <Input placeholder='请输入部门名称'/>
            )
          }
        </Item>
      </Form>
    )
  }
}

export default Form.create()(DepartmentForm)