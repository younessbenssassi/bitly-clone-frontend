export default [
    {
        path: '/settings',
        name: 'Settings',
        component: () => import(/* webpackChunkName: "SettingsPage" */ '@/views/settings/general'),
    },
]
