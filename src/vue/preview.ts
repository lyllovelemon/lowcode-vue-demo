import { Asset } from '@alilc/lowcode-types';
import VueRenderer from '@knxcloud/lowcode-vue-renderer';
import { buildComponents, AssetLoader } from '@knxcloud/lowcode-utils';
import { h, createApp, toRaw, Suspense } from 'vue';
import {createAxiosHandler} from '../handler/datasource-axios-handler';

const init = async () => {
  // 获取保存在本地的项目需要的包packages
  const packages = JSON.parse(window.localStorage.getItem('packages') || '[]');
  // 获取保存在localStorage里的schema页面构建协议
  const projectSchema = JSON.parse(window.localStorage.getItem('projectSchema') || '{}');

  const { componentsMap: componentsMapArray = [], componentsTree = [] } = projectSchema;

  const componentsMap: any = {};
  // 将组件数组转化为对应映射
  componentsMapArray.forEach((component: any) => {
    componentsMap[component.componentName] = component;
  });
  console.log('componentsMap====', componentsMap);
  const libraryMap = {}; // 创建库的Map
  const libraryAsset: Asset = []; // 相关第三方包的资源数组
  // @ts-ignore
  packages.forEach(({ package: _package, library, urls, renderUrls }) => {
    // @ts-ignore
    libraryMap[_package] = library;
    if (renderUrls) {
      libraryAsset.push(renderUrls);
    } else if (urls) {
      libraryAsset.push(urls);
    }
  });
  console.log(libraryMap, 110);
  await new AssetLoader().load(libraryAsset); // 加载一些库的资源比如一些js,css库，创建script或link标签
  const components = await buildComponents(libraryMap, componentsMap);
  console.log(componentsTree[0], 111);
  console.log(components, 112);
  return { schema: componentsTree[0], components };
};

(async () => {
  const { schema, components } = await init();
  console.log('VueRenderer===', VueRenderer);
  const appHelper = {
    requestHandlersMap:{
      fetch:createAxiosHandler()
    }
  }
  const app = createApp(() => {
    return h('div', { class: 'lowcode-plugin-sample-preview' }, [
      h(Suspense, null, {
        default: () =>
          h(VueRenderer, {
            class: 'lowcode-plugin-sample-preview-content',
            schema: toRaw(schema),
            components: toRaw(components),
            appHelper
          }),
        fallback: () =>
          h('div', { class: 'lowcode-plugin-sample-preview-loading' }, 'loading...'),
      }),
    ]);
  });
  console.log('app===', app);
  app.mount('#lce-container');
})();
