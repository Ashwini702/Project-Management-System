import { useCallback, useEffect, useRef, useState } from 'react';
import { getState, saveState } from '../services/stateService';

const usePersistentState=(moduleKey,initialValue)=>{
  const [value,setValue]=useState(initialValue);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(null);
  const ready=useRef(false);
  const timer=useRef(null);
  useEffect(()=>{let active=true;getState(moduleKey).then(({data})=>{if(!active)return;if(data.data!==null&&data.data!==undefined)setValue(data.data);ready.current=true;}).catch(err=>{if(active)setError(err.response?.data?.message||'Unable to load saved data.');}).finally(()=>active&&setLoading(false));return()=>{active=false;clearTimeout(timer.current);};},[moduleKey]);
  const updateValue=useCallback((nextValue)=>{setValue(current=>{const resolved=typeof nextValue==='function'?nextValue(current):nextValue;if(ready.current){clearTimeout(timer.current);timer.current=setTimeout(()=>saveState(moduleKey,resolved).catch(err=>setError(err.response?.data?.message||'Unable to save data.')),150);}return resolved;});},[moduleKey]);
  return [value,updateValue,{loading,error}];
};
export default usePersistentState;
