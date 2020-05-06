import router from './router'
import store from './store'
import {Message} from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {getToken} from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({showSpinner: false}) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // alan
  // console.log('routing from ' + from.path + ' to ' + to.path)
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()
  // const hasToken = "token"
  if (hasToken) {
    // console.info('用户具有'+hasToken)
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({path: '/'})
      NProgress.done()
    } else { //目标url 不是 /login
      console.debug('curr siteId: %s', store.getters['site/id'])
      //尝试恢复场地 状态
      if (store.getters['site/id'] == 0) { //刷新页面导致store状态重置，默认值为0
        let siteName = sessionStorage.getItem('siteName');
        let siteId = sessionStorage.getItem('siteId');
        console.debug('sessionStorage siteId: %s, siteName: %s', siteId, siteName)
        if (siteId && siteName) { //判断sessionStorage 是否保存状态
          console.debug('加载sessionStorage 到 store site')
          store.dispatch('site/setSite', {name: siteName, id: siteId})
        }
      }
      // 判断请求 是否来自leaflet 地图
      if(to.path==='/site/basic'&&to.query.from=='leaflet'){ //判断
          store.dispatch("site/setSite",{name:"ecust", id: 110})
      }
      //刷新页面，导致重新拉取用户信息
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) { // 判断是否已经拉取过用户信息
        next()
      } else {
          try {
            // get user info
            await store.dispatch('user/getInfo') // todo 同步拉取用户信息？

            next()
          } catch (error) {
            // remove token and go to login page to re-login
            await store.dispatch('user/resetToken')
            Message.error(error || 'Has Error')
            next(`/login?redirect=${to.path}`)
            NProgress.done()
          }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
