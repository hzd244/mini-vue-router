export function createRoute(record, location) {
  let res = []
  // record  =>  {paht: '/about/a', component: xxx, parent: '/about'}
  if (record) {
    while (record) {
      res.unshift(record)
      record = record.parent
    }
  }
  return {
    ...location,
    matched: res,
  }
}

export default class History {
  constructor(router) {
    this.router = router
    this.current = createRoute(null, {
      path: '/',
    })
  }
  // 跳转的核心逻辑
  transitionTo(location, onComplete) {
    // route就是当前路径需要匹配哪些路由
    // 例如：访问路径 /about/a   =>   {path: '/about/a', matched: [{paht: '/about/a', component: xxx, parent: '/about'}, {paht: '/about', component: xxx, parent: undefined}]}
    let route = this.router.match(location)
    if (
      this.current.path === location &&
      route.matched.length === this.current.matched.length
    ) {
      return
    }
    this.updateRoute(route)
    onComplete && onComplete()
  }
  // 更新路由
  updateRoute(route) {
    this.current = route
    this.cb && this.cb(route) // 监听路径的变化
  }
  listen(cb) {
    this.cb = cb
  }
}
