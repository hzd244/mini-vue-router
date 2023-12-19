import History from './base'

function getHash() {
  return window.location.hash.slice(1)
}

export default class HashHistory extends History {
  constructor(router) {
    super(router)
  }
  // 获取当前路径的hash值
  getCurrentLocation() {
    return getHash()
  }
  // 监听路径的变化
  setupListener() {
    window.addEventListener('hashchange', () => {
      this.transitionTo(getHash())
    })
  }
}
