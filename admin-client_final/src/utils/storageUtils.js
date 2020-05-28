/*
进行local数据存储管理的工具模块
 */
import store from 'store'
const USER_KEY = 'user_key'
const MENU_KEY = 'menu_key'
const TOKEN = 'token'
export default {

  saveToekn (token) {
    // localStorage.setItem(USER_KEY, JSON.stringify(user))
    store.set(TOKEN, token)
  
  },

  getToekn () {
   
    return store.get(TOKEN) || null
  },
  removeToken () {
    // localStorage.removeItem(USER_KEY)
    store.remove(TOKEN)
  },


  /*
  保存user
   */
  saveUser (user) {
    // localStorage.setItem(USER_KEY, JSON.stringify(user))
    store.set(USER_KEY, user)
  },

  /*
  读取user
   */
  getUser () {
    // return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
    return store.get(USER_KEY) || {}
  },

  /*
  删除user
   */
  removeUser () {
    // localStorage.removeItem(USER_KEY)
    store.remove(USER_KEY)
  },


  saveMenus (menu) {
    // localStorage.setItem(USER_KEY, JSON.stringify(user))
    store.set(MENU_KEY, menu)
  },

 
  getMenu () {
    // return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
    return store.get(MENU_KEY) || {}
  },

 
  removeMenu () {
    // localStorage.removeItem(USER_KEY)
    store.remove(MENU_KEY)
  }
}