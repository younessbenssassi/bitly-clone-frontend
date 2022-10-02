export default [
    {
        path: '/errors/error404',
        name: 'Error404',
        component: () => import(/* webpackChunkName: "Error404" */ '@/views/errors/Error404'),
        meta: {
            title: 'Bitly - Not found',
            public:true
        }
    }

]
