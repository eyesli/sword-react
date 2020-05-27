import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Input,
  Tree
} from 'antd'
import menuList from '../../config/menuConfig'

const Item = Form.Item

const { TreeNode } = Tree;

/*
添加分类的form组件
 */
export default class AuthForm extends PureComponent {

  static propTypes = {
    role: PropTypes.object
  }

  constructor (props) {
    super(props)

    // 根据传入角色的menus生成初始状态
    const sysMenus = this.props.menus
    const menuTree = this.props.menuTree
  
    this.state = {
      checkedKeys:sysMenus,
      menuTree:menuTree

    }
  }

  /*
  为父组件提交获取最新menus数据的方法
   */
  getMenus = () => this.state.checkedKeys


  getTreeNodes = (menuTree) => {
    return menuTree.reduce((pre, item) => {
      pre.push(
        <TreeNode title={item.title} key={item.key}>
          {item.children ? this.getTreeNodes(item.children) : null}
        </TreeNode>
      )
      return pre
    }, [])
  }

  // 选中某个node时的回调
  onCheck = checkedKeys => {
   
    this.setState({ checkedKeys });
  };


  componentWillMount () {
   const menuTree = this.state.menuTree
   
    this.treeNodes = this.getTreeNodes(menuTree)
 
  }

  // 根据新传入的role来更新checkedKeys状态
  /*
  当组件接收到新的属性时自动调用
   */
  componentWillReceiveProps (nextProps) {

    const menus = nextProps.menus
    this.setState({
      checkedKeys: menus
    })
    // this.state.checkedKeys = menus
  }

  render() {
    const {role,menuTree} = this.props
  
    const checkedKeys=this.state.checkedKeys

    // 指定Item布局的配置对象
    const formItemLayout = {
      labelCol: { span: 4 },  // 左侧label的宽度
      wrapperCol: { span: 15 }, // 右侧包裹的宽度
    }

    return (
      <div>
        <Item label='角色名称' {...formItemLayout}>
          <Input value={role.name} disabled/>
        </Item>
{/* 
        <Tree
          checkable
          defaultExpandAll={true}
          checkedKeys={checkedKeys}
          onCheck={this.onCheck}
        >
          <TreeNode title="平台权限" key="all">
            {this.treeNodes}
          </TreeNode>
        </Tree>  */}


        <Tree
          checkable
          defaultExpandAll={true}
          checkedKeys={checkedKeys}
          onCheck={this.onCheck}
          treeData={menuTree}
        >
             </Tree>
      </div>
    )
  }
}