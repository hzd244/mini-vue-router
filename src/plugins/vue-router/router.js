import { install } from './install'
import { createMatcher } from './create-matcher'
import HashHistory from './history/hash'

export default class VueRouter {
  constructor(options = {}) {
    this.options = options
    // matcher中会得到两个方法：1. match: 负责匹配路径  2. addRoutes: 动态添加路由配置
    this.matcher = createMatcher(options.routes || [], this)

    // 路由模式
    this.mode = options.mode || 'hash'
    this.history = new HashHistory(this)
  }
  // 初始化——app指代的是Vue根实例
  init(app) {
    // 如何初始化——先根据当前路径，显示到指定的组件
    const history = this.history
    const setupHashLister = () => {
      history.setupListener()
    }
    history.transitionTo(history.getCurrentLocation(), setupHashLister)
    history.listen(route => {
      app._route = route
    })
  }
  match(location) {
    return this.matcher.match(location)
  }
}

VueRouter.install = install
