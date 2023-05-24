import { injectAssets } from '@alilc/lowcode-plugin-inject';
//import { getProjectSchemaToLocalStorage } from '@/utils/store';
import { IPublicModelPluginContext } from '@alilc/lowcode-types';
import assets from '@/assets/assets.json';
//import originSchema from '@/assets/schema.json';
import { getPageSchemaFromLocal } from '@/utils/store';
const editorInit = (ctx: IPublicModelPluginContext) => {
  return {
    name: 'editor-init',
    async init() {
      const queryString = location.search
      // 页面初始化时默认跳首页
      if(!queryString){
        location.href =`${location.pathname}?page=home`
      }
      const defaultCurrentPage = queryString.includes('home')?'home':'schema'
      const { material, project } = ctx;
      const loadedAssets = await injectAssets(assets);
      material.setAssets(loadedAssets);
      const schema = await getPageSchemaFromLocal(defaultCurrentPage);
      console.log('远程拿到assets-->',assets,'schema',schema)
      //const projectSchema = getProjectSchemaToLocalStorage();
      //const schema = projectSchema ? projectSchema['componentsTree'].pop() : originSchema;

      project.onSimulatorRendererReady(() => {
        project.openDocument(schema);
      });
    },
  };
};

editorInit.pluginName = 'editorInit';

export default editorInit;
