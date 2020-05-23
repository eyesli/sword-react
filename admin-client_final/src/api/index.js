/*
要求: 能根据接口文档定义接口请求
包含应用中所有接口请求函数的模块
每个函数的返回值都是promise

基本要求: 能根据接口文档定义接口请求函数
 */
import jsonp from 'jsonp'
import {message} from 'antd'
import request from './ajax'

const BASE = ''
// 登陆

export const reqLogin = (username, password) => request(BASE + '/user/login', {username, password}, 'POST')

// 获取一级/二级分类的列表
export const reqCategorys = (parentId) => request(BASE + '/manage/category/list', {parentId})

// 添加分类
export const reqAddCategory = (categoryName, parentId) => request(BASE + '/manage/category/add', {categoryName, parentId}, 'POST')

// 更新分类
export const reqUpdateCategory = ({categoryId, categoryName}) => request(BASE + '/manage/category/update', {categoryId, categoryName}, 'POST')

// 获取一个分类
export const reqCategory = (categoryId) => request(BASE + '/manage/category/info', {categoryId})

// 获取商品分页列表
export const reqProducts = (pageNum, pageSize) => request(BASE + '/manage/product/list', {pageNum, pageSize})

// 更新商品的状态(上架/下架)
export const reqUpdateStatus = (productId, status) => request(BASE + '/manage/product/updateStatus', {productId, status}, 'POST')



/*
搜索商品分页列表 (根据商品名称/商品描述)
searchType: 搜索的类型, productName/productDesc
 */
export const reqSearchProducts = ({pageNum, pageSize, searchName, searchType}) => request(BASE + '/manage/product/search', {
  pageNum,
  pageSize,
  [searchType]: searchName,
})

// 搜索商品分页列表 (根据商品描述)
/*export const reqSearchProducts2 = ({pageNum, pageSize, searchName}) => ajax(BASE + '/manage/product/search', {
  pageNum,
  pageSize,
  productDesc: searchName,
})*/

// 删除指定名称的图片
export const reqDeleteImg = (name) => request(BASE + '/manage/img/delete', {name}, 'POST')

// 添加/修改商品
export const reqAddOrUpdateProduct = (product) => request(BASE + '/manage/product/' + ( product._id?'update':'add'), product, 'POST')
// 修改商品
// export const reqUpdateProduct = (product) => ajax(BASE + '/manage/product/update', product, 'POST')


// 获取所有角色的列表
export const getAllRoles = () => request(BASE + '/role/findAllRole')
export const deleteRole = (id) => request(BASE + '/role/delete', {id}, 'GET')
//根据部门查询角色信息
export const findRoleByDepartmentId = (id) => request(BASE + 'role/findRoleByDepartmentId', {id}, 'GET')

export const addRole = (role) => request(BASE + '/role/create', role, 'POST')
export const updateRole = (role) => request(BASE + '/role/update', role, 'POST')


// 获取所有部门
export const getDepartmentList = () => request(BASE + '/dept/findTree')
//删除部门
export const DeleteDepartment = (id) => request(BASE + '/dept/delete', {id}, 'GET')
// 添加/更新部门
export const AddOrUpdateDepartment = (department) =>(request(BASE + '/dept/'+(department.id ? 'update' : 'create'), department, 'POST'))

//通过ID查询部门信息
export const getDepartment = (id) => request(BASE + '/dept/findDepartmentById',{id}, 'GET')

// 获取所有用户的列表s
export const findUserList = () => request(BASE + '/user/findUserList')
// 删除指定用户
export const reqDeleteUser = (id) => request(BASE + '/user/delete', {id}, 'GET')
// 添加/更新用户
export const reqAddOrUpdateUser = (user) => request(BASE + '/user/'+(user.id ? 'update' : 'create'), user, 'POST')

/*
json请求的接口请求函数
 */
export const reqWeather = (city) => {

  return new Promise((resolve, reject) => {
    const url = 'http://api.map.baidu.com/telematics/v3/weather?location='+encodeURIComponent(city)+'&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
    // 发送jsonp请求
    jsonp(url, {}, (err, data) => {
      // 如果成功了
      if (!err && data.status==='success') {
        // 取出需要的数据
        const {dayPictureUrl, weather} = data.results[0].weather_data[0]
        resolve({dayPictureUrl, weather})
      } else {
        // 如果失败了
        message.error('获取天气信息失败!')
      }

    })
  })
}
// reqWeather('北京')
/*
jsonp解决ajax跨域的原理
  1). jsonp只能解决GET类型的ajax请求跨域问题
  2). jsonp请求不是ajax请求, 而是一般的get请求
  3). 基本原理
   浏览器端:
      动态生成<script>来请求后台接口(src就是接口的url)
      定义好用于接收响应数据的函数(fn), 并将函数名通过请求参数提交给后台(如: callback=fn)
   服务器端:
      接收到请求处理产生结果数据后, 返回一个函数调用的js代码, 并将结果数据作为实参传入函数调用
   浏览器端:
      收到响应自动执行函数调用的js代码, 也就执行了提前定义好的回调函数, 并得到了需要的结果数据
 */