import React from 'react';
import { Dialog,Button,Form,Input } from '@alifd/next';
import { Node} from '@alilc/lowcode-designer';
// @ts-ignore
import { createBlock} from '@/api/block';

const FormItem = Form.Item;
interface SaveAsBlockProps {
  // @ts-ignore
  node:Record<string>;
}


const SaveAsBlock = (props:SaveAsBlockProps)=>{
    const {node} = props
    console.log(props,node);
    const save = async(values: { name: any; })=>{
      // @ts-ignore
      const {name,title} = values;
      const {schema} = node
      console.log('node-->',node,'schema',schema,'values-->',values)
      if(!name||!title){
        return
      }
      const res = await createBlock({
        name,
        title,
        schema:JSON.stringify(schema)
      });
      console.log('新建区块',res);

    }
  return <div>
      <Form style={{ width: "100%" }} colon>
        <FormItem
          name="name"
          label="英文名"
          required
          requiredMessage="请输入英文名!"
        >
          <Input />
        </FormItem>
        <FormItem
          name="title"
          label="中文名"
          required
          requiredMessage="请输入中文名!"
        >
          <Input />
        </FormItem>
        <FormItem label=" " colon={false}>
          <Form.Submit
            type="primary"
            validate
            onClick={save}
            style={{ marginRight: 8 }}
          >
           保存
          </Form.Submit>
          <Form.Reset>重置</Form.Reset>
        </FormItem>
      </Form>
      {/*<div className="save-as-block-actions">*/}
      {/*  <Button>保存</Button>*/}
      {/*</div>*/}
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
        width:500,
        title:'保存为区块',
        content:<SaveAsBlock node={node}/>,
        footer:false
      });
    }
  },
  important: true
}
