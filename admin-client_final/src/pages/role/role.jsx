import React, {Component} from 'react'
import {
  Card,
  Button,
  Table,
  Modal,
  message,
  Icon,
  Tag 
} from 'antd'
import {PAGE_SIZE} from "../../utils/constants"
import {getAllRoles, updateRole,addRole, deleteRole,getDepartment,getMenuTree,UpdateRoleAuth} from '../../api'
import AddForm from './add-form'
import UpdateForm from './update-form'
import AuthForm from './auth-form'
import memoryUtils from "../../utils/memoryUtils"
import {formateDate} from '../../utils/dateUtils'
import storageUtils from "../../utils/storageUtils";
import LinkButton from "../../components/link-button";

/*
角色路由
 */
export default class Role extends Component {

  state = {
    roles: [], // 所有角色的列表
    role: {}, // 选中的role
    isShow: false, // 是否显示添加界面
    isShowAuth: false, // 是否显示设置权限界面
    isShowAdd:false,
    isShowUpdate:false, 
    department:[],
    departmentId:{},
    menuTree:[],
    data:{},
    key:[]
    
  }

  constructor (props) {
    super(props)

    this.auth = React.createRef()
  }

  initColumn = () => {
    this.columns = [
      {
        title: '角色名称',
        dataIndex: 'name',
        render: (re,texts) => (
          //这里有两个参数，第一个是当前的字段数据，第二个参数是这一行的数据，只写一个就是当前字段数据
         
          <Tag color="green">{re}</Tag>
        ),
      },

      {
        title: '描述',
        dataIndex: 'description',
       
      },
      {
        title: '授权人',
        dataIndex: 'createBy'
      },
      {
        title: '注册时间',
        dataIndex: 'createTime',
       // width: '9%',
      
        render: formateDate
      },
      {
        title: '所属部门',
        dataIndex: 'sysDept.name',
      },
      {
        title: '操作',
        render: (role) => (
            <span>
            <LinkButton onClick={() => this.showUpdate(role)}>修改</LinkButton>
            <LinkButton onClick={() => this.deleteRole(role)}>删除</LinkButton>
          </span>
        )
      },
    ]
  }

  getRoles = async () => {
    const result = await getAllRoles()
    if (result.code===200) {
      const roles = result.data
      this.setState({
        roles
      })
    }
  }


  onRow = (role) => {
    return {
      onClick: async  event => { // 点击行

        this.setState({
          role
         
        })
        // const role = this.state.role

        let key
        key = role.sysMenu.map((item, index) => {
          key= item.id
          return key
       });
    
       
        const result = await getMenuTree()
        const menuTree= result.data
        this.setState({
          menuTree,
          key
        })
        
      },
    }
  }

  /*
  添加角色
   */
  addRole = () => {
    // 进行表单验证, 只能通过了才向下处理
    this.form.validateFields(async (error, values) => {
      if (!error) {
        // 隐藏确认框
        this.setState({isShowAdd: false })
        // 收集输入数据
        const role = this.form.getFieldsValue()
        role.departmentId=this.state.departmentId
        const result = await addRole(role)
        // 根据结果提示/更新列表显示
      
        if (result.code===200) {
          message.success(`添加角色成功`)
          const role = result.data
          this.getRoles()
         // this.setState(state => ({ roles: [...state.roles, role]}))

        } else {
          message.success('添加角色失败')
        }

      }
    })
   

  }

  getDepartmentId = (departmentId) => {
    this.setState({
      departmentId: departmentId,
    });
  }
  UpdateRole = () => {
    // 进行表单验证, 只能通过了才向下处理
    this.form.validateFields(async (error, values) => {
      if (!error) {
        // 隐藏确认框
        this.setState({isShowUpdate: false })
        // 收集输入数据
        const role = this.form.getFieldsValue()
        role.id=this.role.id 
        this.form.resetFields()
        const result = await updateRole(role)
       
        // 根据结果提示/更新列表显示
      
        if (result.code===200) {
          message.success(`修改角色成功`)
          this.getRoles()
        } else {
          message.success('修改角色失败')
        }

      }
    })


  }

  /*
  更新角色
   */
  setRole = async () => {

    // 隐藏确认框
    this.setState({
      isShowAuth: false
    })

    const role = this.state.role
    // 得到最新的menus
    const menus = this.auth.current.getMenus()

    const data = this.state.data

    data.roleId=role.id
    data.menuId=menus
    
    console.log( data)
   // 请求更新
    const result = await UpdateRoleAuth( data)
    if (result.code===200) {
      // this.getRoles()
      // 如果当前更新的是自己角色的权限, 强制退出
      if (role.id === memoryUtils.user.roleid) {
        memoryUtils.user = {}
        storageUtils.removeUser()
        this.props.history.replace('/login')
        message.success('当前用户角色权限成功')
      } else {
        message.success('设置角色权限成功')
       this.getRoles()
      }

    }
  }
  deleteRole = (role) => {
    Modal.confirm({
      title: `确认删除${role.name}吗?`,
      onOk: async () => {

        const result = await deleteRole(role.id)
        if(result.code===200) {
          message.success('删除角色成功!')
          this.getRoles()
        }
      }
    })
  }

  showUpdate =async (role) => {

    const result = await getDepartment(role.deptId)
    const department= result.data
    this.role = role 
    this.setState({
      isShowUpdate: true,
      department:department
    })
  }

  showAdd = () => {
    this.setState({isShowAdd: true})
  }
  showAuth = () => {
    
  //  const role = this.state.role

  //   let key
  //   key = role.sysMenu.map((item, index) => {
  //     key= item.id
  //     return key
  //  });

    this.setState({isShowAuth: true})
    // const result = await getMenuTree()
    // const menuTree= result.data
    // this.setState({
    //   menuTree,
    //   key
    // })
  }


  componentWillMount () {
    this.initColumn()
  }

  componentDidMount () {
    this.getRoles()
  }

  render() {

    const {roles, role, isShowAdd,isShowUpdate, isShowAuth,department,menuTree,key} = this.state
    const extra = (
      <span>
         <Button type='primary' disabled={!role.id} onClick={this.showAuth}>设置角色权限</Button> &nbsp;&nbsp;
         <Button type='primary' onClick={this.showAdd}> <Icon type='plus'/>创建角色</Button>
      </span>
    )

   return (
      <Card  extra={extra}>
        <Table
          bordered
          rowKey='id'
          dataSource={roles}
          columns={this.columns}
          pagination={{defaultPageSize: PAGE_SIZE}}
          size='small'
          rowSelection={{
            type: 'radio',
            selectedRowKeys: [role.id],
            onSelect: (role) => { // 选择某个radio时回调
              this.setState({
                role
              })
            }

          }}
          onRow={this.onRow}
        />

        <Modal
          title= '创建角色'
          visible={isShowAdd}
          onOk={this.addRole}
          onCancel={() => {
            this.setState({isShowAdd: false})
            this.form.resetFields()
          }}
        >
          <AddForm
            setForm={(form) => this.form = form}
            getDepartmentId={this.getDepartmentId}
          />
        </Modal>


        
        <Modal
          title='修改角色' 
          visible={isShowUpdate}
          onOk={this.UpdateRole}
          onCancel={() => {
            this.setState({isShowUpdate: false})
            this.form.resetFields()
          }}
        >
          <UpdateForm
        
            setForm={(form) => this.form = form}
            role={role}
            department={department}
          />
        </Modal>

        <Modal
          title="设置角色权限"
          visible={isShowAuth}
          onOk={this.setRole}
          onCancel={() => {
            this.setState({isShowAuth: false})
          }}
        >
          <AuthForm ref={this.auth} role={role} menus={key} menuTree={menuTree}/>
        </Modal>
      </Card>
    )
  }
}