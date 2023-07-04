import * as React from 'react';
import { Dialog, Button, Form, Input, Loading } from '@alifd/next';
import { Node} from '@alilc/lowcode-designer';
// @ts-ignore
import { createBlock} from '@/api/block';
import './index.scss';
const {useState,useEffect} = React;

export interface Block {

}

export interface BlockResponse {
  code:number;
  data:Block[];

}

export interface BlockPaneAPI {
  listBlocks:()=> BlockResponse
}

export interface BlockPaneProps {
  api:BlockPaneAPI;
}

const BlockPane = (props:BlockPaneProps)=>{
  const { api }=props
  const [blocks,setBlocks] = useState([])
  const {listBlocks} = api;
  useEffect(()=>{
    const fetchBlocks = async ()=>{
      const res= await listBlocks();
      if(res.code===200){
        // @ts-ignore
        setBlocks(res.data);
      }

    }
    fetchBlocks()
  },[]);

  const registerAdditive = (shell:HTMLDivElement|null)=>{
    console.log('shell',shell);
    if(!shell||shell.dataset.registered){
      return
    }
    function getSnippetId(elem:any) {
      if(!elem){
        return null;
      }
      while(shell !== elem){

      }
    }
  }

  if(!blocks.length){
    // @ts-ignore
    return <Loading/>
  }
  return <div>
    {
      blocks.map(item=>item.schema)
    }
  </div>
}
export default BlockPane;
