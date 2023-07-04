import React,{FC,ReactElement,useState,useEffect} from 'react';
import { Dialog,Form,Input,Radio,Menu,Button,Balloon,Grid,Icon,Message} from '@alifd/next';
import { PluginProps } from "@alilc/lowcode-types";
import { project,config } from '@alilc/lowcode-engine';
import { CURRENT_PAGE, DEFAULT_PAGE_KEY, PREFIX_KEY, PROJECT_ROUTER_SCHEMA_KEY } from '@/utils/const';
import { QuickShowRet } from '@alifd/next/types/dialog';
import {
  getProjectRouterFromLocalStorage,
  getProjectRouterSchemaByKey,
  getProjectSchemaToLocalStorage, getSchemaKeyByRouteInfo, getSchemaListByRouteInfo,
  setProjectRouterSchemaToLocalStorage, setProjectRouterToLocalStorage,
  traverseRouteName
} from '@/utils/store';
// @ts-ignore
import { getSchema,updateSchema,addSchema,removeSchema} from '@/api/schema';
import originSchema from '../../assets/schema.json';
import { isArray, isPromise } from '@/utils/type';
// @ts-ignore
import { createRouter,updateRouter } from '@/api/projectRouter';
const {Row,Col} = Grid;
const {SubMenu,Item} = Menu;


const formItemLayout = {
  labelCol:{
    fixedSpan:6
  },
  wrapperCol:{
    span:16
  }
}

const OPERATE_ROUTER_KEY = {
  UP_INSERT:'-1',
  EDITOR_CUR:'0',
  DOWN_INSERT:'1',
  CHILD_INSERT:'2',
  REMOVE:'3'
}
// @ts-ignore
export const PagesPane:FC<PluginProps>=():ReactElement=>{
  const [datas,setDatas] = useState([]);
  const [activeKey,setActiveKey] = useState('0');
  const [key,setKey] = useState('');

  const defaultSelectedKeys = config.get(CURRENT_PAGE)||DEFAULT_PAGE_KEY;
  let dialog:QuickShowRet|null = null;
  let preSelectRouterKey = defaultSelectedKeys;
  // @ts-ignore
  useEffect(async ()=>{
    const router = getProjectRouterFromLocalStorage();
    setDatas(router);
    let schema = getProjectRouterSchemaByKey(defaultSelectedKeys);
    if(!schema){
      let schemaKey = traverseRouteName(defaultSelectedKeys);
      schema = await updateSchema(schemaKey)||originSchema;
    }
    project.openDocument(schema);
  },[])

  const checkRouteName = (rule: any, value: any, callback: (arg0: string) => any)=>{
    if(!value){
      return callback("请输入路由name");
    }
    // @ts-ignore
    let findRepeat = datas.find(route=>route.name === value);
    if(findRepeat){
      return callback("新路由name不能重复")
    }
  }
  const updateSchemaByKey = async (key:string)=>{
    const schemaKey = traverseRouteName(key);
    const schema = getProjectRouterSchemaByKey(key);
    await updateSchema(schemaKey,schema,true);
  }
  const handleMenuSelect = async (selectedKeys:string[],savePre=false)=>{
    const key = selectedKeys[0] as string;
    if(savePre){
      setProjectRouterSchemaToLocalStorage(preSelectRouterKey);
      await updateSchemaByKey(preSelectRouterKey);
    }
    preSelectRouterKey = key;
    setActiveKey(key);
    config.set(CURRENT_PAGE,key);
    const schemaKey = traverseRouteName(key);
    let schema = await getSchema(schemaKey);
    if(!schema || isPromise(schema)){
      schema = originSchema;
    }
    project.removeDocument(project.currentDocument as any);
    project.openDocument(schema);
    setProjectRouterSchemaToLocalStorage(key);
  }

  const createSchema = async (name:string)=>{
    await addSchema(name,originSchema,true);
  }

  const onCreateRoute = async (key:string,itemKey:string,itemData:any,formData:any)=>{
    const redatas = [...datas];
    let res = redatas as any[];
    const dataPathArray = itemKey ? itemKey.split('-'):[];
    if((key===OPERATE_ROUTER_KEY.CHILD_INSERT||
    key===OPERATE_ROUTER_KEY.UP_INSERT||
    key=== OPERATE_ROUTER_KEY.DOWN_INSERT)
      && dataPathArray.length>4){
      return Message.error('最多添加到四级路由')
    }
    const pageInfo = key === OPERATE_ROUTER_KEY.EDITOR_CUR ? {children:[],...itemData,...formData}:{...formData,children:[],isFromLowcode:true};
    let index = 0;
    while (index < dataPathArray.length){
      // @ts-ignore
      res = key === OPERATE_ROUTER_KEY.CHILD_INSERT ? res[dataPathArray[index]].children : index===0 ? res : res[dataPathArray[index-1]];
      index++;
    }
    dialog?.hide();
    // 空数据直接添加
    if(!itemData){
      res.push(pageInfo);
      setDatas(redatas);
      await createSchema(formData.name);
      await createRouter(redatas);
      return;
    }
    const item = dataPathArray[index-1];
    if(key === OPERATE_ROUTER_KEY.UP_INSERT || key === OPERATE_ROUTER_KEY.DOWN_INSERT || key === OPERATE_ROUTER_KEY.EDITOR_CUR){
      // 向前或向后编辑元素
      const i = key === OPERATE_ROUTER_KEY.EDITOR_CUR ? +item:+item+1+(key);
      if(!isArray(res)){
        // @ts-ignore
        res = res?.children||[]
      }
      // @ts-ignore
      res.splice(i,key===OPERATE_ROUTER_KEY.EDITOR_CUR?1:0,pageInfo);
    } else if(key === OPERATE_ROUTER_KEY.CHILD_INSERT){
      res.push(pageInfo);
    }
    setProjectRouterToLocalStorage(redatas);
    setDatas(redatas);
    await createSchema(formData.name);
    await createRouter(redatas);
  }

  const handleRemoveRouterSchema = async(key:string,item:any)=>{
    const schemaKey = traverseRouteName(key);
    await removeSchema(schemaKey);
    const schemaList = getSchemaListByRouteInfo(item,[]);
    schemaList.map(schemaInfo=>{
      removeSchema(schemaInfo,true);
    });
    const objKeyList = getSchemaKeyByRouteInfo(item,key,[]);
    let localData = getProjectRouterFromLocalStorage()||{};
    objKeyList.length && objKeyList.forEach(OBJ_KEY=>{
      localData[OBJ_KEY] && delete localData[OBJ_KEY];
    })
    window.localStorage.setItem(
      PROJECT_ROUTER_SCHEMA_KEY,
      JSON.stringify(localData)
    );
    let OBJ_KEY =`${PREFIX_KEY}${key}`;
    localData = getProjectSchemaToLocalStorage();
    if(!localData[OBJ_KEY]){
      Object.keys(localData).forEach((prefix,index)=>{
        if(index===0){
          OBJ_KEY = prefix;
        }
      })
      let arr = OBJ_KEY.split('-');
      const [prefixKey,menuKey] = arr;
      await handleMenuSelect([menuKey],false);
    }
  }
  const handleRemove = async(menuKey:string,itemKey:string,item:any)=>{
    const itemArr = itemKey.split('-');
    const redatas = [...datas];
    let res = redatas as any[];
    let index=0;
    while (index<itemArr.length){
      // @ts-ignore
      res = res[itemArr[index]].children;
      index++
    }
    const removeIndex = res.length ? res.findIndex(e=>e.name===item.name):0;
    await handleRemoveRouterSchema(itemKey,item);
    res.splice(removeIndex,1);
    setProjectRouterToLocalStorage(redatas);
    setDatas(redatas);
    await updateRouter(redatas,menuKey);
  }

  const handleContextMenuItemClick = (menuKey:string,itemKey:any,item:any)=>{
    console.log('handleContextMenuItemClick',menuKey,'itemKey',itemKey,'item',item);
    if(menuKey === OPERATE_ROUTER_KEY.REMOVE){
      dialog = Dialog.confirm({
        v2:true,
        title:'确定删除当前路由?',
        onOk:()=>{
          handleRemove(menuKey,itemKey,item);
          dialog?.hide();
        },
        onCancel:()=>{
          dialog?.hide();
        }
      })
      return;
    }
    let initValue = {isShow:1,meta:[]};
    setKey(menuKey);
    if(menuKey === OPERATE_ROUTER_KEY.EDITOR_CUR){
      initValue = {...initValue,...item};
    }
    dialog = Dialog.show({
      v2:true,
      title: menuKey === OPERATE_ROUTER_KEY.EDITOR_CUR?"编辑路由":"新增路由",
      footer:' ',
      content:(
        <Form {...formItemLayout} colon style={{width:'450px'}} value={initValue}>
          <Form.Item
            name="title"
            label="路由(title)"
            required
            requiredMessage="请输入路由名称!">
            <Input name="title" placeholder="title"/>
          </Form.Item>
          <Form.Item
            name="path"
            label="路由(path)"
            required
            requiredMessage="请输入路由路径!">
            <Input name="path" placeholder="path"/>
          </Form.Item>
          <Form.Item
            name="title"
            label="路由(name)"
            required
            requiredMessage="请输入路由name!"
            validator={checkRouteName}>
            <Input name="name" placeholder="路由的唯一标识" style={{minWidth:'273px'}}/>
          </Form.Item>
          <Form.Item
            name="role"
            label="路由(role)">
            <Row>
              <Col span="22" >
                <Form.Item style={{margin:0}}>
                  <Input name="role" placeholder="多个权限使用逗号隔开" />
                </Form.Item>
              </Col>
              <Col span="2">
                <Balloon closable={false} trigger={<Icon type="prompt" size="small" style={{color:'#5584ff'}}></Icon>}>多个权限使用逗号隔开</Balloon>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item
            name="isShow"
            label="是否在主应用展示"
            required
            requiredMessage="请选择是否在主应用中展示">
            <Radio.Group
              name="isShow"
              dataSource={[
              {
                label:'展示',
                value:1
              },
              {
                label:'不展示',
                value:0
              }
            ]}>

            </Radio.Group>
          </Form.Item>
          <Form.Item
            label=" "
            colon={false}>
            <Form.Submit
              type="primary"
              validate
              onClick={(values,errors)=>!errors && onCreateRoute(menuKey,itemKey,item,values)}
              style={{marginRight:8}}>
              创建
              {/*{ menuKey === OPERATE_ROUTER_KEY.EDITOR_CUR && '修改'}*/}
              {/*{ menuKey !== OPERATE_ROUTER_KEY.EDITOR_CUR && '创建'}*/}
            </Form.Submit>
            <Form.Reset>重置</Form.Reset>
          </Form.Item>
        </Form>
      )
    })
  }

  const handleContextMenu = (e:MouseEvent,itemKey:string,item:any)=>{
    e.preventDefault();
    e.stopPropagation();
    const target = e.target as HTMLElement;
    const { top,left } = target.getBoundingClientRect();
    Menu.create({
      target:e.target,
      offset:[e.clientX - left,e.clientY - top],
      className:'context-menu',
      popupClassName:'context-menu',
      onItemClick:(key:string)=> handleContextMenuItemClick(key,itemKey,item),
      defaultOpenKeys:'0',
      selectMode:'multiple',
      children:[
        <Menu.Item key={OPERATE_ROUTER_KEY.UP_INSERT}>在上面新建路由</Menu.Item>,
        <Menu.Item key={OPERATE_ROUTER_KEY.DOWN_INSERT}>在下面新建路由</Menu.Item>,
        <Menu.Item key={OPERATE_ROUTER_KEY.CHILD_INSERT}>创建子路由</Menu.Item>,
        <Menu.Item key={OPERATE_ROUTER_KEY.EDITOR_CUR}>编辑当前路由</Menu.Item>,
        <Menu.Item key={OPERATE_ROUTER_KEY.REMOVE}>删除当前路由</Menu.Item>
      ]
    })
  }

  const reRenderItems = (data:any,index:number,baseKey:string)=>{
    const title = data.title||`新的页面${index}`;
    const key = baseKey ? `${baseKey}-${index}`:`${index}`;
    if(!data.children || !data.children.length){
      return (
        <Item className={ !data.isShow?'gray':''} key={key} onContextMenu={(e)=>handleContextMenu(e,key,data)}>
          {title}
        </Item>
      )
    }
    return (
      <SubMenu key={key} label={title} onContextMenu={(e)=>handleContextMenu(e,key,data)} selectable>
        { data.children.map((subData:any,i:number)=>reRenderItems(subData,i,key))}
      </SubMenu>
    )
  }
  return (
    <div className="lowcode-plugin-pages">
      {
        datas && datas.length ? (
          <Menu openMode="single" defaultSelectedKeys={defaultSelectedKeys} selectMode="single" embeddable onSelect={handleMenuSelect}>
            {datas.map((data,index)=>reRenderItems(data,index,''))}
          </Menu>
        ):
          <div className="empty-container">
          <Button type="primary" onClick={()=>handleContextMenuItemClick('1','',{})}>新增路由</Button>
        </div>
      }
    </div>
  )
}
PagesPane.displayName = 'PagesPane';

