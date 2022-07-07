export default [
    {
        path: '/about',
        component: () => import('../views/About')
    }, {
        path: '/test',
        component: () => import('../views/test')
    },
]
