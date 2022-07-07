import Vue from 'vue'
import VueRouter from 'vue-router'
import test from '../pages/page1/router'
import test1 from '../pages/page2/router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: () => import('../views/layout'),
        children: [
            ...test,
            ...test1
        ]
    },
]

const router = new VueRouter({
    // mode: 'history',
    mode: 'hash',
    routes
})
let a = ({})

router.beforeEach((to, from, next) => {
    console.log(to, from, 'beforeEach')
    next()
})

router.afterEach((to, from, failure) => {
    console.log(to, from, failure, 'afterEach')
})

export default router
