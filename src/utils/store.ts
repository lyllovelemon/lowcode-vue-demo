import { material, project } from '@alilc/lowcode-engine';
import { filterPackages } from '@alilc/lowcode-plugin-inject';
import { IPublicEnumTransformStage } from '@alilc/lowcode-types';

export const getPageSchemaFromLocal = (page:string)=>{
  const assets=require(`@/assets/${page}.json`)
  return assets
}

export const setPackgesToLocalStorage = async () => {
  // @ts-ignore
  const packages = await filterPackages(material.getAssets().packages);
  window.localStorage.setItem('packages', JSON.stringify(packages));
};

export const setProjectSchemaToLocalStorage = () => {
  window.localStorage.setItem(
    'projectSchema',
    JSON.stringify(project.exportSchema(IPublicEnumTransformStage.Save))
  );
};

export const getProjectSchemaToLocalStorage = () => {
  const data = window.localStorage.getItem('projectSchema');
  return data && JSON.parse(data);
};

export const saveSchema = async () => {
  setProjectSchemaToLocalStorage();
  await setPackgesToLocalStorage();
};

export const setDefaultPageToLocalStorage = (value:string)=>{
  window.localStorage.setItem('defaultPage',value)
}

export const getDefaultPageToLocalStorage=()=>{
  return window.localStorage.getItem('defaultPage')
}
