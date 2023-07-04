import React from 'react';
import {Dialog} from '@alifd/next';
import {Node} from '@alilc/lowcode-designer';
interface SaveAsBlockProps {
  // @ts-ignore
  node:Record<string>;
}

const SaveAsBlock = (props:SaveAsBlockProps)=>{
    const {node} = props
    console.log(props,node);
    return <div>
      {
        node.componentName
      }
    </div>
}

// @ts-ignore
export default {
  name: 'add',
  content: {
    icon: 'add',
    title: '新增',
    action(node:Node) {
      console.log('node', node);
      Dialog.show({
        v2:true,
        title:'保存为区块',
        content:<SaveAsBlock node={node}/>
      });
    }
  },
  important: true
};
