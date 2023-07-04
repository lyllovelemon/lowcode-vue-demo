const express = require("express");
const fs = require("fs");
const path = require("path");
const process = require("process");
const cors = require("cors");
const { createFile,isFileExists,removeFile } = require("./schemaUtil");
const port = 5556;
const app = express();
app.listen(port,()=>{
  console.log(`服务启动成功,正在监听${port}端口`)
});

const stringify = (str) => JSON.stringify(str);
app.use(express.urlencoded({extended:true}));
app.use(cors());

const KEY_MAP={
  SCHEMA:0,
  ROUTER:1,
  BLOCK:2
}

app.get('/api/v1/schema/:name',(req,res)=>{
  const {name} = req.params;
  res.setHeader('Access-Control-Allow-Origin','*');
  if(!name){
    return res.send(stringify({code:500,msg:'name必填'}));
  }
  const filePath = path.resolve(process.cwd(),`src/assets/${name}.json`);
  fs.readFile(filePath,(err,data)=>{
    if(err){
      return res.json({msg:'文件读取失败',code:500});
    }
    res.json({msg:'文件读取成功',code:200,data:data.toString()});
  })
})
app.post('/api/v1/updateSchema',(req,res)=>{
  const params = req.body;
  if(!params.name){
    return res.send(stringify({code:500,msg:'name必填'}));
  }
  const filePath = path.resolve(process.cwd(),`src/assets/${params.name}.json`);
  createFile(params.name,params.data,filePath).then(data=>{
    if(data.code===200){
      return res.send(stringify({msg:'更新成功',code:200}));
    }
    res.send(stringify({msg:'更新失败',code:500}));
  })
});
app.post('/api/v1/removeSchema',(req,res)=>{
  let params = req.body;
  if(!params.name){
    return res.send(stringify({code:500,msg:'name必填'}));
  }
  const filePath = path.resolve(process.cwd(),`src/assets/${params.name}.json`);
  if(!isFileExists(filePath)){
    return res.send(stringify({code:500,msg:'文件不存在'}));
  }
  removeFile(filePath).then(data=>{
    if(data.code===200){
      return res.send(stringify({code:200,msg:'删除成功'}));
    }
    res.send(stringify({code:500,msg:data.msg}));
  })
})

app.get('/api/v1/routerList',(req,res)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  const routerPath = path.resolve(process.cwd(),'src/assets/projectRouter.json');
  fs.readFile(routerPath,(err,data)=>{
    if(err){
      return res.json({
        msg:'读取路由文件失败',
        code:500
      })
    }
    res.json({
      msg:'读取成功',
      code:200,
      data:data.toString()
    })
  })
})
app.post('/api/v1/addRouter',(req,res)=>{
  let params = req.body;
  const routerPath = path.resolve(process.cwd(),'src/assets/projectRouter.json');
  createFile('projectRouter',params.data,routerPath,KEY_MAP.ROUTER).then(data=>{
    if(data.code === 200){
      return res.send(stringify({code:200,msg:'新增成功'}))
    }
    res.send(stringify({code:500,msg:'新增失败'}))
  })
})
app.post('/api/v1/updateRouter',(req,res)=>{
  let params = req.body;
  const routerPath = path.resolve(process.cwd(),'src/assets/projectRouter.json');
  createFile('projectRouter',params.data,routerPath,KEY_MAP.ROUTER).then(data=>{
    if(data.code === 200){
      return res.send(stringify({code:200,msg:'修改成功'}))
    }
    res.send(stringify({code:500,msg:'修改失败'}))
  })
})
app.post('/api/v1/removeRouter',(req,res)=>{
  let params = req.body;
  if(!params.name){
    return res.send(stringify({code:500,msg:'name字段必填'}))
  }
  const routerPath = path.resolve(process.cwd(),'src/assets/projectRouter.json');
  if(!isFileExists(routerPath)){
    return res.send(stringify({code:404,msg:'删除的文件不存在'}))
  }
  removeFile(routerPath).then(data=>{
    if(data.code === 200){
      return res.send(stringify({code:200,msg:'删除成功'}))
    }
    res.send(stringify({code:500,msg:'删除失败'}))
  })
})
 /**lowcode block start**/
// 新增区块
app.post('/api/v1/addBlock',(req,res)=>{
  const params = req.body;
  const {name,title,block} = params
  if(!name){
    return res.send(stringify({code:500,msg:'name字段必填'}))
  }
  if(!title){
    return res.send(stringify({code:500,msg:'title字段必填'}))
  }
  const writePath = path.resolve(process.cwd(),`src/assets/${name}.json`);
  createFile(name,block,writePath,KEY_MAP.BLOCK).then(data=>{
    if(data.code === 200){
      return res.send(stringify({code:200,msg:'新增成功'}))
    }
    res.send(stringify({code:500,msg:'新增失败'}))
  })
})

// 获取区块
app.get('/api/v1/blocks',(req,res)=>{
  const blockPath = path.resolve(process.cwd(),`src/assets/block.json`);
  fs.readFile(blockPath,(err,data)=>{
    if(err){
      return res.json({msg:'文件读取失败',code:500});
    }
    res.json({msg:'文件读取成功',code:200,data:data.toString()});
  })
})

/**lowcode block end**/

