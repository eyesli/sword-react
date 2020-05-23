import React, {Component} from 'react'

import {
  Table,
  Card,
  Icon,
  Button,
  Modal,
  message
} from 'antd'
import { getDepartmentList} from '../../api'

import {formateDate} from "../../utils/dateUtils";
import LinkButton from "../../components/link-button";
import {DeleteDepartment, AddOrUpdateDepartment} from "../../api/index";
import DepartmentForm from './department-form'
export default class department extends Component {

  constructor (props) {
    super(props)

    this.state = {
      departmentList:[],
      users: [], 
      isShow: false, // 是否显示确认框
    }
  }
  initColumn = () => {
    this.columns = [
      {
        title: '部门列表',
        dataIndex: 'name'
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        render: (createTime) => formateDate(createTime)
      },
      {
        title: '授权人',
        dataIndex: 'createBy'
      },
      {
        title: '操作',
        //user随便取名字，没有 dataIndex user代表这行的对象
        render: (department) => (
            <span>
            <LinkButton onClick={() => this.showUpdate(department)}>修改</LinkButton>
            <LinkButton onClick={() => this.deleteDepartment(department)}>删除</LinkButton>
          </span>
        )
      },
    ]
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
  showAdd = () => {
    this.department = null // 去除前面保存的user
    this.setState({isShow: true})
  }

  /*
  显示修改界面
   */
  showUpdate = (department) => {
    this.department = department // 保存department
    this.setState({
      isShow: true
    })
  }
 /*
  删除指定部门
   */
  deleteDepartment = (department) => {
    Modal.confirm({
      title: `确认删除${department.name}吗?`,
      onOk: async () => {

        const result = await DeleteDepartment(department.id)
        if(result.code===200) {
          message.success('删除部门成功!')
          this.getDepartmentTree()
        }
      }
    })
  }

  getSupDepartmentId = (supDepartmentId) => {
    this.setState({
      supDepartmentId: supDepartmentId,
    });
  }

  /*
  添加/更新用户
   */

   
  addOrUpdateDepartment = async () => {

    this.setState({isShow: false})

    // 1. 收集输入数据
    const Department = this.form.getFieldsValue()

    Department.parentId=this.state.supDepartmentId
    console.log(Department)
    this.form.resetFields()
    // 如果是更新, 需要给Department指定id属性
    if (this.department) {
      Department.id = this.department.id
    }
   
   // 2. 提交添加的请求
    const result = await AddOrUpdateDepartment(Department)
    // 3. 更新列表显示
    if(result.code===200) {
      message.success(`${this.department ? '修改' : '添加'}用户成功`)
      this.getDepartmentTree()
    }
  }
  componentWillMount () {
    this.initColumn()

  }
  componentDidMount () {
    this.getDepartmentTree()
  }


  render() {

    const{departmentList,isShow}  = this.state
    const department = this.department || {}
    // Card的右侧
    const extra = (
      <Button type='primary' onClick={this.showAdd}>
        <Icon type='plus'/>
        创建部门
      </Button>
    )
    return (
     
        <Card  extra={extra}>
          <Table
              bordered
              rowKey='id'
              dataSource={departmentList}
              columns={this.columns}
              size='small'
          />
          <Modal
             title={department.id ? '修改用户' : '添加用户'}
             visible={isShow}
             onOk={this.addOrUpdateDepartment}
             onCancel={() => {
             this.form.resetFields()
             this.setState({isShow: false})
          }}
        >
          <DepartmentForm
              setForm={form => this.form = form}
              departmentList={departmentList}
              department={department}
              getSupDepartmentId={this.getSupDepartmentId}
          />
        </Modal>
        </Card>
          
      
    )
  }
}