import { createRouteMap } from './create-route-map'
import { createRoute } from './history/base'

export function createMatcher(routes) {
  // 1. 扁平化用户传入的数据，创建路由映射表
  //    pathList: ['/', '/about', '/about/a', '/about/b']
  //    pathMap: {'/': 记录, '/about': 记录, '/about/a': 记录, '/about/b': 记录,}
  const { pathList, pathMap } = createRouteMap(routes)

  // 2. 动态添加路由的方法
  function addRoutes(routes) {
    createRouteMap(routes, pathList, pathMap)
  }

  // 3. 用来匹配的方法
  function match(location) {
    // 1. 需要找到对应的记录，并且要根据记录产生一个匹配数据
    if (pathMap[location]) {
      return createRoute(pathMap[location], {
        path: location,
      })
    }
    return createRoute(null, {
      path: location,
    })
  }

  return {
    match,
    addRoutes,
  }
}
