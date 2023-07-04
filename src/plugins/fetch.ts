export const getData = (url:string)=>{
  return new Promise((resolve,reject)=>{
    fetch(url,{
      method:'GET',
      mode:'cors',
      cache:'no-cache',
      headers:{
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Credentials':'*',
        'Content-Type':'application/json'
      }
    }).then(res=>{
      if(res.ok){
        return resolve(res.json())
      }
      resolve({msg:'请求失败',code:400})
    }).catch(err=>{
      reject({msg:'请求失败',code:500})
    })
  })
}
export const postData = (url:string,data:Object,options?:Object)=>{
  let bodyParams='';
  if(!options||!options?.headers){
    if(Object.keys(data).length){
      const len = Object.entries(data).length;
      Object.entries(data).forEach((item,index)=>{
        const [key,val] = item;
        bodyParams+= index === len-1 ? `${key}=${val}`:`${key}=${val}&`
      })
    }
  }

  return new Promise((resolve,reject)=>{
    fetch(url,{
      method:'POST',
      mode:'cors',
      cache:'no-cache',
      headers:!options?{
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Credentials':'*',
        'Content-Type':'application/x-www-form-urlencoded'
      }:options.headers,
      body:options?bodyParams:JSON.stringify(data),
    }).then(res=>{
      if(res.ok){
        return resolve(res.json())
      }
      resolve({msg:'请求失败',code:400})
    }).catch(err=>{
      reject({msg:'请求失败',code:500})
    })
  })
}
