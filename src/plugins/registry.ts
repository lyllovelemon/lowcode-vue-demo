import { IPublicModelPluginContext } from '@alilc/lowcode-types';
import ComponentsPane from '@alilc/lowcode-plugin-components-pane';
import { Logo } from '@/components/logo/logo';
// @ts-ignore
import LogoImg from '@/components/logo/lowcode-logo.svg'
// @ts-ignore
import SaveAsBlock from '@/actions/block';
 import {PagesPane} from '@/components/pages';


const builtinPluginRegistry =  (ctx: IPublicModelPluginContext) => {
  return {
    name: 'builtin-plugin-registry',
    async init() {
      const { skeleton, project,material } = ctx;

      // 注册保存为区块工作条
      material.addBuiltinComponentAction(SaveAsBlock);
      // 注册 logo 面板
      skeleton.add({
        area: 'topArea',
        type: 'Widget',
        name: 'logo',
        content: Logo,
        contentProps: {
          logo:LogoImg,
          // logo: 'https://img.alicdn.com/imgextra/i4/O1CN013w2bmQ25WAIha4Hx9_!!6000000007533-55-tps-137-26.svg',
          href: 'https://lowcode-engine.cn',
        },
        props: {
          align: 'left',
        },
      });

      // 注册组件面板
      const componentsPane = skeleton.add({
        area: 'leftArea',
        type: 'PanelDock',
        name: 'componentsPane',
        content: ComponentsPane,
        props: {
          align: 'top',
          icon: 'zujianku',
          description: '组件库',
        },
      });
      componentsPane.disable();
      project.onSimulatorRendererReady(() => {
        componentsPane.enable();
      });

      skeleton.add({
        area: 'leftArea',//插件区域
        type: 'PanelDock',// 插件类型，弹出面板
        name: 'multiPagePane',
        content: PagesPane,// 插件组件实例
        props: {
          align: 'top',
          icon: 'kaiwenjianjia',
          description: '多页插件',
        },
      });

    },
  };
};

builtinPluginRegistry.pluginName = 'builtinPluginRegistry';

export default builtinPluginRegistry;
