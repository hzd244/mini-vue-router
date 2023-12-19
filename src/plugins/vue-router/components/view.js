export default {
  name: 'RouterView',
  functional: true,
  props: {
    name: {
      type: String,
      default: 'default',
    },
  },
  render(h, { parent, data }) {
    let route = parent.$route
    let matched = route.matched
    data.routerView = true
    let depth = 0

    while (parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++
      }
      parent = parent.$parent
    }
    let record = matched[depth]
    if (!record) {
      return h()
    }
    let component = record.component
    return h(component, data)
  },
}
