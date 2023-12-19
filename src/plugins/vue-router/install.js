import View from './components/view'
import Link from './components/link'

// 导出 Vue 根实例，可以在其他地方使用
export let _Vue

// 安装插件 这个插件依赖于Vue
export function install(Vue) {
  // 防止重复注册
  if (install.installed && _Vue === Vue) return
  install.installed = true

  // 保存Vue的根实例
  _Vue = Vue

  const isDef = v => v !== undefined

  // 核心：全局混入，每个组件都会执行beforeCreate中的代码
  Vue.mixin({
    beforeCreate() {
      // 1. 根组件实例 new Vue()时配置项中会传入router
      if (isDef(this.$options.router)) {
        // 保存this到_routerRoot中
        this._routerRoot = this
        // 在this中新增_router属性，其值为new Vue()时配置项中传入的router
        this._router = this.$options.router
        // 初始化路由
        this._router.init(this)
        // 把_route变成响应式的
        Vue.util.defineReactive(this, '_route', this._router.history.current)
      } else {
        // 2. 子组件  去父组件实例中获取
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this
      }
    },
  })

  // 在Vue的原型上定义两个属性，通过this.$router  this.$route访问
  Object.defineProperty(Vue.prototype, '$router', {
    get() {
      return this._routerRoot._router
    },
  })
  Object.defineProperty(Vue.prototype, '$route', {
    get() {
      return this._routerRoot._route
    },
  })

  // Vue全局注册组件
  Vue.component('RouterView', View)
  Vue.component('RouterLink', Link)
}
