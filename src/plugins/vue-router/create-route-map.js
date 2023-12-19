export function createRouteMap(routes, oldPathList, oldPathMap) {
  const pathList = oldPathList || []
  const pathMap = oldPathMap || Object.create(null)

  routes.forEach(route => {
    addRouteRecord(pathList, pathMap, route)
  })

  return {
    pathList,
    pathMap,
  }
}

function addRouteRecord(pathList, pathMap, route, parent) {
  // 如果有父亲，路径前拼接上父路径
  let path = parent ? `${parent.path}/${route.path}` : route.path

  const record = {
    path,
    component: route.component,
    parent,
  }

  // 如果有孩子，递归遍历
  if (route.children) {
    route.children.forEach(child => {
      addRouteRecord(pathList, pathMap, child, record)
    })
  }

  if (!pathMap[record.path]) {
    pathList.push(record.path)
    pathMap[record.path] = record
  }
}
