import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/views/Index.vue'
import Types from '@/views/Types.vue'
import Relayers from '@/views/Relayers.vue'
import Loans from '@/views/Loans.vue'
import Blocks from '@/views/Blocks.vue'
import SingleBlock from '@/views/SingleBlock.vue'
import Request from '@/views/Request.vue'

const routerHistory = createWebHistory()
const routes = [
  {
    path: '/',
    component: Index,
  },
  { path: '/types', component: Types },
  { path: '/relayers', component: Relayers },
  { path: '/loans', component: Loans },
  { path: '/blocks', component: Blocks },
  { path: '/block/:id', component: SingleBlock },
  { path: '/request', component: Request },
]

const router = createRouter({
  history: routerHistory,
  routes,
})

export default router
