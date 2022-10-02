export default [
    {
        path: '/:generated_link',
        name: 'RedirectPage',
        component: () => import(/* webpackChunkName: "RedirectPage" */ '@/views/pages/RedirectPage'),
        meta: {
            title: 'Bitly - Redirecting',
            public:true
        }
    },
    {
        path: '/manage/generate-link',
        name: 'GenerateLink',
        component: () => import(/* webpackChunkName: "GenerateLinkPage" */ '@/views/pages/GenerateLinkPage'),
        meta: {
            title: 'Bitly - Create link',
        }
    },
    {
        path: '/manage/links',
        name: 'Links',
        component: () => import(/* webpackChunkName: "LinksPage" */ '@/views/pages/LinksPage'),
        meta: {
            title: 'Bitly - Links',
        }
    },
    {
        path: '/manage/custom-links',
        name: 'CustomLinks',
        component: () => import(/* webpackChunkName: "CustomLinksPage" */ '@/views/pages/CustomLinksPage'),
        meta: {
            title: 'Bitly - Custom links',
        }
    },
    {
        path: '/manage/settings',
        name: 'Settings',
        component: () => import(/* webpackChunkName: "SettingsPage" */ '@/views/pages/SettingsPage'),
        meta: {
            title: 'Bitly - Settings',
        }
    },
]
