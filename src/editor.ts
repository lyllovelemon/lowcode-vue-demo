import Inject from '@alilc/lowcode-plugin-inject';
import { init, plugins, project } from '@alilc/lowcode-engine';
import UndoRedoPlugin from '@alilc/lowcode-plugin-undo-redo'; // 撤销重做
import SchemaPlugin from '@alilc/lowcode-plugin-schema'; // 协议插件
import DataSource from '@alilc/lowcode-plugin-datasource-pane'; // 数据源插件
import { setupHostEnvironment } from '@knxcloud/lowcode-utils';
import CodeEditor from '@knxcloud/lowcode-plugin-vue-code-editor'; // 代码编辑器插件
import RegistryPlugin from './plugins/registry'; // 包含logo 和组件插件
import InitPlugin from './plugins/init'; //初始化插件加载资产包和页面协议包
import SetterPlugin from './plugins/setter'; // 设置器插件，注册绑定事件插件和
import Actions from './plugins/actions'; // 注册保存和预览
//import BlockPlugin from './plugins/block-plugin';
// @ts-ignore
//import{ listBlocks,createBlock} from './api/block';
import {createAxiosHandler} from '@/handler/datasource-axios-handler';

import '@knxcloud/lowcode-plugin-vue-code-editor/dist/style.css';
import './editor.less';


// import BlockPane from '@alilc/lowcode-plugin-block';




(async () => {
  const preference = new Map();

  preference.set('DataSourcePane', {
    importPlugins: [],
    dataSourceTypes: [
      {
        type: 'fetch',
      },
      {
        type:'custom'
      }
    ],
  });
  // @ts-ignore
  //await plugins.register(BlockPlugin);
  await plugins.register(Inject);
  // @ts-ignore
  await plugins.register(RegistryPlugin);
  await plugins.register(UndoRedoPlugin);
  await plugins.register(SchemaPlugin);
  await plugins.register(DataSource);
  await plugins.register(SetterPlugin);
  await plugins.register(InitPlugin);

  await plugins.register(CodeEditor);
  await plugins.register(Actions);

  setupHostEnvironment(project, '/js/vue.runtime.global.js');

  await init(
    document.getElementById('lce-container')!,
    {
      enableCondition: true,
      enableCanvasLock: true,
      supportVariableGlobally: true,
      simulatorUrl: ['/js/vue-simulator-renderer.js', '/js/vue-simulator-renderer.css'],
      requestHandlersMap:{
        fetch:createAxiosHandler()
      }
    },
    preference
  );
})();
