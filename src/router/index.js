import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path:'/',
        name:'App',
        component : import('@/App.vue')
    },
    {
        path:'/todo',
        name:'todo',
        component : () => import('../views/ToDoPage.vue')
    },
    {
        path:'/progress',
        name : 'progress',
        component: () => import('@/views/ProgressPage.vue')
    },
    {
        path:'/completed',
        name : 'completed',
        component: () => import('@/views/CompletedPage.vue')
    },
    {
        path:'/all',
        name : 'all',
        component: () => import('@/views/LayoutPage.vue')
    },
    {
        path:'/taskdetail/:id',
        name:'taskdetail',
        component: () => import('@/views/DetailView.vue')
    },
    {
        path: '/bukudetail/:id',
        name:'bukudetail',
        component: () => import('@/views/BukuDetailView.vue')
    },
    {
        path:'/:catchAll(.*)',
        name:'notfound',
        component: () => import('@/views/NotFound.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router