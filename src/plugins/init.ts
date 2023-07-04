import { injectAssets } from '@alilc/lowcode-plugin-inject';
import { IPublicModelPluginContext } from '@alilc/lowcode-types';
import assets from '@/assets/assets.json';
import originSchema from '@/assets/schema.json';

// @ts-ignore
import {getSchema} from '@/api/schema';
// @ts-ignore
import {getRouterList} from '@/api/projectRouter';
import {
  getProjectRouterFromLocalStorage, getProjectRouterSchemaByKey,
  setProjectRouterToLocalStorage, traverseRouteName
} from '@/utils/store';
import { config } from '@alilc/lowcode-engine';
import { CURRENT_PAGE, DEFAULT_PAGE_KEY } from '@/utils/const';
import { isPromise } from '@/utils/type';
const editorInit = (ctx: IPublicModelPluginContext) => {
  return {
    name: 'editor-init',
    async init() {
      const { material, project } = ctx;
      const loadedAssets = await injectAssets(assets);
      material.setAssets(loadedAssets);
      let router = await getRouterList();
      if(!router||!router.length){
        console.error('路由获取失败')
      }
      let projectRouter = getProjectRouterFromLocalStorage();
      if(!projectRouter||!projectRouter.length){
        projectRouter = [...router];
        setProjectRouterToLocalStorage(router);
      }

      const key = config.get(CURRENT_PAGE)||DEFAULT_PAGE_KEY;
      config.set(CURRENT_PAGE,DEFAULT_PAGE_KEY);

      const schemaKey = traverseRouteName(key);
      let projectSchema = await getSchema(schemaKey);
      if(!projectSchema||isPromise(projectSchema)){
        projectSchema = getProjectRouterSchemaByKey(key);
      }
      const schema = projectSchema||originSchema;
      project.onSimulatorRendererReady(() => {
        return project.openDocument(schema);
      });
    },
  };
};

editorInit.pluginName = 'editorInit';

export default editorInit;
