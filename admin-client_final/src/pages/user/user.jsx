import React, {Component} from 'react'
import {
  Card,
  Button,
  Table,
  Modal,
  message,
  Badge,
  Icon,
  Tag
} from 'antd'
import {formateDate} from "../../utils/dateUtils"
import LinkButton from "../../components/link-button/index"
import {reqDeleteUser, findUserList, reqAddOrUpdateUser} from "../../api/index";
import UserForm from './user-form'
// import { Link } from 'dva/router';

/*
用户路由
 */
export default class User extends Component {

  state = {
    users: [], // 所有用户列表
    roles: [], // 所有角色列表
    isShow: false, // 是否显示确认框
  }

  initColumns = () => {
    this.columns = [
      {
        title: '用户名',
        dataIndex: 'name',
       
        render: (re,texts) => (
          //这里有两个参数，第一个是当前的字段数据，第二个参数是这一行的数据，只写一个就是当前字段数据
         
          <Tag color="green">{re}</Tag>
        ),

      },
      {
        title: '外号',
        dataIndex: 'nickName',
        render: (re,texts) => (
          //这里有两个参数，第一个是当前的字段数据，第二个参数是这一行的数据，只写一个就是当前字段数据
         
          <span>
            <a style={{ marginRight: 16 }}> {texts.nickName}</a>
          </span>
        ),
       
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        render: (re,texts) => (
          //这里有两个参数，第一个是当前的字段数据，第二个参数是这一行的数据，只写一个就是当前字段数据
         
          <Tag color="green">{re}</Tag>
        ),
      },

      {
        title: '电话',
        dataIndex: 'mobile',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.mobile - b.mobile,
      },
      // {
      //   title: '注册时间',
      //   dataIndex: 'createTime',
      //   width: '9%',
      //
      //   render: formateDate
      // },
      // {
      //   title: '创建者',
      //   dataIndex: 'createBy',
      //   render: (re,texts) => (
      //     //这里有两个参数，第一个是当前的字段数据，第二个参数是这一行的数据，只写一个就是当前字段数据
      //
      //     <Tag color="green">{re}</Tag>
      //   ),
      // },
      // {
      //   title: '最近修改时间',
      //   dataIndex: 'lastUpdateTime',
      //   width: '9%',
      //   render: formateDate
      // },
      // {
      //   title: '最近修改人',
      //   dataIndex: 'lastUpdateBy',
      //   render: (re,texts) => (
      //     //这里有两个参数，第一个是当前的字段数据，第二个参数是这一行的数据，只写一个就是当前字段数据
      //
      //     <Tag color="green">{re}</Tag>
      //   ),
      // },
      {
        title: '用户状态',
        dataIndex: 'delFlag',
        width: '8%',
        render:(delFlag) => ( // 返回需要显示的界面标签
          <span >
            {delFlag==='NORMAL' ? <Badge status="success" text="正常" />:<Badge status="default" text="禁用" />}
          </span>
          )
      },
      {
        title: '所属部门',
        dataIndex: 'sysDept.name',
      },
      {
        title: '所属角色',
        dataIndex: 'sysRole.name',
       // render: (role_id) => this.roleNames[role_id]
      },
      {
        title: '操作',
        //user随便取名字，没有 dataIndex user代表这行的对象
        render: (user) => (
          <span>
             <Tag color="green"><LinkButton onClick={() => this.showUpdate(user)}>修改</LinkButton></Tag>
             <Tag color="green"><LinkButton onClick={() => this.deleteUser(user)}>删除</LinkButton></Tag>
          </span>
        )
      },
    ]
  }

  // /*
  // 根据role的数组, 生成包含所有角色名的对象(属性名用角色id值)
  //  */
  // initRoleNames = (roles) => {
  //   const roleNames = roles.reduce((pre, role) => {
  //     pre[role._id] = role.name
  //     return pre
  //   }, {})
  //   // 保存
  //   this.roleNames = roleNames
  // }

  /*
  显示添加界面
   */
  showAdd = () => {
    this.user = null // 去除前面保存的user
    this.setState({isShow: true})
  }

  /*
  显示修改界面
   */
  showUpdate = (user) => {
    this.user = user // 保存user
    this.setState({
      isShow: true
    })
  }

  /*
  删除指定用户
   */
  deleteUser = (user) => {
    Modal.confirm({
      title: `确认删除${user.name}吗?`,
      onOk: async () => {

        const result = await reqDeleteUser(user.id)
        if(result.code===200) {
          message.success('删除用户成功!')
          this.getUsers()
        }
      }
    })
  }

  /*
  添加/更新用户
   */
  addOrUpdateUser = async () => {

    this.setState({isShow: false})

    // 1. 收集输入数据
    const user = this.form.getFieldsValue()
    this.form.resetFields()
    // 如果是更新, 需要给user指定id属性
    if (this.user) {
      user.id = this.user.id
    }

    // 2. 提交添加的请求
    const result = await reqAddOrUpdateUser(user)
    // 3. 更新列表显示
    if(result.code===200) {
      message.success(`${this.user ? '修改' : '添加'}用户成功`)
      this.getUsers()
    }
  }

  getUsers = async () => {
    const result = await findUserList()
    
    if (result.code===200) {
      const {users, roles} = result.data
      const userlist = result.data
     // this.initRoleNames(roles)
      this.setState({
        users,
        roles,
        userlist
      })
    }
  }
 


  componentWillMount () {
    this.initColumns()
  }

  componentDidMount () {
    this.getUsers()
  }


  render() {

    const {userlist, roles, isShow} = this.state
    const user = this.user || {}

    // Card的右侧
    const extra = (
      <Button type='primary' onClick={this.showAdd}>
        <Icon type='plus'/>
        创建用户
      </Button>
    )
    return (
      <Card  extra={extra}>
        <Table
          bordered
          rowKey='id'
          dataSource={userlist}
          columns={this.columns}
          pagination={{defaultPageSize: 15}}
          size='small'
        />

 

        <Modal
          title={user.id ? '修改用户' : '添加用户'}
          visible={isShow}
          onOk={this.addOrUpdateUser}
          onCancel={() => {
            this.form.resetFields()
            this.setState({isShow: false})
          }}
        >
          <UserForm
          //todo 看不太懂
            setForm={form => this.form = form}
            roles={roles}
            user={user}
          />
        </Modal>

      </Card>
    )
  }
}