import {getData,postData} from '../plugins/fetch';
import {hostName} from '../config';
import {Message} from '@alifd/next';

const OPERATE_ROUTER_KEY = {
  UP_INSERT:'-1',
  EDITOR_CUR:'0',
  DOWN_INSERT:'1',
  CHILD_INSERT:'2',
  REMOVE:'3'
}
export const getRouterList = async()=>{
  const res = await getData(`${hostName}/api/v1/routerList`);
  let result = []
  if(res?.data){
    result = JSON.parse(res?.data).projectRouter||[];
  }
  return result;
}

export const createRouter = async (routerData)=>{
  routerData = "{\n\"projectRouter\":"+JSON.stringify(routerData)+"\n}";
  const res = await postData(`${hostName}/api/v1/addRouter`,{
    data:routerData
  })
  if(res?.code===200){
    return Message.success('新增路由成功')
  }
  Message.error('新增路由失败')
}

export const updateRouter = async (routerData,menuKey)=>{
  routerData = "{\n\"projectRouter\":"+JSON.stringify(routerData)+"\n}";
  const res = await postData(`${hostName}/api/v1/updateRouter`,{
    data:routerData
  })
  if(res?.code===200){
    return Message.success(`${menuKey === OPERATE_ROUTER_KEY.REMOVE}`?'删除成功':'更新成功')
  }
  Message.error(`${menuKey === OPERATE_ROUTER_KEY.REMOVE}`?'删除失败':'更新失败')
}
