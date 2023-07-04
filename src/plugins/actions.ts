import { createElement as h } from 'react';
import { Button, Message } from '@alifd/next';
import { getProjectRouterSchemaByKey, saveSchema, traverseRouteName } from '@/utils/store';
import { IPublicModelPluginContext } from '@alilc/lowcode-types';
import { config } from '@alilc/lowcode-engine';
import {CURRENT_PAGE,DEFAULT_PAGE_KEY} from '@/utils/const';
// @ts-ignore
import { updateSchema} from '@/api/schema';

const save = async () => {
  await saveSchema();
  const key = config.get(CURRENT_PAGE)||DEFAULT_PAGE_KEY;
  const schemaKey = traverseRouteName(key);
  const projectRouterSchema = getProjectRouterSchemaByKey(key);
  await updateSchema(schemaKey,projectRouterSchema);
};

const preview = async () => {
  await saveSchema();
  const key = config.get(CURRENT_PAGE)||DEFAULT_PAGE_KEY;
  window.open('preview.html?page='+key);
};

const savePlugin = (ctx: IPublicModelPluginContext) => {
  return {
    name: 'saveSample',
    async init() {
      const { skeleton, hotkey } = ctx;

      skeleton.add({
        name: 'saveSample',
        area: 'topArea',
        type: 'Widget',
        props: { align: 'right' },
        content: h(Button, { onClick: save }, '保存到本地'),
      });

      skeleton.add({
        name: 'previewSample',
        area: 'topArea',
        type: 'Widget',
        props: { align: 'right' },
        content: h(Button, { onClick: preview }, '预览'),
      });

      hotkey.bind('command+s', async (e) => {
        e.preventDefault();
        save();
      });
    },
  };
};

savePlugin.pluginName = 'saveSample';

export default savePlugin;
