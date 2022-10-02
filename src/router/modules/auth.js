export default [
    {
        path: '/auth/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "LoginPage" */ '@/views/auth/Login'),
        meta: {
            title: 'Bitly - Login',
        }
    },

]
