import {hostName} from '../config';
import {getData,postData} from '../plugins/fetch';

const BASE_URL = '/api/v1'
export const listBlocks = async()=>{
  const res = await getData(`${hostName}${BASE_URL}/blocks`)
  if(res.code!==200){
    return
  }
  return res.data;
}

export const getBlockById = async (id)=>{
  const res = await getData(`${hostName}${BASE_URL}/blocks/${id}`)
  if(!res.code===200){
    console.error('getBlockById failed,',res);
    return ;
  }
  return res.data;
}

export const createBlock = async (block)=>{
  const res = await postData(`${hostName}${BASE_URL}/addBlock`,{block},{
    headers:{
      'Content-Type':'application/json'
    }
  });
  console.log('创建区块res-->',res,res.json())
  if(res.code!==200){
    console.error('createBlock error',res);
    return;
  }
  return res.data;
}
