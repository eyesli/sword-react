import React, {PureComponent} from 'react'
import {
  Form,
  Select,
  Input,
  TreeSelect,
  Divider 
} from 'antd'
import { getDepartmentList} from '../../api'
const Item = Form.Item
const Option = Select.Option

class DepartmentTree extends PureComponent{


  state = {
    value: undefined,
    departmentList:[],
  };

  componentWillMount () {
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

  onChange = value => {
    const { getDepartmentId} = this.props;
    getDepartmentId(value)
    this.setState({ value });
  };
  render() {

    const {departmentList} = this.state
    const { text} = this.props;
    return (
   
    <div><span>{text}:</span>

            <TreeSelect
            style={{ width: '62.5%' ,marginLeft:17}}
            value={this.state.value}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            treeData={departmentList}
            placeholder="Please select"
            treeDefaultExpandAll
            onChange={this.onChange}
          />
        
        </div>
        
     
    )
  }
}

export default DepartmentTree 