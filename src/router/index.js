import {createRouter,createWebHashHistory} from 'vue-router';
import {setupLowCodeRouteGuard} from '@knxcloud/lowcode-vue-renderer';
import LowcodePage from '../components/page.vue';

export const routes = [
  {
    path:'/',
    redirect:{name:'lowcode'},
    meta:{
      title:'低代码平台'
    }
  },
  {
    path:'/lowcode',
    redirect:{name:'lowcodepage1'},
    name:'lowcode',
    children:[
      {
        path:'lowcodepage1',
        name:'lowcodepage1',
        key:'home',
        meta:{
          title:'首页'
        },
        components:LowcodePage
      },
      {
        path:'lowcodepage2',
        name:'lowcodepage2',
        key:'schema',
        meta:{
          title:'账户管理'
        },
        components:LowcodePage
      }
    ]
  }
];
const router = createRouter({
  history:createWebHashHistory(),
  routes
});
setupLowCodeRouteGuard(router);
export default router;

