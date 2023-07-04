import {getData,postData} from '../plugins/fetch';
import {hostName} from '../config';
import {Message} from '@alifd/next';

export const getSchema = async(name)=>{
  const res = await getData(`${hostName}/api/v1/schema/${name}`);
  return res && res.data && JSON.parse(res.data);
} ;

export const updateSchema = async (name,schema,isSilent=false)=>{
  const params = {
    name,
    data:JSON.stringify(schema)
  }
  const res = await postData(`${hostName}/api/v1/updateSchema`,params);
  if(res?.code === 200){
    return !isSilent ? Message.success('成功保存到本地') : null;
  }
  isSilent ? console.log('保存失败'):Message.error('保存失败')
}

export const removeSchema = async (name,isSilent = false)=>{
  const res = await postData(`${hostName}/api/v1/removeSchema`,{
    name
  })
  if(res?.code === 200){
    return !isSilent ? Message.success('删除成功') : null;
  }
  isSilent ? console.log('删除失败'):Message.error('删除失败')
}
