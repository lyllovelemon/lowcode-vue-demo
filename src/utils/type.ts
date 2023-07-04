export const isArray = Array.isArray;
export const isUndef = (v:any):v is undefined|null=>v===undefined || v===null;
export const isDef = <T>(v:T)=>v!==undefined && v!== null;
export const isPromise = (val:any)=> isDef(val) && typeof val.then === 'function' && typeof val.catch === 'function';
