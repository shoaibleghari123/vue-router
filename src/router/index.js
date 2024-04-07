/* eslint-disable prettier/prettier */
import { createRouter, createWebHistory } from 'vue-router'
import EventList from '../views/EventList'
import About from '../views/AboutView'
import EventDetails from '@/views/event/EventDetails'
import EventRegister from '../views/event/RegisterView'
import EventEdit from '../views/event/EditView'
import LayoutEvent from '../views/event/LayoutView'
import NotFound from '@/views/NotFound'
import NetworkError from '@/views/NetworkError'
import NProgress from 'nprogress'
import EventService from '@/services/EventService'
import GStore from '@/store'

const routes = [
  {
    path: '/',
    name: 'EventList',
    component: EventList,
    props: route => ({ page: parseInt(route.query.page) || 1 })
  },
  {
    path: '/404/:resource',
    name: '404Resource',
    component: NotFound,
    props: true,
  },
  {
    path: '/network-error',
    name: 'NetworkError',
    component: NetworkError
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/about-us',
    name: 'About',
    component: About,
    // alias: '/about' //not recommanded due to SEO search
  },
  {
    path: '/about',
    redirect: { name: 'About' },
  },
  {
    path: '/events/:id',
    name: 'LayoutEvent',
    props: true,
    component: LayoutEvent,
    beforeEnter: to => {
      EventService.getEvent(to.params.id)
      .then((response) => {
        GStore.event = response.data
      })
      .catch((error) => {
        if(error.response && error.response.status == 404){
          return {
          name: '404Resource',
          params: { resource: 'event' }
        }
        }else{
          return { name: 'NetworkError' }
        }
       // console.log(error)

     
      })
    },
    children: [
      {
        path: '',
        name: 'EventDetail',
        component: EventDetails,
      },
      {
        path: 'edit',
        name: 'EventEdit',
        component: EventEdit,
      },
      {
        path: 'register',
        name: 'EventRegister',
        component: EventRegister,
      }
    ],
  },
  {
    path: '/event/:afterEvent(.*)',
    // redirect: to => {
    //   return { name: 'EventDetail', params: { id: to.params.id } }
    // }
    // redirect: () => {
    //   return { name: 'EventDetail' }
    // }
    redirect: to => {
      return { path: '/events/' + to.params.afterEvent }
    }
    // children: [
    //   { path: 'register', redirect: () => ({ name: 'EventRegister' }) },
    //   { path: 'edit', redirect: () => ({ name: 'EventEdit' }) }
    // ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach(() => {
  NProgress.start()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
