export const needMixin = {
  created () {
    setTimeout(() => {
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }, 20)
  }
}
