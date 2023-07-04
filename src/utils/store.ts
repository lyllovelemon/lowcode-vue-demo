import { material, project } from '@alilc/lowcode-engine';
import { filterPackages } from '@alilc/lowcode-plugin-inject';
import { IPublicEnumTransformStage } from '@alilc/lowcode-types';
import {
  CURRENT_PAGE,
  DEFAULT_PAGE_KEY,
  PREFIX_KEY,
  PROJECT_ROUTER_KEY,
  PROJECT_ROUTER_SCHEMA_KEY
} from '@/utils/const';
import { config } from '@alilc/lowcode-engine';

export const getProjectRouterFromLocalStorage = ()=>{
  const data = window.localStorage.getItem(PROJECT_ROUTER_KEY);
  return data && JSON.parse(data);
}
// 获取路由最大层数
export const getMaxRouterLength = (projectRouter:any)=>{
  let deep = 0;
  function traverseData(data:any[],index:number) {
    data.forEach(e=>{
      if(index>deep){
        deep = index;
      }
      if(e.children.length){
        traverseData(e.children,deep+1);
      }
    })
  }
  traverseData(projectRouter,1);
  return deep;
}

export const getProjectRouterSchemaFromLocalStorage = ()=>{
  const data = window.localStorage.getItem(PROJECT_ROUTER_SCHEMA_KEY);
  return data && JSON.parse(data);
};

export const getProjectRouterSchemaByKey = (key:string)=>{
  const OBJ_KEY=`${PREFIX_KEY}${key}`;
  const data = getProjectRouterSchemaFromLocalStorage();
  return data && data[OBJ_KEY] && data[OBJ_KEY].schema;
};

export const setProjectRouterSchemaToLocalStorage = (key:string)=>{
  const OBJ_KEY=`${PREFIX_KEY}${key}`;
  const localData = getProjectRouterSchemaFromLocalStorage()||{};
  const saveExportSchema = project.exportSchema(IPublicEnumTransformStage.Save);
  localData[OBJ_KEY]={
    schema:saveExportSchema['componentsTree'].pop(),
    componentsMap:saveExportSchema['componentsMap']
  };
  window.localStorage.setItem(
    PROJECT_ROUTER_SCHEMA_KEY,
    JSON.stringify(localData)
  );
};

// 递归获取当前路由name
export const traverseRouteName = (key:string)=>{
  const projectRouter = getProjectRouterFromLocalStorage();
  const keyArr = key.split('-');
  let routeInfo:any = {};
  let i=0;
  while (i < keyArr.length){
    routeInfo = i === 0 ? projectRouter[keyArr[i]]:routeInfo.children[keyArr[i]];
    i++
  }
  return routeInfo?.name;
}

// 根据name获取当前路由信息
export const getRouteInfoByName = (name:string,key:string='0')=>{
  const projectRouter = getProjectRouterFromLocalStorage();
  const keyArr = key.split('-');
  let index = 0;
  let routeInfo:any = projectRouter[keyArr[index]];
  let findItem = null;
  while (routeInfo.children){
    if(index!==0){
      routeInfo = routeInfo.children;
      findItem = routeInfo.find((e: { name: string; })=>e.name===name)
    } else {
      findItem = routeInfo.name === name ? routeInfo:null;
    }
    index++;
  }
  return findItem;
};

export const getSchemaListByRouteInfo = (routeInfo:any,schemaNameList:any[]=[])=>{
  if(!schemaNameList.length){
    schemaNameList.unshift(routeInfo.name);
  }
  if(!routeInfo.children||!routeInfo.children.length){
    return schemaNameList;
  }
  routeInfo.children.map((e: { name: any; })=>{
    schemaNameList.unshift(e.name);
    routeInfo = e;
    getSchemaListByRouteInfo(routeInfo,schemaNameList);
  })
  return schemaNameList;
};

export const getSchemaKeyByRouteInfo = (routeInfo:any,itemKey:string,schemaKeyList:any[]=[])=>{
  let OBJ_KEY=`${PREFIX_KEY}${itemKey}`;
  if(!schemaKeyList.length){
    schemaKeyList.unshift(OBJ_KEY);
  }
  if(!routeInfo.children||!routeInfo.children.length){
    return schemaKeyList;
  }
  routeInfo.children.map((item:any,index:number)=>{
    let key = itemKey+'-'+index;
    OBJ_KEY=`${PREFIX_KEY}${key}`;
    schemaKeyList.unshift(OBJ_KEY);
    routeInfo = item;
    getSchemaKeyByRouteInfo(routeInfo,key,schemaKeyList);
  })
  return schemaKeyList;
}

export const setPackgesToLocalStorage = async () => {
  // @ts-ignore
  const packages = await filterPackages(material.getAssets().packages);
  window.localStorage.setItem('packages', JSON.stringify(packages));
};

export const setProjectSchemaToLocalStorage = () => {
  window.localStorage.setItem(
    'projectSchema',
    JSON.stringify(project.exportSchema(IPublicEnumTransformStage.Save))
  );
};

export const getProjectSchemaToLocalStorage = () => {
  const data = window.localStorage.getItem('projectSchema');
  return data && JSON.parse(data);
};

export const saveSchema = async () => {
  const key = config.get(CURRENT_PAGE)||DEFAULT_PAGE_KEY;
  setProjectRouterSchemaToLocalStorage(key);
  await setPackgesToLocalStorage();
};

// @ts-ignore
export const setProjectRouterToLocalStorage = (router:any)=>{
  window.localStorage.setItem(
    PROJECT_ROUTER_KEY,
    JSON.stringify(router)
  )
}

export const setDefaultPageToLocalStorage = (value:string)=>{
  window.localStorage.setItem('defaultPage',value)
}
