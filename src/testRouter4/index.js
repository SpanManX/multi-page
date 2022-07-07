import {createRouter, createWebHistory, createWebHashHistory} from 'vue-router'
import other from './other'
import other1 from './other1'
import other2 from './other2'
import other3 from './other3'
import other4 from './other4'

const routes = [
    ...other,
    ...other1,
    ...other2,
    ...other3,
    ...other4
]

const router = createRouter({
    // history: createWebHistory(),
    history: createWebHashHistory(),
    routes
})
// 测试是否截取到0

// 测试是否截取到1

router.beforeEach((to, form, next) => {
    next()
})

export default router
