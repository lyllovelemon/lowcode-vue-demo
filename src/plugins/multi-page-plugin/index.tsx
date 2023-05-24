import React from 'react'
import {Nav } from '@alifd/next'
import { project } from '@alilc/lowcode-engine';
import originSchema from '@/assets/home.json'
import {setDefaultPageToLocalStorage} from '@/utils/store';

const { Item } = Nav
export default ()=>{
  const queryString = location.search
  const defaultCurrentPage = queryString.includes('home')?'home':'schema'

  // 路由定义(暂时写死)
   const routes = [
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
            title:'角色管理'
          }
        },
        {
          path:'lowcodepage2',
          name:'lowcodepage2',
          key:'schema',
          meta:{
            title:'账户管理'
          }
        }
      ]
    }
  ];
  // @ts-ignore
  const routeList = (routes[0].children||[]).map((route: { meta: { title: any; }; key: any; disabled: any; })=>{
    return{
      title:route.meta.title||'',
      key:route.key,
      disabled:route.disabled||false
    };
  })
  console.log('低代码下的路由',routeList)
  const onSelect= async (keys: string[], items: Object)=>{
    const key = keys[0];
    const schema = key==='home'? originSchema : require(`../../assets/${key}.json`)
    console.log('多页选中 schema',schema,key)

    project.openDocument(schema);
    setDefaultPageToLocalStorage(key)

    if(key){
      location.href =`${location.pathname}?page=${key}`
    }
  }
  // @ts-ignore
  return  <Nav
   className="basic-nav"
   mode="popup"
   direction="ver"
   type="line"
   defaultSelectedKeys={[defaultCurrentPage]}
   selectedKeys={[defaultCurrentPage]}
   triggerType="click"
   onSelect={onSelect}
 >
    {
      routeList.map(route=>{
        // @ts-ignore
        return (
          <Item key={route.key}>{route.title}</Item>
        )
      })
    }
 </Nav>
}
