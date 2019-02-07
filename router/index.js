import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import Home from '@/components/Home.vue'
import Main from '@/components/pages/main.vue'
import Cash from '@/components/pages/cash.vue'
import ChangeTable from '@/components/pages/changetable.vue'
import CheckOut from '@/components/pages/checkout.vue'
import Code from '@/components/pages/code.vue'
import Order from '@/components/pages/order.vue'
import OrderSure from '@/components/pages/ordersure.vue'
import Pay from '@/components/pages/pay.vue'
import Receipt from '@/components/pages/receipt.vue'

export default new VueRouter({
    routes:[
        {
            path:'/',name:'Home',component:Home,
            redirect:'/main',
            meta: {requireAuth: true},
            children:[
                {path:'/main',name:'main',component:Main, meta: { keepAlive: false,requireAuth: true}},
                {path:'/cash',name:'cash',component:Cash, meta: { keepAlive: false,requireAuth: true}},
                {path:'/changetable',name:'changetable',component:ChangeTable, meta: { keepAlive: false,requireAuth: true}},
                {path:'/checkout',name:'checkout',component:CheckOut, meta: { keepAlive: false,requireAuth: true}},
                {path:'/code',name:'code',component:Code, meta: { keepAlive: false,requireAuth: true}},
                {path:'/order',name:'order',component:Order, meta: { keepAlive: false,requireAuth: true}},
                {path:'/ordersure',name:'ordersure',component:OrderSure, meta: { keepAlive: false,requireAuth: true}},
                {path:'/pay',name:'pay',component:Pay, meta: { keepAlive: false,requireAuth: true}},
                {path:'/receipt',name:'receipt',component:Receipt, meta: { keepAlive: false,requireAuth: true}},
            ]
        }

    ]
})
